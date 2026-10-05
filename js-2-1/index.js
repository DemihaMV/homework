// Задание 1
const number = prompt ('Введите число', 0);

if (number % 2 === 0) {
  console.log(`${number} — чётное число`);
} else {
  console.log(`${number} — нечётное число`);
}

// Задание 2
const age = 30;
let discount;

switch (true) {
  case age < 18:
    discount = 10;
    break;
  case age <= 65:
    discount = 20;
    break;
  default:
    discount = 30;
}

console.log(discount);

// Задание 3
const username = prompt('Введите имя пользователя:');
const password = prompt('Введите пароль:');

if ((username === 'admin' || username === 'user') && password === '123456') {
  console.log('Доступ разрешен');
} else {
  console.log('Доступ запрещен');
}

// Задание 4
const weight = Number(prompt('Введите вес посылки (в кг):'));
const deliveryType = prompt('Введите тип доставки: Стандарт / Экспресс / Премиум');

if (weight <= 0 || isNaN(weight)) {
  alert('Некорректный вес посылки');
} else if (deliveryType !== 'Стандарт' && deliveryType !== 'Экспресс' && deliveryType !== 'Премиум') {
  alert('Неверный тип доставки');
} else {
  let baseCost;
  if (weight < 1) {
    baseCost = 5;
  } else if (weight <= 5) {
    baseCost = 10;
  } else {
    baseCost = 15;
  }

  let coefficient;
  switch (deliveryType) {
    case 'Стандарт':
      coefficient = 1;
      break;
    case 'Экспресс':
      coefficient = 1.5;
      break;
    case 'Премиум':
      coefficient = 2;
      break;
  }

  const totalCost = baseCost * coefficient;

  alert(`Итоговая стоимость доставки: ${totalCost}$.`);
}