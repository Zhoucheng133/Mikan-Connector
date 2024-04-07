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