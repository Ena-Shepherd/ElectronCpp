const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);

// Get environment variables from main process and expose them on the render
contextBridge.exposeInMainWorld('env', {
    PORT: process.env.PORT
});