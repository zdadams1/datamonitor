const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 1250,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.setIgnoreMouseEvents(false);
  win.loadFile('index.html');

  return win;
}

let mainWindow;

app.whenReady().then(() => {
  mainWindow = createWindow();
  const ret = globalShortcut.register('Up', () => {
    // Send a message to the renderer process
    mainWindow.webContents.send('stop-alarm');
  });
});

app.on('will-quit', () => {
  globalShortcut.unregister('Up');
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = createWindow();
  }
});
