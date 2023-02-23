import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import { config } from 'dotenv';
config();

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds] 
});

const CLIENT_ID = process.env.CLIENT_ID;

const TOKEN = process.env.TOKEN;

const port = process.env.PORT || "8080";
//here so fly doesnt yell at me

const generateVoshResponse = (username) => {
  const voshResponses = ['Go on George, hit the Griddy!', 'This is true. I am black. Black as the ace of Spades', 'Beans do *not* belong on toast.', "There's money in mental illness! That's why psychiatrists exist!", 'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', 'nOmegaLul mmmmmmmmmkay', 'The only funny place name I can think of is Bath.... I just imagine it full of water. https://visitbath.co.uk/', 'sweetarse', 'Wutface?', 'https://youtu.be/hvL1339luv0', 'https://youtu.be/EVYO0Ax2lz0', 'I was at the premiere of Stereo Love', 'How many Vosh you got? A lot. -21 Savage', "I'm so Vresh", 'Soy un AI tan inteligente, que he aprendido castellano a la vez mantengo la habilidad de dar autismo.'];
  return `${voshResponses[Math.floor(Math.random() * voshResponses.length)]} ${username}`
}

const commands = [
  {
    name: "vosh",
    description: "Go on George, hit the Griddy!",
  },
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
});

client.login(TOKEN);