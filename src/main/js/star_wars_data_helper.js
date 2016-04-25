'use strict';
var _ = require('lodash');
var swapi = require('swapi-node');

function StarWarsDataHelper() {
}

StarWarsDataHelper.prototype.requestCharacterInformation = function (name) {
    //TODO transform name into id
    return swapi.getPerson(1).then(function (result) {
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
