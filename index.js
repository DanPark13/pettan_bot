// Import discord.js Libraries
const {Client, Intents, Interaction} = require('discord.js');
const { intersection } = require('zod');
const {token} = require('./config.json');

// Create a new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Pettan Bot Ready!');
});

// When taking in commands outlined in `deploy-commands`, interact with different responses
client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const {commandName} = interaction;

    if(commandName === 'ping'){
        await interaction.reply('pong!');
    } 
    else if (commandName === 'server-info'){
        await interaction.reply(`Server Name: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}`);
    } 
    else if (commandName === 'user-info'){
        await interaction.reply(`User: ${interaction.user.tag}\nYour ID: ${interaction.user.id}`);
    }
});

// Login to Discord with your client's token
client.login(token);
