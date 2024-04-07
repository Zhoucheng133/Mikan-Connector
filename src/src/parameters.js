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
