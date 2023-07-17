#!/usr/bin/env node

/**
 * ex-api-cli
 * CLI to automatically clone the ex-api-template starter
 *
 * @author Ysn4Irix <https://ysnirix.xyz>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const starter = require('./utils/starter');

const input = cli.input;
const flags = cli.flags;

(async () => {
	const dirFlag = flags.directory || flags.d;
	if (input.length === 0 || !flags || !input.includes('create')) {
		init();
		cli.showHelp(0);
	}

	flags.help && cli.showHelp(0);

	if (input.includes('create') && dirFlag) {
		await starter(dirFlag);
	} else {
		cli.showHelp(0);
	}

	flags.debug && log(flags);
})();
