// Задание 1
for (let i = 1; i <= 20; i++) {
  if (i % 4 === 0) {
    continue;
  }
  console.log(i);
}

// Задание 2
const n = Number(prompt('Введите число для вычисления факториала:'));

let factorial = 1;

for (let i = 1; i <= n; i++) {
  factorial *= i;
}

console.log(`Факториал числа ${n} равен ${factorial}`);

// Задание 3
let board = '';

for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    board += (row + col) % 2 === 0 ? '#' : ' ';
  }
  board += '\n';
}

console.log(board);
