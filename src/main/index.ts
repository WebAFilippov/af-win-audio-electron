// src/main/index.ts

// ! lib
// electron
import { BrowserWindow, app, ipcMain, shell } from 'electron';
import { is, optimizer } from '@electron-toolkit/utils';
// path
import { join } from 'path';

import { createWindow } from '@window';

async function createMainWindow(): Promise<BrowserWindow> {
  console.log(40, 'start createWindow');

  // Create the browser window.
  const mainWindow = await createWindow({});

  // Открываем DevTools только в режиме разработки
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    console.log('ELECTRON_RENDERER_URL', process.env['ELECTRON_RENDERER_URL']);
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  console.log('NODE_ENV:', process.env.NODE_ENV);

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  await createMainWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('before-quit', () => {
    console.log('Saving state before quit...');
    // Логика для сохранения состояния приложения (например, в localStorage или в файл)
  });

  app.on('quit', () => {
    console.log('Application quit');
    // Дополнительная логика для полного завершения работы
  });
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Логика для логирования или уведомления о критической ошибке
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Логика для обработки обещаний без отклика
});
