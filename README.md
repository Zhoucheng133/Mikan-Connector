# Mikan Connector

## 使用

如果你希望在一般的系统中使用，你可以尝试使用[Motrix](https://motrix.app/)，如果你在服务器上使用，建议使用Docker安装Aria2

### 通用步骤

- 从[Mikan Project](https://mikanime.tv/)中注册账号，添加订阅，并且获取RSS订阅的链接
- 安装[Node.js](https://nodejs.org/en)
- 编辑本项目中的`src/parameters.js`，如果没有务必自行创建:

```js
// src/parameters.js

// Aria2端口号，默认端口为16800
const aria2Link="http://192.168.31.236:16800/jsonrpc";

// Aria2的密钥
const aria2Secret="";

// 下载的规则，注意都是并列关系 (即必须满足所有条件)
const rules=[
  {
    type: "include",  // 必须包含
    value: "CHS"      // 包含的内容
  },
  {
    type: "exclude",  // 必须排除
    value: "MKV"      // 排除的内容
  },
]

// RSS链接，你需要注册Mikan Project账号，并且找到RSS订阅链接
const rssLink="https://mikanime.tv/RSS/MyBangumi?token=";

// 更新频率，单位为分钟
const updateFreq=15;

// 是否立即下载，如果是true，那么会在程序运行后立刻下载RSS订阅中的所有项
const updateNow=false;

export {aria2Link, aria2Secret, rules, rssLink, updateFreq, updateNow};
```

### 如果使用Motrix

如果你想使用Motrix作为下载工具，你可以遵循以下步骤

- 从[Motrix官方网站](https://motrix.app/)下载安装Motrix
- 确认你的Motrix中Aria2的RPC端口号，位于`偏好设置 - 进阶设置 - PRC 监听端口`，默认为16800；默认的RPC 密钥为空 (即不需要密钥)，你可以自定义你的密钥
  
### 如果使用Aria2

这里以使用Docker安装Aria2为例

注意保存自己设定的端口号 (对应容器的端口号为PRC_PORT) 和 RPC_SECRET

