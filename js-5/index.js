// Задание 1
const person = {
  firstName: 'Михаил',
  lastName: 'Исофий',
  age: 21,
  city: 'СПБ',
  isStudent: true
};

console.log(person.firstName);
console.log(person.lastName); 
console.log(person.age);
console.log(person.city);
console.log(person.isStudent);

// Задание 2
function isEmpty(object) {
  return Object.keys(object).length === 0;
}

console.log(isEmpty({}));
console.log(isEmpty({ a: 1 }));
console.log(isEmpty({ name: 'Михаил' }));

// Задание 3
const task = {
  title: 'Изучить JavaScript',
  description: 'Пройти урок по объектам',
  isCompleted: false
};

function cloneAndModify(object, modifications) {
  return { ...object, ...modifications };
}

const updatedTask = cloneAndModify(task, {
  isCompleted: true,
  priority: 'Высокий'
});

for (const key in updatedTask) {
  console.log(`${key}: ${updatedTask[key]}`);
}

// Задание 4
function callAllMethods(object) {
  for (const key in object) {
    if (typeof object[key] === 'function') {
      object[key]();
    }
  }
}

const myObject = {
  method1() {
    console.log('Метод 1 вызван');
  },
  method2() {
    console.log('Метод 2 вызван');
  },
  property: 'Это не метод'
};

callAllMethods(myObject);