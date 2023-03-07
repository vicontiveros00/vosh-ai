# Vosh AI

![Vosh](/media/vosh.PNG)

Man's greatest achievment is the creation of the computer and using it to develop artificial intelligence. Vosh AI's state of the art neural networks provide the most Vosh-like responses humanity has ever seen.

[Invite link](https://discord.com/api/oauth2/authorize?client_id=1078241997774659714&permissions=2048&scope=bot).

## Usage
**Note!** Ensure Vosh Bot has permissions to send messages in a given channel.<br>
Commands:
- `/vosh`
    - Returns a static Vosh response
- `/voshmoji` **SERVER SPECIFIC**
    - Returns a Voshy emoji
- `/voshsong`
    - Returns a Voshy song as a Spotify link
- `/voshgpt`
    - AI Generated Vosh Response
- `/ping`
    - Test that the Vosh Bot is online
- `/credits`
    - Gives credit to those involved in this bot's an AI model's development

## Developer Usage
Requirements:
- [Node ^18.14.2](https://nodejs.org/en/)

At root directory, ensure the following environment variables are defined in a `.env` file. (Purposely omitted from the repo for security reasons.)
- Desired port to run the AI (`PORT`)
- Vosh AI Discord token (`TOKEN`)
- Vosh AI Discord Client ID (`CLIENT_ID`)
- Open AI API Key (`OPENAI_AI_KEY`)

### npm Commands
- <kbd>npm install</kbd> on initial setup to install necessary dependencies.
    - [Discord.js](https://discordjs.guide/#before-you-begin)
    - [Dotenv](https://www.npmjs.com/package/dotenv)
    - [Express](https://expressjs.com/)
    - [Open AI](https://openai.com/blog/openai-api)
- <kbd>npm run dev</kbd> to run the AI in developer mode. (Auto restarts the server on file changes.)
- <kbd>npm run start</kbd> to run the server in production mode.

**Note!** Running two instances of the AI simultaneously will produce errors and potentially crash the hosted instance of the Vosh AI. Ensure you are using your own enviornment variables in your local `.env` file.

### [textPrompts.js](/textPrompts.js)
If contributions are being made, please ensure the Vosh data is in the proper format and location as described below:
- `aiVoshResponses`
    - Data to feed into the AI, consists of very Voshly phrases
- `staticVoshResponses`
    - An array of possible static Vosh responses
- `voshEmojis` (Work in progress)
    - An array of possible server specific emojis
- `voshSongLinks`
    - Array of possible Vosh songs as Spotify links
- `aiPrompt`
    - Prompt to feed into the AI model

### [server.js](/server.js)
As Vosh stated, coding is "big cringe". This file contains the main logic for the Discord bot. Check code comments for each function's purpose.

Vosh AI currently uses Open AI's Davinci model.

```javascript
//configure openai
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

...

//call openai with prompt to generate vosh response
const callApi = async() => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${aiPrompt} ${aiVoshResponses}`,
      max_tokens: 190,
      temperature: 0.66,
    });
    //george use the debugger stop logging to console 💀
    return `${completion.data.choices[0].text}`;
  } catch (error) {
    return 'Uuuuhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'
  }
}
```

**Note!** When changes are made and pushed to the main branch of this repository, please increment `version` in [`package.json`](/package.json).

&copy; George and Cheebo (Vic)
