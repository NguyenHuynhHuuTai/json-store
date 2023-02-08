'use strict';
const path = require('path');
const Conf = require('conf');

class JsonStore extends Conf {
	constructor(options) {
		options = {
			name: 'config',
			...options
		};
		options.configName = options.name;
		delete options.name;

		super(options);
	}

	openInEditor() {
		shell.openPath(this.path);
	}
}

module.exports = JsonStore;
