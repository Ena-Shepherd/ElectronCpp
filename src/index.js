const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
require('dotenv').config({ path: '.env' });

ipcMain.handle('get-env', (event) => {
  return process.env; // Send the environment variables to the renderer process
});

let serverProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../media/logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('src/index.html');
}

app.whenReady().then(() => {

  // Setting up CSPs, to avoid XSS attacks (don't remove)
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders, // Bootstrap content delivery network + AJAX requests endpoint exceptions
        'Content-Security-Policy': [`default-src 'self'; style-src 'self' https://cdn.jsdelivr.net; script-src 'self' https://cdn.jsdelivr.net http://localhost:${process.env.PORT}/api/my-cpp-endpoint; connect-src http://localhost:${process.env.PORT}/api/my-cpp-endpoint;`]
      }
    });
  });

  // Launch C++ server as child process
  const serverPath = path.join(__dirname, '..', 'app.exe'); // Your executable location
  serverProcess = spawn(serverPath);

  // Handle server process output events
  serverProcess.stdout.on('data', (data) => {
    console.log(`C++ server output : ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Error from C++ server : ${data}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`C++ server stopped with exit code ${code}`);
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Handle all windows closing event
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Make sure to kill the server or it will stay running in the background
    if (serverProcess) {
      console.log('Killed server');
      serverProcess.kill('SIGINT');
      serverProcess = null;
    }
    app.quit();
  }
});

// Reste du code ipcMain pour exécuter le code C++
ipcMain.on('run-cpp-code', (event, arg) => {
  // Execute C++ code here with argument arg
  exec('./app.exe' + JSON.stringify(arg), (error, stdout, stderr) => {
    if (error) {
      // Error, return an error message to the render
      event.reply('cpp-command-reply', { error: error.message });
    } else {
      // Success, return response to the render
      event.reply('cpp-command-reply', { result: stdout });
    }
  });
});