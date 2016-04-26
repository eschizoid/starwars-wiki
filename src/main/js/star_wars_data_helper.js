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
    //TODO perhaps enrich this information using Wikipedia:
    //TODO https://en.wikipedia.org/w/api.php?action=opensearch&search=luke%20skywalker
    return _.template('name ${name}, height ${height}, weight ${mass}, hair color ${hairColor}, skin color ${skinColor}, eye color ${eyeColor}, year of birth ${birthYear}, gender ${gender}.')({
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
