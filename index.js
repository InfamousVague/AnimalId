const crypto = require('crypto');

const animals = require('./dict/animals');
const adjectives = require('./dict/adjectives');

const _ranimal = Symbol('randomAnimal');
const _radjective = Symbol('randomAdjective');
const _build = Symbol('build');

const toTitleCase = function(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

class AnimalID {
  /**
   * Generate random animal from dictionary
   */
  [_ranimal]() {
    return new Promise(resolve => {
      crypto.randomBytes(256, (err, bytes) => {
        resolve(toTitleCase(animals[bytes.readUInt16LE(0) % animals.length]))
      });
    });
  }

  /**
   * Generate random adjective from dictionary
   */
  [_radjective]() {
    return new Promise(resolve => {
      crypto.randomBytes(256, (err, bytes) => {
        resolve(toTitleCase(adjectives[bytes.readUInt16LE(0) % adjectives.length]))
      });
    });
  }

  make(len) {
    return new Promise(resolve => {
      let idCache = '';

      const builder = (iterations) => {
        this[_radjective]().then(part => {
          idCache += part;

          if (iterations + 1 < len) {
            builder(iterations + 1);
          } else {
            this[_ranimal]().then(animal => resolve(`${idCache}${animal}`));
          }
        });
      };

      builder(1);
    });    
  }
}

module.exports = AnimalID;

