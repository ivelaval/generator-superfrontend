'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var SuperfrontendGenerator = yeoman.generators.Base.extend({

  initializing: function (arg, options) {
    //this.phk = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    this.pkg = require('../package.json');
    //this.pkg = this.dest.readJSON('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
     // welcome message
    if (!this.options['skip-welcome-message']) {

       this.log(yosay(
        'Bienvenido al Superfrontend Generator!'
      ));
      this.log(chalk.red(
        'Te permitimos trabajar con varias tecnologías como Boilerplate, sass, coffeeScript, etc. ' +
        'Procedamos a generar el archivo Gruntfile.js y Bower.js.'
      ));
    }

    var prompts = [
    {
      type: 'list',
      name: 'PreprocessorCssOption',
      message: '(1/6) Que preprocesador CSS deseas utilizar?',
      choices: [
        {
          name: "Sass with Compass",
          value: "sass"
        },
        {
          name: "Less",
          value: "less"
        },
        {
          name: "Stylus",
          value: "stylus"
        },
        {
          name: "Ninguno",
          value: "none"
        }
      ],
      default: "sass"
    },
    {
      type: 'list',
      name: 'FrameworkCssOption',
      message: '(2/6) Que Framework CSS deseas utilizar?',
      choices: [
        {
          name: "Foundation",
          value: "foundation"
        },
        {
          name: "Bootstrap",
          value: "bootstrap"
        },
        {
          name: "Inuit",
          value: "inuit"
        },
        {
          name: "Jeet",
          value: "jeet"
        },
        {
          name: "Ninguno",
          value: "none"
        }
      ],
      default: "foundation"
    },
    {
      type: 'list',
      name: 'PreprocessorHtmlOption',
      message: '(3/6) Que preprocesador Html deseas utilizar?',
      choices:[
        {
          name: "Haml",
          value: "haml"
        },
        {
          name: "Jade",
          value: "jade"
        },
        {
          name: "Ninguno",
          value: "none"
        }

      ],
      default: "haml"
    },
    {
      type: 'confirm',
      name: 'PreprocessorJavascriptOption',
      message: '(4/6) Deseas utilizar CoffeeScript?',
      default: true
    },
    {
      type: 'list',
      name: 'FrameworkJavascriptOption',
      message: '(5/6) Cual framework javascript deseas utilizar?',
      choices: [
        {
          name: "AngulaJS",
          value: "angular"
        },
        {
          name: "BackboneJS",
          value: "backbone"
        },
        {
          name: "Ninguno",
          value: "none"
        }
      ],
      default: "angular"
    },
    {
      type: 'checkbox',
      name: 'LibrariesJavascriptOption',
      message: '(6/6) Cuales librerias o plugins deseas utilizar?',
      choices: [
      {
        name: "RequireJS",
        value: "requirejs",
        checked: true
      },
      {
        name: "Underscore",
        value: "underscore",
        checked: true
      },
      {
        name: "Modernizer",
        value: "modernizer",
        checked: true
      },
      {
        name: "Jquery",
        value: "jquery",
        checked: true
      }
      ]
    }
    ];

    this.prompt(prompts, function (props) {

      this.PreprocessorCssOption = props.PreprocessorCssOption;
      this.FrameworkCssOption = props.FrameworkCssOption;
      this.PreprocessorHtmlOption = props.PreprocessorHtmlOption;
      this.PreprocessorJavascriptOption = props.PreprocessorJavascriptOption;
      this.FrameworkJavascriptOption = props.FrameworkJavascriptOption;
      this.LibrariesJavascriptOption = props.LibrariesJavascriptOption;

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
    },

    task: function(){
      
      var _tasks  = [];  

      //configuración
      /*
      this.gruntfile.insertConfig("watch", "{}");
      this.gruntfile.insertConfig("concat", "{}");
      this.gruntfile.insertConfig("jshint", "{beforeconcat:['src/foo.js','src/bar.js'],afterconcat:['dist/main.js']}");
      this.gruntfile.insertConfig("csslint", "{}");
      this.gruntfile.insertConfig("cssmin", "{}");
      this.gruntfile.insertConfig("imagemin", "{}");
      this.gruntfile.insertConfig("connect", "{}");
      this.gruntfile.insertConfig("uglify", "{}");

      switch(this.PreprocessorCssOption){
        case "less":
          this.gruntfile.insertConfig("less", "");
          _tasks.push("less");
        break;
        case "sass":
          this.gruntfile.insertConfig("compass", "{ watch: { watch: true } }");
          _tasks.push("compass");
        break;
        case "stylus": 
          this.gruntfile.insertConfig("stylus", "");
          _tasks.push("stylus");
        break;
      }
      
      if(this.PreprocessorJavascriptOption){
          this.gruntfile.insertConfig("coffee", "");
          _tasks.push("coffee");
      }*/
      
      //Registro de tareas
      this.gruntfile.registerTask('build', _tasks);
    }

  },

  end: function () {
    this.installDependencies();
  }
  
});

module.exports = SuperfrontendGenerator;

