'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var StarWarsDataHelper = require('./../../../star_wars_data_helper');
var app = new Alexa.app('starwars-wiki');

app.launch(function (req, res) {
    var prompt = 'For Star Wars Character information, tell me name.';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('characterinfo', {
        'slots': {
            'NAME': 'CHARACTER'
        },
        'utterances': ['{|to define|define} {-|CHARACTER}']
    },
    function (req, res) {
        //get the slot
        var name = req.slot('NAME');
        var reprompt = 'Tell me a star wars character name to get their information.';
        if (_.isEmpty(name)) {
            var prompt = 'I didn\'t hear a star wars character name. Tell me a star wars character name.';
            res.say(prompt).reprompt(reprompt).shouldEndSession(false);
            return true;
        } else {
            var starWarsHelper = new StarWarsDataHelper();
            starWarsHelper.requestCharacterInformation(name).then(function (character) {
                console.log(name);
                res.say(starWarsHelper.formatCharacterInformation(character)).send();
            }).catch(function (err) {
                console.log(err.statusCode);
                var prompt = 'I didn\'t have data for character name ' + name;
                //https://github.com/matt-kruse/alexa-app/blob/master/index.js#L171
                res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
            });
            return false;
        }
    }
);
//hack to support custom utterances in utterance expansion string
console.log(app.utterances().replace(/\{\-\|/g, '{'));
module.exports = app;
