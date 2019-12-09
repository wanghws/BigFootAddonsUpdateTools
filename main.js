const {app, BrowserWindow, ipcMain, nativeImage} = require('electron');
const {download} = require('electron-dl');
const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');


const wowDir = "/Applications/World of Warcraft/_classic_/Interface/AddOns/";
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭

let win;

global.sharedObject = {
    downloadProgress: 0
  }

function createWindow() {
    var image = nativeImage.createFromPath(path.join(__dirname, './logo.png')); 
    console.log(image)
    // 创建浏览器窗口。
    win = new BrowserWindow({
        icon: image,
        width: 600,
        height: 440,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // 加载index.html文件
    win.loadFile('index.html')

    // 打开开发者工具
    //win.webContents.openDevTools()

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
      
        win = null
    })

    ipcMain.on('updateAddons', async (event, update) => {
        const win = BrowserWindow.getFocusedWindow();
        console.log(update)
        await download(win, update.url,{
            showBadge:true,
            directory: wowDir,
            onStarted: function(item){
                item.on('updated', (event, state) => {
                    if (state === 'interrupted') {
                      console.log('Download is interrupted but can be resumed')
                    } else if (state === 'progressing') {
                      if (item.isPaused()) {
                        console.log('Download is paused')
                      } else {
                        console.log(`Received bytes: ${item.getReceivedBytes()}`)
                      }
                    }
                });
                item.once('done', (event, state) => {
                    if (state === 'completed') {
                        console.log(item.getSavePath());
                        unzip(item);
                    } else {
                      console.log(`Download failed: ${state}`)
                    }
                });
            },
            onProgress:function(progress){
                global.sharedObject.downloadProgress = progress.percent
                // bar.value += progress * 100;
    
                // if (bar.value >= bar.max) {
                //     return;
                // }
            }
        });
    });
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})

function unzip(item){
    const unzip = new AdmZip(item.getSavePath());
    unzip.extractAllTo(wowDir,true);
    clean(item.getSavePath());
}

function clean(file){
    try {
        fs.unlinkSync(file)
        //file removed
    } catch (err) {
        console.error(err)
    }
}

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
// npm install --save-dev electron@6.1.1 --verbose --registry=http://registry.npm.taobao.org --electron_mirror="https://npm.taobao.org/mirrors/electron/"