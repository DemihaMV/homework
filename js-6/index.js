// Задание 1
const users = [
  { name: 'Боб', age: 24, isAdmin: false },
  { name: 'Давид', age: 13, isAdmin: false },
  { name: 'Миша', age: 31, isAdmin: true },
  { name: 'Игорь', age: 20, isAdmin: false },
];

users.push(
  { name: 'Ростик', age: 19, isAdmin: false },
  { name: 'Тогрул', age: 43, isAdmin: true }
);

console.log(users);

// Задание 2
function getUserAverageAge(users) {
  if (users.length === 0) return 0;

  const totalAge = users.reduce((sum, user) => sum + user.age, 0);
  return totalAge / users.length;
}

console.log(getUserAverageAge(users));

// Задание 3
function getAllAdmins(users) {
  return users.filter(user => user.isAdmin);
}

console.log(getAllAdmins(users));

// Задание 4
function first(arr, n) {
  if (n === undefined) {
    return [arr[0]];
  }
  if (n === 0) {
    return []; 
  }
  return arr.slice(0, n);
}

console.log(first([1, 2, 3, 4, 5]));
console.log(first([1, 2, 3, 4, 5], 0));
console.log(first([1, 2, 3, 4, 5], 3)); 
console.log(first([1, 2, 3, 4, 5], 10)); 