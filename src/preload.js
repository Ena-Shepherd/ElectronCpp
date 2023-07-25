// preload.js
const { contextBridge } = require('electron');

// Exposer require au rendu
window.require = require;