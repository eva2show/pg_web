
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
process.env['NODE_EXTRA_CA_CERTS'] = "../../node_modules/node_extra_ca_certs_mozilla_bundle/ca_bundle/ca_intermediate_root_bundle.pem";
import https from "node:https";
import fs from "node:fs";

https.globalAgent.options.ca = fs.readFileSync('../../node_modules/node_extra_ca_certs_mozilla_bundle/ca_bundle/ca_intermediate_root_bundle.pem');

// console.log("https.globalAgent.options.ca", https.globalAgent.options.ca)

// var options = {
//     host: 'devmapi.z13a70.com',
//     port: 443,
//     path: '/v1/game/launch',
//     method: 'POST'
// };

// const req = https.request(options, (res) => {

//     console.log('statusCode:', res.statusCode);
//     console.log('headers:', res.headers);

//     res.on('data', (d) => {
//         process.stdout.write(d);
//     });
// });

// req.on('error', (e) => {
//     console.error(e);
// });
// req.end();


import { request, fetch as fetch2 } from 'undici'


async function main(){
    const data = {
        url: "https://devmapi.z13a70.com/v1/game/launch",
        body: { "merchant": "Jack23", "member": "test6666", "gameId": 8892, "timestamp": 1, "password": "123456" },
        sign: "de7383c1f70a0bede1129860c239c98a"
    }
    
    const res = await request(data.url, {
        method:"POST",
        ca:https.globalAgent.options.ca,
        headers: {
            // "Content-Type": "application/text;charset=UTF-8",
            // "Content-Type": "application/json;charset=UTF-8",
            "Sign": data.sign
        },
        body:JSON.stringify(data.body)
    }).then(d=>{
        console.log("then:",d);
        return d
    }).catch(e=>{
        console.log("catch:",e);
    });
    
    // const json = await res.json();
    // console.log(json)

}
main();