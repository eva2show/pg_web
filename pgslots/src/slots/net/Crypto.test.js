import cryptojs from "crypto-js";
import {subtle} from "node:crypto";

// const { subtle } = crypto;

console.log("cryptojs",cryptojs.AES)
// console.log("subtle",subtle)

const decrypt_key = "96ac58d7a2efba1f416d2489f9bde583"; // 解密秘钥




let key = cryptojs.enc.Utf8.parse(decrypt_key);
const keySizeDWORD = 256 / 32, ivSizeDWORD = 128 / 32, iterations = 1;

console.log("key:",key);

var hex = cryptojs.enc.Hex.stringify(key);

console.log("hex:",hex);

const rawKey = string2buffer(hex);

console.log("rawKey:", rawKey );

const key2 = await crypto.subtle.importKey("raw", rawKey, "AES-CBC", false, ["decrypt"]);



function string2buffer (str) {
    return new Uint8Array(
      str.match(/[\da-f]{2}/gi).map(function (h) {
        return parseInt(h, 16);
      })
    ).buffer;
  }