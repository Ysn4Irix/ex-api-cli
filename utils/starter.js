/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 03-09-2022
 * @modify date 01-12-2022
 * @desc the starter file where the logic lives
 */

const fs = require('fs');
const { spawn } = require('child_process');
const degit = require('degit');
const ora = require('ora');
const alert = require('cli-alerts');
const { green: g, yellow: y, dim: d, red: r, white: w } = require('chalk');
const questions = require('./questions');

const spinner = ora({
	text: ''
});

module.exports = async directory => {
	console.log();
	try {
		if (
			!directory ||
			directory.match(/[`~,<>;@#&^?%*!$§µ£²°':"\/\[\]\|{}()=+]/)
		) {
			alert({
				type: `error`,
				msg: `Invalid directory name: "${directory}"`
			});
			process.exit(-1);
		}

		if (directory !== '.' && fs.existsSync(directory)) {
			alert({
				type: `error`,
				msg: `Directory "${directory}" already exists."`
			});
			process.exit(-1);
		}

		const vars = await questions(directory);

		const repoName = 'ysn4irix/ex-api-template';

		const emitter = degit(repoName, {
			force: true,
			verbose: true
		});

		function runCommand(command, args, options = undefined) {
			const spawned = spawn(command, args, options);

			return new Promise(resolve => {
				spawned.stdout.on('data', data => {
					console.log(`${d(data.toString())}`);
				});

				spawned.stderr.on('data', data => {
					console.log(`${d(data.toString())}`);
				});

				spawned.on('close', () => {
					resolve();
				});
			});
		}

		emitter.clone(directory).then(async () => {
			console.log('\n');
			spinner.start(
				`${y(`🚀 Installing dependencies...`)} \n\n${d(
					`It may take moment depending on your internet speed...`
				)}`
			);
			const command = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
			await runCommand(command, ['install'], {
				cwd:
					directory === '.'
						? process.cwd()
						: `${process.cwd()}/${directory}`
			});
			spinner.clear();
			spinner.start(`${y('Updating package.json')}`);

			const filename =
				directory === '.'
					? `${process.cwd()}/package.json`
					: `${process.cwd()}/${directory}/package.json`;

			const file = require(filename);

			file.name = vars.projectName;
			file.description = vars.description;
			file.author.name = vars.authorName;
			file.author.email = vars.authorEmail;
			file.author.url = vars.authorWebsite;
			file.repository.url = `git+${vars.gitRepo}.git`;
			file.bugs.url = `git+${vars.gitRepo}/issues`;
			file.homepage = `${vars.gitRepo}#readme`;

			fs.writeFile(filename, JSON.stringify(file, null, 2), err => {
				if (err) return console.log(err);

				spinner.succeed(`${g(`Update finished!`)}`);
				alert({
					type: `success`,
					name: `DONE`,
					msg: `\n\n${vars.projectName} created successfully.`
				});
				console.log('');
				console.log(`${w('To get started:')}\n`);
				vars.projectName !== '.' &&
					console.log(`${y(`cd ${vars.projectName}`)}\n`);
				console.log(`${y('npm run dev')}\n`);
			});
		});
	} catch (error) {
		spinner.clear();
		console.log('\n');
		spinner.fail(`${r(`Error`)}`);
		console.log(error.message);
	}
};
