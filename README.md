# 魔兽世界怀旧服大脚插件整合包更新器Mac版
World of Warcraft classic bigfoot addons update tools for Mac OS

## Dependencies
- [electron](https://electronjs.org/)
- [electron-dl](https://github.com/sindresorhus/electron-dl)
- [electron-builder](https://github.com/electron-userland/electron-builder)
- [adm-zip](https://github.com/cthackers/adm-zip)
- [cheerio](https://github.com/cheeriojs/cheerio)
- [UIkit](https://getuikit.com/)

## Installation Electron for china fk ccp's wall
```javascript
npm install electron@6.1.1 \
    --save-dev \
    --verbose \
    --registry='http://registry.npm.taobao.org' \
    --electron_mirror='https://npm.taobao.org/mirrors/electron/'
```
## Run
```javascript
npm start
```
## Package for Mac OS
```javascript
npm run dist
```

## 更新流程
- 抓取 http://bigfoot.178.com/wow/ 页面
- 解析更新版本号和整合包下载地址
- 下载解压覆盖到 /Applications/World of Warcraft/_classic_/ (整合包里默认从 Interface/ 目录开始)
- 删除压缩包