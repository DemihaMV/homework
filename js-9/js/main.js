"use strict";

const todoKeys = {
  id: "id",
  text: "text",
  is_completed: "is_completed",
};

const todos = [];

const errTodoNotFound = todoId => `Todo with id ${todoId} not found`;

const getNewTodoId = todos =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1;

const createTodo = (todos, text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(todos),
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  todos.push(newTodo);
  return newTodo;
};

const completeTodoById = (todos, todoId) => {
  const todo = todos.find(todo => todo[todoKeys.id] === todoId);

  if (!todo) {
    console.error(errTodoNotFound(todoId));
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
};

const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex(todo => todo[todoKeys.id] === todoId);
  if (todoIndex === -1) {
    console.error(errTodoNotFound(todoId));
    return todos;
  }
  todos.splice(todoIndex, 1);
  return todos;
};


const formElement = document.querySelector('.form');
const inputElement = document.querySelector('.input');
const todosElement = document.querySelector('.todos');


const createTodoElement = (text) => {
  const todoElement = document.createElement('li');
  todoElement.classList.add('todo');

  const todoTextElement = document.createElement('div');
  todoTextElement.classList.add('todo-text');
  todoTextElement.textContent = text;

  const todoActionsElement = document.createElement('div');
  todoActionsElement.classList.add('todo-actions');

  const completeButton = document.createElement('button');
  completeButton.classList.add('button-complete', 'button');
  completeButton.innerHTML = '&#10004;';

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('button-delete', 'button');
  deleteButton.innerHTML = '&#10006;';

  todoActionsElement.append(completeButton, deleteButton);
  todoElement.append(todoTextElement, todoActionsElement);

  return todoElement;
};


const handleCreateTodo = (todos, text) => {
  const todo = createTodo(todos, text);
  const todoElement = createTodoElement(todo[todoKeys.text]);
  todosElement.append(todoElement);
};


formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = inputElement.value.trim();
  if (!text) return;

  handleCreateTodo(todos, text);
  inputElement.value = '';
  inputElement.focus();
});

todosElement.addEventListener('click', (event) => {
  const completeButton = event.target.closest('.button-complete');
  const deleteButton = event.target.closest('.button-delete');

  // Находим <li>, к которому относится кнопка
  const todoElement = event.target.closest('.todo');
  if (!todoElement) return;

  // Определяем id по индексу элемента в списке (упрощённо)
  const index = [...todosElement.children].indexOf(todoElement);
  const todoId = todos[index]?.[todoKeys.id];

  if (completeButton) {
    const todo = completeTodoById(todos, todoId);
    if (todo) {
      todoElement.classList.toggle('completed', todo[todoKeys.is_completed]);
    }
  }

  if (deleteButton) {
    deleteTodoById(todos, todoId);
    todoElement.remove();
  }
});