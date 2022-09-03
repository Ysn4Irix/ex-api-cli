/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 03-09-2022
 * @modify date 03-09-2022
 * @desc enquirer inputs
 */

const path = require('path');
const ask = require('./ask');

module.exports = async directory => {
	const projectName = await ask({
		name: `projectName`,
		message: `What is your project name ?`,
		initial: directory === '.' ? path.basename(process.cwd()) : directory
	});
	const description = await ask({
		name: `description`,
		message: `Your project description`,
		initial: `an express api starter`
	});
	const authorName = await ask({
		name: `authorName`,
		message: `Author`,
		initial: ``
	});
	const authorEmail = await ask({
		name: `authorEmail`,
		message: `Author email`,
		initial: ``
	});
	const authorWebsite = await ask({
		name: `authorWebsite`,
		message: `Author website`,
		initial: ``
	});
	const gitRepo = await ask({
		name: `gitRepo`,
		message: `Github repository url`,
		initial: ``
	});

	const vars = {
		projectName,
		description,
		authorName,
		authorEmail,
		authorWebsite,
		gitRepo
	};

	return vars;
};
