/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 03-09-2022
 * @modify date 03-09-2022
 * @desc Initialization file
 */

const welcome = require('cli-welcome');
const pkg = require('./../package.json');
const unhandled = require('cli-handle-unhandled');

module.exports = () => {
	unhandled();
	welcome({
		title: `Express API CLI`,
		tagLine: `by Ysn4Irix`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#00DC82',
		color: '#000000',
		bold: true
	});
};
