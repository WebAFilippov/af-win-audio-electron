"use strict";
const electron = require("electron");
if (!process.contextIsolated) {
  throw new Error("contextIsolated must be enabled in the BrowserWindow");
}
try {
  electron.contextBridge.exposeInMainWorld("context", {
    send: (channel, data) => {
      electron.ipcRenderer.send(channel, data);
    },
    receive: (channel, func) => {
      electron.ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
    }
  });
} catch (error) {
  console.error(error);
}
