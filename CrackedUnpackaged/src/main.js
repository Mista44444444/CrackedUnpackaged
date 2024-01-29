const { app, BrowserWindow, Menu} = require('electron')

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        icon: __dirname + `img/icon.png`,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
  
    mainWindow.loadFile('src/index.html')
    mainWindow.webContents.openDevTools()
    mainWindow.maximize()
}

const template = [
   
] 

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.whenReady().then(() => {
    createWindow()
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll()
})
