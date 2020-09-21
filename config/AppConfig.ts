const AppConfig = {
    wss:{
        username: process.env.BOT_USERNAME,
        channel: process.env.CHANNEL_NAME,
        token: process.env.OAUTH_TOKEN,
        url: process.env.WSS_URL,
    }
}

export {AppConfig};