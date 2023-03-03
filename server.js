import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import { config } from 'dotenv';
config();
import { Configuration, OpenAIApi } from "openai";

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds] 
});

const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const port = process.env.PORT || "8080";
//here so fly doesnt yell at me

const aiVoshResponses = ['Go on George, hit the Griddy! This is true. I am black. Black as the ace of Spades Beans do *not* belong on toast Theres money in mental illness! Thats why psychiatrists exist! nOmegaLul mmmmmmmmmkay The only funny place name I can think of is Bath.... I just imagine it full of water. Wutface? I was at the premiere of Stereo Love How many Vosh you got? A lot. 21 Savage Im so Vresh DUDE I LOST!! DO you ever sit in a permanent blanky mode ? Haha yeah man its quite sad really the charm comes from me saying it whereas the bot just kinda guesses based on a prompt the human element makes it good the vosh way would be to just not code at all cause coding big cringe Ah yes a classic not the source code leak or whatever the fuck yeah guys line 2500 is syntax 1 fighting that losing battle We out here arguing with human vosh and ai vosh I would never say anything like this at all lmao Oh shiz its unrealistic as fuck but hey its funny le haha About damn time all it took was a new game to come out Well I dont respond in gifs so I wouldnt know yeah makes sense tbh so let me get this straight she called you? Or the ballscoigne ting in London? and they thought you were trying to scam yourself? it just sounds like a 36 minute long voicemail cause i cant hear your responses in  it i dont really understand it tbh lmao maybe im jus being a brainlit Yems soonge when I have le money We both know that your bladder is made out of wood Im on the train atm Ill be heading to cex to see if I can get a refund or exchange on something I bought there, and Im alsogonna have a look around for some ideas for mellotrons bday And potentially get some fragrancesId theyre on a good offer Maybe even fill up ones I have Yeeee Its a pity you couldnt jerk downtodayge you wouldce loved climbing on the mountain of shit he has Very much abused the overdraft limit on my card youd smell like me for a year after one spary sell it for a billion then id do the same for women just a female version of me bruh all the outlets/shops for louis v are in london, "birmingham", leeds, and manchester theres like 15 in london god we should go there grandad, after being at propdog of course walk in there and spend all my savings money on perfumes and shitty clothes that I will NEVER wear jesus christ its almost depressing lookking at it really its the biggest form of consuermism there is alongside other desinger brands im looking at their leather jackets, fuck me they are nice but man are they expesnive hahah'];
 
const aiPrompt = 'These quotes are from a man named Josh Smith, also known as Vosh Dith. He is quite blunt in the way he speaks, and is very dismissive of new ideas, or things he does not understand. He does a lot of illogical and questionable things, such as not understanding left-overs should be kept in a fridge, or pouring a cup of coffee without boiling the kettle first, and thinking that the milk being added would cause the drink to be cold, rather than it just being that the water was never hot in the first place. Generate a quote from him in first person based on this information and the following quotes: ';

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

async function callApi() {
    const completion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${aiPrompt} ${aiVoshResponses}`,
		max_tokens: 190,
		temperature: 0.66,
  });
  //console.log(completion);
  return `${completion.data.choices[0].text}`;
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
		name:"voshgpt",
		description: "If this works I'll be amazed",
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
	  //await wait (4000);
	  await interaction.editReply(await callApi());
	  
  }
});

client.login(TOKEN);