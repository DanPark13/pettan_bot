// Import discord.js Libraries
const fs = require('node:fs');
const {Client, Collection, Intents, ClientUser} = require('discord.js');
const {token} = require('./config.json');

// Create a new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

// Get the commands into the collection
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Get the event files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once){
        client.once(event.name, (...args) => event.execute(...args));
	}
    else{
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// When taking in commands outlined in `deploy-commands`, interact with different responses
client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try{
        await command.execute(interaction);
    } 
    catch (error){
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command', ephemeral: true});
    }
});

// Login to Discord with your client's token
client.login(token);
