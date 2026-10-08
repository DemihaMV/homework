// Задание 1
function calculateFinalPrice(basePrice, discountPercent, taxRate) {
  const discount = basePrice * (discountPercent / 100);
  const priceAfterDiscount = basePrice - discount;
  const tax = priceAfterDiscount * taxRate;
  return priceAfterDiscount + tax;
}

console.log(calculateFinalPrice(100, 10, 0.2)); // 108
console.log(calculateFinalPrice(100, 10, 0));   // 90

// Задание 2
function checkAccess(username, password) {
  if (username === 'admin' && password === '123456') {
    return 'Доступ разрешен';
  } else {
    return 'Доступ запрещен';
  }
}

console.log(checkAccess('admin', '123456'));
console.log(checkAccess('user', '123456'));
console.log(checkAccess('admin', 'qwerty'));

// Задание 3
function getTimeOfDay(hour) {
  if (hour < 0 || hour > 23) {
    return 'Некорректное время';
  } else if (hour >= 0 && hour <= 5) {
    return 'Ночь';
  } else if (hour >= 6 && hour <= 11) {
    return 'Утро';
  } else if (hour >= 12 && hour <= 17) {
    return 'День';
  } else {
    return 'Вечер';
  }
}

console.log(getTimeOfDay(3));
console.log(getTimeOfDay(8));
console.log(getTimeOfDay(14));
console.log(getTimeOfDay(20));
console.log(getTimeOfDay(25));

// Задание 4
function findFirstEven(start, end) {
  for (let i = start; i <= end; i++) {
    if (i % 2 === 0) {
      return i;
    }
  }
  return 'Чётных чисел нет';
}
 
console.log(findFirstEven(1, 10));
console.log(findFirstEven(9, 9));
console.log(findFirstEven(7, 13));