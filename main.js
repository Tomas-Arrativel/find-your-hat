const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.hat = hat;
    this.hole = hole;
    this.fieldCharacter = fieldCharacter;
    this.pathCharacter = pathCharacter;
  }

  print() {
    const joinedField = this.field.forEach((row) => {
      console.log(row.join(''));
    });
    return joinedField;
  }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.print();
