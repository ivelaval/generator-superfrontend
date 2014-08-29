'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var SuperfrontendGenerator = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
     // welcome message
    if (!this.options['skip-welcome-message']) {
       this.log(yosay(
        'Bienvenido al Superfrontend Generator!'
      ));
      this.log(chalk.magenta(
        'Te permitimos trabajar con varias tecnologías como Boilerplate, sass, coffeeScript, etc. ' +
        'Procedamos a generar el archivo Gruntfile.js y Bower.js.'
      ));
    }

    

    var prompts = [
    {
      type: 'confirm',
      name: 'someOption',
      message: 'Deseas habilitar ?',
      default: false
    },
    {
      type: 'confirm',
      name: 'someOption2',
      message: 'Would you like to enable this option?',
      default: false
    },
    ];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;
      //
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('app');
      this.dest.mkdir('app/templates');

      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
  
});

module.exports = SuperfrontendGenerator;
