// Получаем нужные элементы
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const overlay = document.getElementById('overlay');

// Функция открытия/закрытия меню
function toggleMenu() {
  const isActive = nav.classList.toggle('active');
  burger.classList.toggle('active');
  overlay.classList.toggle('active');

  // Обновляем атрибуты доступности
  burger.setAttribute('aria-expanded', isActive);
  burger.setAttribute('aria-label', isActive ? 'Закрыть меню' : 'Открыть меню');
}

// Клик по бургеру — открыть/закрыть меню
burger.addEventListener('click', toggleMenu);

// Клик по затемнению — закрыть меню
overlay.addEventListener('click', () => {
  if (nav.classList.contains('active')) toggleMenu();
});

// Клик по любому пункту меню — закрыть меню
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) toggleMenu();
  });
});
