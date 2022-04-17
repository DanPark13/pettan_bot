const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Gets latency report'),
    async execute(interaction){
        await interaction.reply('Pong!');
    }
}