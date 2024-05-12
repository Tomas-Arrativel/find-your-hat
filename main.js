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

  static generateField(height, width, percentage) {
    const totalCells = height * width;
    const hatCell = Math.floor(Math.random() * totalCells);
    let holeCells = Math.floor((percentage / 100) * totalCells);
    const field = [];

    //Start the field only with fieldCharacters
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(fieldCharacter);
      }
      field.push(row);
    }

    //Place the hat in the field
    const hatRow = Math.floor(hatCell / width);
    const hatCol = hatCell % width;
    field[hatRow][hatCol] = hat;

    //Placing the holes in the field
    while (holeCells > 0) {
      const holeCell = Math.floor(Math.random() * totalCells);
      const holeRow = Math.floor(holeCell / width);
      const holeCol = holeCell % width;
      if (field[holeRow][holeCol] === fieldCharacter) {
        field[holeRow][holeCol] = hole;
        holeCells--;
      }
    }
    return field;
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

  move(direction) {
    if (this.gameOver) {
      console.log('Game over!');
      process.exit(0);
    }

    let newRow = this.playerRow;
    let newCol = this.playerCol;

    switch (direction) {
      case 'u':
        newRow--;
        break;
      case 'd':
        newRow++;
        break;
      case 'l':
        newCol--;
        break;
      case 'r':
        newCol++;
        break;
      default:
        console.log('Invalid direction!');
        break;
    }

    if (
      newRow < 0 ||
      newRow >= this.rows ||
      newCol < 0 ||
      newCol >= this.cols
    ) {
      console.log('Out of bounds!');
      this.gameOver = true;
      process.exit(0);
    }

    const newPosition = this.field[newRow][newCol];
    if (newPosition == this.hole) {
      console.log('You fell into a hole! Game over.');
      this.gameOver = true;
      process.exit(0);
    } else if (newPosition == this.hat) {
      console.log('You found the hat! You won!');
      this.gameOver = true;
      process.exit(0);
    } else {
      this.playerCol = newCol;
      this.playerRow = newRow;
    }

    this.print();
  }
}

const generatedField = Field.generateField(5, 5, 40);
const myField = new Field(generatedField);

console.log(
  'Welcome to the Hat Game! Find the hat (^) without falling into a hole (O).\n',
);

myField.print();

process.stdin.on('data', (data) => {
  const direction = data.toString().trim().toLowerCase();
  myField.move(direction);
});
