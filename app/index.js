var generators = require('yeoman-generator');
var chalk = require('chalk');

module.exports = generators.Base.extend({
	prompting: function() {
		var done = this.async();
		this.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'Your project name',
				validate: function(input) {
					return !!input ? true : 'A name is required';
				}
			}, {
				type: 'input',
				name: 'version',
				message: 'Your project version',
				default: '0.0.0'
			}, {
				type: 'input',
				name: 'author',
				message: 'Author'
			}, {
				type: 'input',
				name: 'email',
				message: 'Author\'s email'
			}, {
				type: 'input',
				name: 'license',
				message: 'Project license',
				default: 'Apache-2.0'
			}, {
				type: 'list',
				name: 'css',
				message: 'CSS engine',
				choices: ['sass', 'less']
			}, {
				type: 'confirm',
				name: 'docker',
				message: 'Do you want to build using docker in place of native tools?',
				default: true
			}
		], function (props) {
			var author = [];
			if(props.author) {
				author.push(props.author);
			}
			if(props.email) {
				author.push('<' + props.email + '>');
			}
			props.author_email = author.join(' ');
			this._props = props;
			done();
		}.bind(this));
	},
	
	writing: {
		// Write script files
		writeNpmConfig: function() {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				{
					name: this._props.name,
					version: this._props.version || '',
					author: this._props.author_email || '',
					license: this._props.license || '',
					css_engine: this._props.css || 'sass'
				}
			);
		},
		
		writeBowerConfig: function() {
			this.fs.copyTpl(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json'),
				{
					name: this._props.name,
					version: this._props.version || '',
					author: this._props.author_email || '',
					license: this._props.license || ''
				}
			);
		},
		
		writeGruntFile: function() {
			this.fs.copyTpl(
				this.templatePath('_Gruntfile.js'),
				this.destinationPath('Gruntfile.js'),
				{
					name: this._props.name,
					css_engine: this._props.css || 'sass'
				}
			);
		},
		
		writeProjectRelatedFiles: function() {
			this.fs.copy(this.templatePath('bowerrc'), this.destinationPath('.bowerrc'));
			this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
		},
		
		writeDockerScripts: function() {
			this.fs.copyTpl(this.templatePath('dock'), this.destinationPath('dock'), { name: this._props.name, css_engine: this._props.css || 'sass' });
			this.fs.copyTpl(this.templatePath('server.sh'), this.destinationPath('server.sh'), { name: this._props.name });
			this.fs.copy(this.templatePath('setup.sh'), this.destinationPath('setup.sh'));
			this.fs.copy(this.templatePath('build.sh'), this.destinationPath('build.sh'));
			this.fs.copy(this.templatePath('watch.sh'), this.destinationPath('watch.sh'));
		},
		
		writeExampleFiles: function() {
			this.fs.copy(this.templatePath('src/html'), this.destinationPath('src/html'));
			this.fs.copy(this.templatePath('src/js'), this.destinationPath('src/js'));
			if(this._props.css === 'less') {
				this.fs.copy(this.templatePath('src/less'), this.destinationPath('src/less'));
			} else {
				this.fs.copy(this.templatePath('src/scss'), this.destinationPath('src/scss'));
			}
			this.fs.copy(this.templatePath('site'), this.destinationPath('site'));
		}
	},
	
	install: function() {
		if(this._props.docker) {
			this.spawnCommand(this.destinationPath('setup.sh'));
		} else {
			this.installDependencies();
		}
	},
	
	end: {
		goodbye: function() {
			console.log("");
			console.log(chalk.green.bold("Now you can:"));
			if(this._props.docker) {
				this.log("  * build once using script " + chalk.cyan.bold('./build.sh') + " (without arguments)");
				this.log("  * build when resources changes using script " + chalk.cyan.bold('./watch.sh') + " (without arguments)");
				this.log("  * test your site with command " + chalk.cyan.bold('./server.sh [port]'));
			} else {
				this.log("  * build once command '" + chalk.cyan.bold('grunt') + "' (without arguments)");
				this.log("  * build when resources changes using command '" + chalk.cyan.bold('grunt watch') + "'");
				this.log("  * test your site mounting or copying subdir site in your web server workdir");
			}
		}
	}
});
