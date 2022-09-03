/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 03-09-2022
 * @modify date 03-09-2022
 * @desc Initializing the cli flags & commands
 */

const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	directory: {
		type: `string`,
		alias: 'd',
		desc: `The name of the directory to create.`
	},
	clear: {
		type: `boolean`,
		default: false,
		desc: `Clear the console`
	},
	help: {
		type: `boolean`,
		default: false,
		desc: `Print help info`
	},
	debug: {
		type: `boolean`,
		default: false,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}
};

const commands = {
	create: {
		desc: `Create an express api starter`
	}
};

const helpText = meowHelp({
	name: `ex-api`,
	commands,
	flags,
	defaults: false
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	allowUnknownFlags: false,
	flags
};

module.exports = meow(helpText, options);
