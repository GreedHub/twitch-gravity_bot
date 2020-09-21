import { AppConfig } from '../config';
import * as WebSocket from 'ws';

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
    switch(data){

        case 'PING :tmi.twitch.tv':
            ws.send('PONG :tmi.twitch.tv')
            break;

        default:
            console.log(data);
            break;

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


export {ws as TwitchWssController};