const { SlashCommandBuilder } = require('discord.js');
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('batphone')
		.setDescription('Sends a batphone message to ALL users on the SMS list. Do not use for testing. ')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Text to send')
                .setRequired(true)),
	async execute(interaction) {

        console.log(interaction);
        //Todo: Figure out reasonable storage spot
        smsNumbers = ['']

        for (i = 0; i < smsNumbers.length; i++) {
            twilio.messages
            .create({
                body: interaction.options.getString('message'),
                from: '+18444226038',
                to: smsNumbers[i]
            })
            .then(message => console.log(message.sid));
        }
		await interaction.reply('Sent Message: ' + interaction.options.getString('message'));
	},
};