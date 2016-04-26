'use strict';
var _ = require('lodash');
var nconf = require('nconf');
var swapi = require('swapi-node');

function StarWarsDataHelper() {
    nconf.file({file: 'config.json'});
}

StarWarsDataHelper.prototype.requestCharacterInformation = function (name) {
    var personId = nconf.get(name.toLowerCase());
    return swapi.getPerson(personId).then(function (result) {
        console.log(result);
        return response.body;
    });
};

StarWarsDataHelper.prototype.formatCharacterInformation = function (character) {
    return _.template('name ${name}, height ${height}, mass ${mass}, hair color ${hairColor}, skin color ${skinColor}, eye color ${eyeColor}, birthYear ${birthYear}, gender ${gender}.')({
        name: character.name,
        height: character.height,
        mass: character.mass,
        hairColor: character.hair_color,
        skinColor: character.skin_color,
        eyeColor: character.eye_color,
        birthYear: character.birth_year,
        gender: character.gender
    });
};

module.exports = StarWarsDataHelper;
