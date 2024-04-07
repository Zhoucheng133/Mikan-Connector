// 这里存放一些参数，务必根据注释修改下面的内容

// aira2的rpc地址，例如 http://192.168.1.3:16800/jsonrpc
const aria2Link="";

// aria2的rpc连接密钥，如果没有则保持空
const aria2Secret="";

// 下载规则，注意下面的规则都是并列的
const rules=[
  {
    type: "include",  // 规则类型，include (必须包含)或者exclude (必须排除)
    value: "CHS"      // 字符串值
  },
  {
    // ...
  }
]

// rss链接，格式为https://mikanime.tv/RSS/MyBangumi?token=xxx
const rssLink="";

// 刷新频率，以分钟计，不要设置过小
const updateFreq=15;

// 是否程序启动的时候下载已有的内容
const updateNow=false;

export {aria2Link, aria2Secret, rules, rssLink, updateFreq, updateNow};