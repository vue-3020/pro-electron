'use strict'
app.allowRendererProcessReuse = false
import { app, protocol, ipcMain, BrowserWindow } from 'electron'

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

const { autoUpdater } = require("electron-updater")


let sqlite = require("better-sqlite3")
console.log(55555, sqlite);






// Serialport.list((err, ports) => {
//   ports.forEach((port) => {
//     console.log(6666,port.comName);
//   });
// });


let mainWindow

// 去掉这段代码 就不会等待时间
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }


  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
  }



}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      // 去掉这段代码 就不会等待时间
      // await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }

    // 每次运行APP检测更新。这里设置延时是为了避免还未开始渲染，更新检测就已经完成(网速超快，页面加载跟不上)。
    setTimeout(() => {
      // 检测是否有更新
      autoUpdater.checkForUpdates()
    }, 1500)

  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// require('../dev/sqliteBetter');



// 发送消息给渲染线程
function sendStatusToWindow(status, params) {
  mainWindow.webContents.send(status, params)
}



autoUpdater.autoDownload = false // 关闭自动更新
autoUpdater.autoInstallOnAppQuit = true // APP退出的时候自动安装


// 开发模式下不允许更新
// https://github.com/electron-userland/electron-builder/issues/1254

autoUpdater.setFeedURL({
  provider: 'generic',
  url: 'http://localhost:8080/verson/' // 下载更新包的位置
})




// 发起更新程序
ipcMain.on('autoUpdater-toDownload', () => {
  autoUpdater.downloadUpdate()
})

//更新失败
autoUpdater.on('error', (err) => {
  sendStatusToWindow('autoUpdater-error', err)
})

//正在更新
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...')
})



//最新版本
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('autoUpdater-canUpdate', info)
})

//更新进度
autoUpdater.on('download-progress', (progressObj) => {
  // 正在下载的下载进度
  sendStatusToWindow('autoUpdater-progress', progressObj)
})

//更新完成
autoUpdater.on('update-downloaded', (info) => {
  // 下载完成
  sendStatusToWindow('autoUpdater-downloaded')
})

// 退出程序
ipcMain.on('exit-app', () => {
  autoUpdater.quitAndInstall()
})


// 手动点击更新
ipcMain.on("checkForUpdate", () => {
  //执行自动更新检查
  autoUpdater.checkForUpdates();
})
