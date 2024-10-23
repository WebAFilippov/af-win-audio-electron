// src/main/createWindow.ts

// ! lib
import { join } from 'path';
import { BrowserWindow } from 'electron';

export async function createWindow({
  x = undefined,
  y = undefined,
  width = 1300,
  height = 900,
  center = true,
  title = 'App title',
}): Promise<BrowserWindow> {
  const mainWindow = new BrowserWindow({
    x,
    y,
    width,
    height,
    show: true,
    autoHideMenuBar: true,
    center,
    title,
    frame: true,
    vibrancy: 'under-window',
    trafficLightPosition: { x: 16, y: 20 },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
    },
  });

  return mainWindow;
}
