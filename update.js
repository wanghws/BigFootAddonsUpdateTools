'use strict';
const { ipcRenderer } = require('electron')
const shell = require('electron').shell;

let   updateZip = ''
const bigFoot = 'http://bigfoot.178.com/wow/'

const updateButton = document.getElementById('updateButton')
const versionSpinner = document.getElementById('versionSpinner')
const bar = document.getElementById('js-progressbar');
const bigfootVersion = document.getElementById('bigfootVersion');
const status = document.getElementById('status');
const github = document.getElementById('github');

UIkit.util.ready(function () {

    ipcRenderer.send('load', bigFoot)

    updateButton.addEventListener('click', async () => {
        ipcRenderer.send('updateAddons', {"url":updateZip})
        updateButton.value = '正在下载...';
        updateButton.disabled = true;    
        status.className = ''
        status.innerText = ''    
    });

    github.addEventListener('click',() => {
        shell.openExternal('https://github.com/wanghws/BigFootAddonsUpdateTools');
    });
});

ipcRenderer.on("bigfootUpdate",async (event, message) => {
    updateZip = message.zip
    bigfootVersion.innerText = message.version;
    versionSpinner.style.display = 'none';
    updateButton.style.display = 'block';
})

ipcRenderer.on("updateError",async (event, message) => {
    versionSpinner.style.display = 'none';
    updateButton.style.display = 'block';
    status.className = 'uk-text-danger'
    status.innerText = '更新失败'
    updateButton.value = '开始更新';
    updateButton.disabled = false;
})

ipcRenderer.on("updateProgress",async (event, progress) => {
    bar.value +=  progress.percent
    if (bar.value >= bar.max) {
        updateButton.value = '解压中...';
        //updateButton.disabled = false;
    }
})

ipcRenderer.on("unzipFinish",async (event, message) => {
    updateButton.value = '清理中...';
    updateButton.disabled = false;
})

ipcRenderer.on("cleanFinish",async (event, message) => {
    updateButton.value = '开始更新';
    updateButton.disabled = false;
    status.className = 'uk-text-success'
    status.innerText = '更新完成'
})