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