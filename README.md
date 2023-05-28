# datamonitor
<p align="center">
<img src="" alt="Andromasoft logo"/>
</p>

<b>Full-Stack Windows Data Monitor App</b>
  - Monitors Kucoin exchange price & trading bot data
  - Uses RSI, MACD and SMA to display 1hr & 24hr price trends
  - Displays day of week, date, time 
  - Fetches current, hourly & daily weather data at 1 location 
  - Todo list using local storage
  - Electron.js, Node.js

<b><b>Installation (windows 10/11)</b></b>
  - Download & Install Node.js
  - Download and extract project
  - Open terminal (cmd), navigate to datamonitor/electron_app & type "npm install"
  - Once finished, type "cd .." to go back to the root directory
  - type cd server to navigate to the server
  - type "npm install" 
  - close terminal
 
<b><b>API key setup</b></b>
  - For weather data, you must obtain a key from https://api.openweathermap.org and edit the server.js file
    in 2 places. It is located in datamonitor/server/server.js. You must enter your key on line 39
    const OPEN_WEATHER_MAP_API_KEY = 'YOURKEY' and enter your ip address on line 49 for ipaddr to get your
    location from your ip on line 49: const parsedIp = ipaddr.process('your ip'). Get your ip by searching "whats my ip"
  - For kucoin crypto data, obtain a key from <a href='https://kucoin.com'>Kucoin</a>, making an account if 
    you don't have one already, then account in top right -> api management -> Create API
    -Place your key on line 36 and secret on 37 const KUCOIN_API_KEY = 'YOUR_SECRET';
     const KUCOIN_SECRET_KEY = 'YOUR_KEY'
  - You change the pairs you want to follow in the /crypto route in the server on line 83, make sure to keep
    the same syntax and that kucoin lists the pair. The Bot section loops through all your active bots and displays
    the whole total and each individial crypto total.
  - The global alarm off keyboard key will make that key useless in other apps while this app is running. I chose the up arrow, but 
    you can change it to what you like on line 35 in electron_app/components/alarm.js and lines 24 and 31 in electron_app/main.js 
    
 <b><b>Telegram mobile notifications when one of your kucoin bots make a trade</b></b>
  - Download telegram on mobile device
  - Get the bot token from the bot father on telegram for your telegram bot
  - paste it into line 16 in server.js
  - create a console log inside the sendTelegramMessage() to get the chat id from the token, console.log(bot.TELEGRAM_CHAT_ID)
  - run the app and check the server console for the logged chat id and enter it on line 17 in the server.js file.
  - delete the console.log you just added.
 <b><b>Start App</b></b>
  - double click start_app.bat located in the root of the project "datamonitor/start_app.bat", you can also pin the batch shortcut to
    your taskbar.
