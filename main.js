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
    this.playerRow = 0;
    this.playerCol = 0;
    this.rows = field.length;
    this.cols = field[0].length;
    this.gameOver = false;
  }

  print() {
    for (let i = 0; i < this.rows; i++) {
      let row = '';
      for (let j = 0; j < this.cols; j++) {
        if (i === this.playerRow && j === this.playerCol) {
          row += this.pathCharacter;
        } else {
          row += this.field[i][j];
        }
      }
      console.log(row);
    }
  }

  move(usersMove) {
    switch (usersMove) {
      case 'u':
    }
  }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.print();
