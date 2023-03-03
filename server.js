import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import { config } from 'dotenv';
config();
import { Configuration, OpenAIApi } from "openai";
import { aiVoshResponses, aiPrompt } from "./textPrompts.js";

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds] 
});

const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateVoshResponse = (username) => {
    const voshResponses = ['Go on George, hit the Griddy!', 'This is true. I am black. Black as the ace of Spades', 'Beans do *not* belong on toast.', "There's money in mental illness! That's why psychiatrists exist!", 'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', 'nOmegaLul mmmmmmmmmkay', 'The only funny place name I can think of is Bath.... I just imagine it full of water. https://visitbath.co.uk/', 'sweetarse', 'Wutface?', 'https://youtu.be/hvL1339luv0', 'https://youtu.be/EVYO0Ax2lz0', 'I was at the premiere of Stereo Love', 'How many Vosh you got? A lot. -21 Savage', "I'm so Vresh", 'Soy un AI tan inteligente, que he aprendido castellano a la vez mantengo la habilidad de dar autismo.', 'DUDE I LOST!!', 'DO you ever sit in a permanent blanky mode ? ', ' ^ ', 'Haha yeah man'];
  return `${voshResponses[Math.floor(Math.random() * voshResponses.length)]} ${username}`
}

const generateVoshEmoji = (username) => {
    const voshEmojis = ['<:omegalul:732266781380444191>', '<:Pog:562729730982412343>', 'etc etc I will finsih then when it know it actually works'];
    return `${voshEmojis[Math.floor(Math.random() * voshEmojis.length)]} ${username}`
}

const generateVoshSong = (username) => {
    const voshSongLinks = ['https://open.spotify.com/track/4ly6SAui02c2LUV0yftP3U?si=47f637ccd03f43d3',
        'https://open.spotify.com/track/2O1qYJTA2BI5ypFFqEZhh4?si=6f53ff0d27534207',
        'https://open.spotify.com/track/33fJZ55wZdbiba2ynJNoZr?si=a373b60bc6fe4dc0'];
    return `${voshSongLinks[Math.floor(Math.random() * voshSongLinks.length)]} ${username}`
}

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

const commands = [
    {
        name: "vosh",
        description: "Go on George, hit the Griddy!",
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
		    description: "AI Generated Vosh Response",
	  },
    {
        name: 'ping',
        description: "Test is Vosh AI is able to receive commands"
    }
];

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

client.on("ready", () => {
  console.log(`${client.user.tag} active`);
  client.user.setActivity("Bath, UK and no beans");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "vosh") {
    await interaction.reply(generateVoshResponse(interaction.user));
    }
  if (interaction.commandName === "voshmoji") {
      await interaction.reply(generateVoshEmoji(interaction.user));
  }
  if (interaction.commandName === "voshsong") {
      await interaction.reply(generateVoshSong(interaction.user));
  }
  if (interaction.commandName === "voshgpt") {
	  await interaction.deferReply();
	  await interaction.editReply(await callApi());
  }
  if (interaction.commandName === "ping") {
    await interaction.reply('pong');
  }
});

client.login(TOKEN);