'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var BourbonNeatGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
        this.installDependencies();
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(yosay('koolth is proud to give you the marvellous Bourbon-Neat web app generator!'));
      this.log(chalk.red(
        '\nOut of the box I include HTML5 Boilerplate, Bourbon, Neat, Sass, jQuery, and a ' +
        'Gruntfile.js to build your app.'
      ));
      this.log(chalk.green(
        'I\'ll also give you the option of Normalise-css and Modernizr.js!!\n'
      ));
    }

    var prompts = [{
      name: 'appName',
      message: 'What\'s the name of your website?',
      default: 'Neat Website'
    },{
      name: 'appDescription',
      message: 'Short description of the project...',
      default: 'A new Neat Website'
    },{
      name: 'authorName',
      message: 'What\'s your name (the author)?',
      default: ''
    },{
      type: 'confirm',
      name: 'includeNormalize',
      message: 'Would you like to include Normalize.css?',
      default: true
    },{
      type: 'confirm',
      name: 'includeModernizr',
      message: 'Would you like to include Modernizr.js?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appDescription = props.appDescription;
      this.authorName = props.authorName;
      this.includeNormalize = props.includeNormalize;
      this.includeModernizr = props.includeModernizr;

      done();
    }.bind(this));
  },

  scaffoldDirectories: function(){
    this.mkdir('app');
    this.mkdir('app/sass');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('app/styles/fonts');
    this.mkdir('app/images');
  },

  app: function () {
    this.template('index.html', 'app/index.html');
    this.template('404.html', 'app/404.html');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('Gruntfile.js', 'Gruntfile.js');

    this.copy('main.scss', 'app/sass/main.scss');
    this.copy('favicon.ico', 'app/favicon.ico');
    this.copy('htaccess', 'app/.htaccess');
    this.copy('robots.txt', 'app/robots.txt');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  }


});

module.exports = BourbonNeatGenerator;
