'use strict';
const { ipcRenderer } = require('electron')

//Interface.1.13.2.27.zip
const url = 'https://help.cr-institution.cn/test.zip'




UIkit.util.ready(function () {
    const updateButton = document.getElementById('updateButton')
    const version = document.getElementById('version')
    const versionSpinner = document.getElementById('versionSpinner')
    const bar = document.getElementById('js-progressbar');

    updateButton.addEventListener('click', async () => {
        bar.style.display = "block";
        ipcRenderer.send('updateAddons', {"url":url})

        var animate = setInterval(function () {

            const downloadProgress = require('electron').remote.getGlobal('sharedObject').downloadProgress;
            
            bar.value += downloadProgress*100;

            if (bar.value >= bar.max) {
                clearInterval(animate);
            }


        }, 1000);

    });
});