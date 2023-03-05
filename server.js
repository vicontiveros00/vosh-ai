import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import { config } from 'dotenv';
config();
import { Configuration, OpenAIApi } from "openai";
import express from 'express';
import { aiVoshResponses, aiPrompt, staticVoshResponses, voshEmojis, voshSongLinks } from "./textPrompts.js";

//setup discord client
const client = new Client({ 
  intents: [GatewayIntentBits.Guilds] 
});

//get environment varilables
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;
const port = process.env.PORT;

//setup web server
const app = express();

app.get('/', (req, res) => {
  return res.sendFile('index.html', {
    root: '.'
  })
})

app.listen(port, "0.0.0.0", (req, res) => {
  console.log(`listening on port ${port}....`)
})

//configure openai
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//helper function to return random index from array
const getRandomIndexFromArr = (arr, username) => {
  if (arr.length > 1) {
    return `${arr[Math.floor(Math.random() * arr.length)]} ${username}`
  }
}

//get static vosh response
const generateVoshResponse = (username) => {
  const voshResponses = staticVoshResponses;  
  return getRandomIndexFromArr(voshResponses, username);
}

//get vosh emojis (server specific) GEORGE FINISH THIS
const generateVoshEmoji = (username) => {
  const emojiList = voshEmojis
  return getRandomIndexFromArr(emojiList, username);
}

//get a vosh song
const generateVoshSong = (username) => {
  const voshSongs = voshSongLinks;
  return getRandomIndexFromArr(voshSongs, username);
}

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

//list of commands
const commands = [
  {
    name: "vosh",
    description: "Static Vosh Response",
  },
  {
    name: "voshmoji",
    description: "Omegalul",
  },
  {
    name: "voshsong",
    description: "Kinda slaps tbh",
  },
	{
		name: "voshgpt",
		description: "AI Generated Vosh Response (This costs George money)",
	},
  {
    name: 'ping',
    description: "Test is Vosh AI is able to receive commands"
  },
  {
    name: 'credits',
    description: 'Vosh Bot credits'
  }
];

//idk what this does but discord js docs says you need it
const rest = new REST({ 
  version: "10" 
}).setToken(TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

  } catch (error) {
    console.error(error);
  }
})();

//set voshai activity
client.on("ready", () => {
  console.log(`${client.user.tag} active`);
  client.user.setActivity("Bath, UK and no beans");
});

//command hanlder
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case 'vosh':
      await interaction.reply(generateVoshResponse(interaction.user));
      break;
    case 'voshmoji':
      await interaction.reply(generateVoshEmoji(interaction.user));
      break;
    case 'voshsong':
      await interaction.reply(generateVoshSong(interaction.user));
      break;
    case 'voshgpt':
      await interaction.deferReply();
	    await interaction.editReply(await callApi());
      break;
    case 'ping':
      await interaction.reply('pong');
      break;
    case 'credits':
      await interaction.reply('Programmers:\nGeorge\nCheebo\n\nAI Prompt Writer:\nGeorge\n\nAI Modeled after:\nVosh Dith\n\nAPI:\nhttps://openai.com/blog/openai-api\n\nOffical Vosh AI site:\nhttps://voshai.fly.dev/\n\nGithub Repository:\nhttps://github.com/vicontiveros00/vosh-ai');
      break;
  }
});

client.login(TOKEN);