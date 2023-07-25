const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let serverProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../media/logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // Chemin vers preload.js
    }
  });

  win.loadFile('src/index.html');
}

app.whenReady().then(() => {
  // Lancer le serveur C++ en tant que processus enfant
  const serverPath = path.join(__dirname, '..', 'app.exe'); // Remplacez par le chemin de votre exécutable serveur C++
  serverProcess = spawn(serverPath);

  // Gérer les événements de sortie du processus serveur
  serverProcess.stdout.on('data', (data) => {
    console.log(`Sortie du serveur C++ : ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Erreur du serveur C++ : ${data}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`Le serveur C++ s'est arrêté avec le code de sortie ${code}`);
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Gérer l'événement de fermeture de toutes les fenêtres
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Terminer le processus serveur avant de quitter l'application
    if (serverProcess) {
      console.log('Killed server');
      serverProcess.kill('SIGINT'); // Envoyer le signal SIGINT pour terminer proprement le serveur
      serverProcess = null; // Réinitialiser la variable du processus serveur
    }
    app.quit();
  }
});

// Reste du code ipcMain pour exécuter le code C++
ipcMain.on('run-cpp-code', (event, arg) => {
  // Exécutez votre code C++ ici avec l'argument arg
  exec('./app.exe' + JSON.stringify(arg), (error, stdout, stderr) => {
    if (error) {
      // En cas d'erreur, renvoyez un message d'erreur au rendu
      event.reply('cpp-command-reply', { error: error.message });
    } else {
      // En cas de succès, renvoyez la réponse au rendu
      event.reply('cpp-command-reply', { result: stdout });
    }
  });
});