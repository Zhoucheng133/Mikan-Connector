import {aria2Link, aria2Secret, rules, rssLink, updateFreq, updateNow} from "./parameters.js";
import axios from "axios";
import { XMLParser} from "fast-xml-parser";
import dayjs from "dayjs";

function ariaRequest(btLink){
  const data={
    "jsonrpc": "2.0",
    "method": "aria2.addUri",
    "id": 1,
    "params": [
      aria2Secret=="" ? "":`token:${aria2Secret}`,
      [btLink], {
        "split": "5",
        "max-connection-per-server": "5",
        "seed-ratio": "0"
      }
    ]
  }
  axios.post(aria2Link, data);
}

async function rssRequest(){
  var response;

  try {
    response=await axios.get(rssLink);
  } catch (error) {
    return ["ERR"];
  }
  const parser = new XMLParser();
  let jObj = parser.parse(response.data);
  var list=jObj.rss.channel.item

  var matches = [...response.data.matchAll(/url="([^"]+)"/g)];

  if(matches.length!=list.length){
    return ["ERR"];
  }
  try {
    matches.forEach(function(match, index) {
      var url = match[1];
      list[index].media=url;
      list[index].id=index;
    });
  } catch (error) {
    return ["ERR"];
  }

  return list;
}

const getXML=async ()=>{
  const val=await rssRequest()
  if(val[0]=="ERR"){
    return ["ERR"];
  }
  const filterList=val.filter(function(item){
    for(var rule of rules){
      if(rule.type=="include"){
        if(!item.title.includes(rule.value)){
          return false;
        }
      }else{
        if(item.title.includes(rule.value)){
          return false;
        }
      }
    }
    return true;
  })
  for(var item of filterList){
    item.id=0;
  }
  // response.value=filterList;
  return filterList;
}

function isNew(oldRss, item){
  for(const val of oldRss){
    if(JSON.stringify(val)==JSON.stringify(item)){
      return false;
    }
  }
  return true;
}

// 主进程

async function main(){
  var rss=[];
  var oldRss=[];

  if(updateNow){
    const rssResponse=await getXML();
    if(rssResponse[0]=="ERR"){
      console.log(`【${dayjs(new Date()).format('YYYY/MM/DD - HH:mm:ss')}】请求RSS服务器失败`);
    }else{
      console.log(`【${dayjs(new Date()).format('YYYY/MM/DD - HH:mm:ss')}】更新RSS服务器成功 => 下载全部项目`);
      oldRss=rss;
      rss=rssResponse;
      for(var item of rss){
        console.log(`【${dayjs(new Date()).format('YYYY/MM/DD - HH:mm:ss')}】下载: ${item.title}`);
        ariaRequest(item.media);
      }
    }
  }else{
    const rssResponse=await getXML();
    if(rssResponse[0]=="ERR"){
      console.log(`【${dayjs(new Date()).format('YYYY/MM/DD - HH:mm:ss')}】请求RSS服务器失败`);
    }else{
      console.log(`【${dayjs(new Date()).format('YYYY/MM/DD - HH:mm:ss')}】请求RSS服务器成功 => 等待下一次循环`);
      oldRss=rssResponse;
      rss=rssResponse;
    }
  }
  setInterval(async ()=>{
    const rssResponse=await getXML();
    if(rssResponse[0]=="ERR"){
      console.log(`【${dayjs(new Date()).format('YYYY/MM/DD - HH:mm:ss')}】请求RSS服务器失败`);
    }else{
      console.log(`【${dayjs(new Date()).format('YYYY/MM/DD - HH:mm:ss')}】更新RSS服务器成功 => 下载更新的项目`);
      oldRss=rss;
      rss=rssResponse;
      for(var item of rss){
        if(isNew(oldRss, item)){
          console.log(`【${dayjs(new Date()).format('YYYY/MM/DD - HH:mm:ss')}】下载: ${item.title}`);
          ariaRequest(item.media);
        }
      }
    }
  }, updateFreq*60*1000)
}


main();