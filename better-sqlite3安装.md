# 第一步，确定安装Python2.x、vs2015或vs2017；
```
npm install --global windows-build-tools
#或者
cnpm install --global windows-build-tools
 
npm install --global windows-build-tools --vs2017
#或者
cnpm install --global windows-build-tools --vs2017
```
代码中出现npm和cnpm，在install过程中使用npm会比较慢，cnpm则是阿里云定制的npm版本，在国内下载速度较快。通过以下命令安装cnpm
```
npm install -g cnpm --registry=https://registry.npm.taobao.org

```
安装node-gyp 跨平台编辑模块插件，用python2.7写的 
```
npm install -g node-gyp
```
安装better-sqlite3:
```
npm install better-sqlite3
```
第三步，在项目中调用better-sqlite3：
```
const DB = require('better-sqlite3');
```
第四部进行编译 (先下载后编译)
```
npm install --save-dev electron-rebuild
.\node_modules\.bin\electron-rebuild -f -w better-sqlite3
```
无法运行项目(--target=7.1.8 是electon版本号)
```
cnpm rebuild --runtime=electron --target=13.0.0 --disturl=https://atom.io/download/atom-shell --abi=64
```
### 最后一步 在打包的时候不要编译
vue.config.js
```
//不编译的代码
   pluginOptions: {
        electronBuilder: {
            externals: ['ffi','serialport','robotjs','better-sqlite3'],
        }
   }
```
