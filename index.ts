require('dotenv').config({ path: './.env' });
import { AppConfig } from './config';
import * as WebSocket from 'ws';
import * as express from 'express';

let app = express();
const port = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("ok");
})

const ws = new WebSocket(AppConfig.wss.url);

ws.on('open', async function open() {

    console.log('Connected to twitch wss');

    ws.send(`PASS ${AppConfig.wss.token}`);
    ws.send(`NICK ${AppConfig.wss.username}`);

    ws.send('CAP REQ :twitch.tv/commands');
    ws.send('CAP REQ :twitch.tv/tags');

    ws.send(`JOIN #${AppConfig.wss.channel}`);

});

ws.on('message', function incoming(data) {

    if (data.includes('PING :tmi.twitch.tv')){
        console.log("se envia pong");
        ws.send('PONG :tmi.twitch.tv')
        return;
    }

    let command = data.split(" :!")[1];

    if(!command) return;

    command = {
        type : command.substr(0,command.indexOf(' ')),
        value : command.substr(command.indexOf(' ')+1), 
    }

    switch(command.type){
        case "personaje":
            console.log(command.value);
            break;
    }
});

app.listen(port,()=>{
  console.log(port)
});