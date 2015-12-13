'use strict';

var generators = require('yeoman-generator');
var slugify = require('underscore.string/slugify');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        //Hacemos que la funcion slugify pueda ser usada en nuestros templates
        this.slugify = slugify;
    },
    prompting: {
        //Recogemos todas las opciones
        appName: function () {
            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'appName',
                message: 'What is your app name',
                default: 'My Express App'
            }, function (response) {
                this.options.appName = response.appName;
                done();
            }.bind(this));
        },
        type: function () {
            var done = this.async();
            this.prompt({
                type: 'list',
                name: 'type',
                message: 'What Express type do you want to create',
                choices: [
                    {
                        name: 'REST',
                        value: 'rest'
                    },
                    {
                        name: 'Web',
                        value: 'web'
                    }
                ],
                default: 'rest'
            }, function (response) {
                this.options.type = response.type;
                done();
            }.bind(this));
        },
        disableHeader: function () {
            var done = this.async();
            this.prompt({
                type: 'confirm',
                name: 'disableHeader',
                message: 'Disable X-Powered-by header',
                default: true
            }, function (response) {
                this.options.disableHeader = response.disableHeader;
                done();
            }.bind(this));
        },
        port: function () {
            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'port',
                message: 'What port do you want to listen',
                default: 3000,
                validate: function(input) {

                    var done = this.async();

                    setTimeout(function() {
                        if (isNaN(input) || input <= 1024 || input > 65535) {
                            done("You need to provide a number between 1024 and 65535");
                            return;
                        }

                        done(true);
                    }, 0);
                }
            }, function (response) {
                this.options.port = response.port;
                done();
            }.bind(this));
        }
    },
    writing: function () {
        var done = this.async();

        //De momento solo construimos si es de tipo REST
        if (this.options.type === 'web') {
            console.error('Not implemented yet');
            done();
        }

        //Generamos los archivos
        this.template('server.js');
        this.template('package.json');
        this.template('gulpfile.js');
        done();
    },
    install: function () {
        //Instalamos las dependencias
        this.installDependencies({bower: false});
    }
});