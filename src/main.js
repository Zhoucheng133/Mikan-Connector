import {aria2Link, aria2Secret, rules, rssLink, updateFreq, updateNow} from "./parameters"
import axios from "axios";
const { XMLParser} = require("fast-xml-parser");

function ariaRequest(aria2Link, aria2Secret, btLink){
  const data={
    "jsonrpc": "2.0",
    "method": "aria2.addUri",
    "id": 1,
    "params": [
      aria2Secret=="" ? `token:${aria2Secret}`: "",
      [btLink], {
        "split": "5",
        "max-connection-per-server": "5",
        "seed-ratio": "0"
      }
    ]
  }
  axios.post(aria2Link, data);
}

async function rssRequest(rssLink){
  var response;

  try {
    response=await axios.get(rssLink);
  } catch (error) {
    console.log("【Point1】"+error);
    return ["ERR"];
  }
  const parser = new XMLParser();
  let jObj = parser.parse(response.data);
  var list=jObj.rss.channel.item

  var matches = [...response.data.matchAll(/url="([^"]+)"/g)];

  if(matches.length!=list.length){
    console.log("return []");
    return ["ERR"];
  }
  try {
    matches.forEach(function(match, index) {
      var url = match[1];
      list[index].media=url;
      list[index].id=index;
    });
  } catch (error) {
    console.log("【Point2】"+error);
    return ["ERR"];
  }

  return list;
}