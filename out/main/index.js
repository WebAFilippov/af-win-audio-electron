"use strict";
const electron = require("electron");
const utils = require("@electron-toolkit/utils");
const path = require("path");
async function createWindow({
  x = void 0,
  y = void 0,
  width = 1300,
  height = 900,
  center = true,
  title = "App title"
}) {
  const mainWindow = new electron.BrowserWindow({
    x,
    y,
    width,
    height,
    show: true,
    autoHideMenuBar: true,
    center,
    title,
    frame: true,
    vibrancy: "under-window",
    trafficLightPosition: { x: 16, y: 20 },
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: true,
      contextIsolation: true
    }
  });
  return mainWindow;
}
async function createMainWindow() {
  console.log(40, "start createWindow");
  const mainWindow = await createWindow({});
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    console.log("ELECTRON_RENDERER_URL", process.env["ELECTRON_RENDERER_URL"]);
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/app/index.html"));
  }
  return mainWindow;
}
electron.app.whenReady().then(async () => {
  console.log("NODE_ENV:", process.env.NODE_ENV);
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  await createMainWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
  electron.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") electron.app.quit();
  });
  electron.app.on("before-quit", () => {
    console.log("Saving state before quit...");
  });
  electron.app.on("quit", () => {
    console.log("Application quit");
  });
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
