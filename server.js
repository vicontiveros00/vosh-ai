import { REST, Routes, Client, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
import { config } from 'dotenv';
config();
import { Configuration, OpenAIApi } from "openai";
import express from 'express';
import { aiVoshResponses, aiPrompt, staticVoshResponses, voshEmojis, voshSongLinks } from "./textPrompts.js";
import Package from './package.json' assert {
  type: 'json'
}

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
const callApi = async(userQuery) => {
  try {
    const completion = await openai.createCompletion({
		//Fine-tuned model lessgoooooo boiiisssssss (I think this actually costs me even more money
		//it had better be fucking worth it
      model: "davinci:ft-personal-2023-03-06-21-07-44",
      prompt: userQuery || `${aiPrompt} ${aiVoshResponses}`,
      max_tokens: 120,
      temperature: 0.7,
      //aquí un comentario en castellano para molestar a george, ¡dále george, pega el griddy!
	  //J'ai utilisé Google Translate pour écrire ceci pour rendre Cheebo fou
    
    //la diferencia es que yo no uso el google translate :v los frances robaron el croissant de nosotros era invento español
    });
    //george use the debugger stop logging to console 💀
	  if (userQuery) {
		//This should be in a file but I cba also we should like make it an embed so it looks cool maybe it could
		//even send a random Vosh image or maybe we could actually use the AI to generate an image of what it thinks
		//Vosh would look like if he was saying the response and then send that woahhhhhhh 
      return `Quesiton: ${userQuery}\nVosh response:\n${completion.data.choices[0].text}`
	  }
	
	  return completion.data.choices[0].text;
    
    } catch (error) {
      console.error(error);
	    if (userQuery) {
		//If the user asks a question and it fails it just @s the real Vosh lmao
		    userQuery + '@261087265466351616'
	    }
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
		name: "voshquestion",
		description: "Ask Vosh a question directly (This also costs George money)",
		options: [
			{//I watched a video and saw you can do it like this but they should all be in a seperate file and then we use a command handler to load them in also this line is getting pretty damn long huh oh it wraps around that's cool.

        //bro fuck the video i cant stand writing commonjs without my arse bleeding
				name: 'question-for-vosh',
				description: 'The question you wish to ask Mr Dith',
				required: true,
				type: 3	//This means string because idk js is gay
			}
		]
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

/*const voshInteraction = {
	data: new SlashCommandBuilder()
		.setName('vdiab')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
}; ???? */

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
	  case 'voshquestion':
	    await interaction.deferReply();
		  await interaction.editReply(await callApi(interaction.options.getString('question-for-vosh')));
	    break;
    case 'credits':
      await interaction.reply(`aha\nProgrammers:\nGeorge\nCheebo\n\nAI Prompt Writer:\nGeorge\n\nAI Modeled after:\nVosh Dith\n\nAPI:\nhttps://openai.com/blog/openai-api\n\nOffical Vosh AI site:\nhttps://voshai.fly.dev/\n\nGithub Repository:\nhttps://github.com/vicontiveros00/vosh-ai\n\n**Version: ${Package.version}**\n\n© George and Cheebo`);
      break;
  }
});

client.login(TOKEN);