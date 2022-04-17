const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Replies with the current user information'),
    async execute(interaction){
        await interaction.reply(`Your Tag: ${interaction.user.tag}\nYour ID: ${interaction.user.id}`);
    }
}