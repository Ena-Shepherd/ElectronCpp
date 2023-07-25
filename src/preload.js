const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);

// Récupérer les variables d'environnement depuis le processus principal et les exposer au rendu
contextBridge.exposeInMainWorld('env', {
    PORT: process.env.PORT
});