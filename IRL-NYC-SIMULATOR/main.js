<<<<<<< HEAD
const { app, BrowserWindow, Menu} = require('electron')

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        icon: __dirname + `img/icon.png`
    })
  
    mainWindow.loadFile('index.html')
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
=======
const { app, BrowserWindow, Menu} = require('electron')

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        icon: __dirname + `img/icon.png`
    })
  
    mainWindow.loadFile('index.html')
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
>>>>>>> 8a92bf92fea3dd0587211fb79915da67db5f3e5e
})