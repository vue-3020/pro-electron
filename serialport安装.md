# 第一步：配置环境

- 1.安装 Python2.7 配置环境变量（官网下载）看网上说明必须是 2.7 版本，3 不支持
- 2.安装

```
cnpm install --global --production windows-build-tools
```

- 3.安装
- 但可能还会报错：未能加载 Visual C++ 组件"VCBuild.exe"

```
node-gyp list
```

此时可观察到，倒数第二行报错，按提示输入命令

```
node-gyp install
```

```
node-gyp npm install -g node-gyp
```

- 4 设置 python2
- (1) 右键点击"计算机"，然后点击"属性"
- (2) 然后点击"高级系统设置"
- （3) 选择"系统变量"窗口下面的"Path",双击即可！
- （4) 然后在"Path"行，添加 python 安装路径即可(我的 C:\Users\dida\.windows-build-tools\python27)

```
cnpm config set python python2.7
```

```
cnpm config set msvs_version 2017
```

# 第二步：安装

下载 serialport

```
npm install --save serialport
```

下载编译包

```
npm install --save-dev electron-rebuild
```

每次运行 npm 执行这个命令

```
./node_modules/.bin/electron-rebuild
```

如果 Windows 出现问题，请尝试

```
.\node_modules\.bin\electron-rebuild.cmd
```

运行.\node_modules.bin\electron-rebuild.cmd
<font face="报错" size = 3 color = red > **报错**

- 从网上查询得知需要安装 windows-build-tools，需要注意的是，必须是以管理员身份来进行安装，因此在打开 cmd 时要以管理员身份打开。

```
npm install -g windows-build-tools
```
此时删除node-modules，在项目目录下，重新打开cmd，执行cnpm i，安装成功
