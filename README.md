# Vosh AI

**TO DO: Update Docs**<br>
![Vosh](/media/vosh.PNG)

Man's greatest achievment is the creation of the computer and using it to develop artificial intelligence. Vosh AI's state of the art neural networks provide the most Vosh-like responses humanity has ever seen.

[Invite link](https://discord.com/api/oauth2/authorize?client_id=1078241997774659714&permissions=2048&scope=bot).

## Usage
Ensure the bot has permission to send messages in a given channel. The slash command to interact with Vosh AI is <kbd>/vosh</kbd>.

## Developer Usage
Requirements:
- [Node ^18.14.2](https://nodejs.org/en/)

At root directory, ensure the following environment variables are defined in a `.env` file. (Purposely omitted from the repo for security reasons.)
- Desired port to run the AI (`PORT`)
- Vosh AI Discord token (`TOKEN`)
- Vosh AI Discord Client ID (`CLIENT_ID`)

### Commands
- <kbd>npm install</kbd> on initial setup to install necessary dependencies.
    - [Discord.js](https://discordjs.guide/#before-you-begin)
    - [Dotenv](https://www.npmjs.com/package/dotenv)
- <kbd>npm run dev</kbd> to run the AI in developer mode. (Auto restarts the server on file changes.)
- <kbd>npm run start</kbd> to run the server in production mode.

**Note!** Running two instances of the AI simultaneously will produce errors and potentially crash the hosted instance of the Vosh AI. Ensure you are using your own token and client ID in you local `.env` file.

### [server.js](/server.js)
Vosh-like responses are located in the `voshResponses` array found on line 17. To add to Vosh AI's neural network, add the response as a string to the array.

```javascript
const voshResponses = ['example1', 'example2'...];
```
Vosh AI's main neural processor is found within the `generateVoshResponse` function on line 16.<br>
```javascript
return `${voshResponses[Math.floor(Math.random() * voshResponses.length)]} ${username}`
```
