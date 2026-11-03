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
nav.querySelectorAll('a:not(.shop)').forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) toggleMenu();
  });
});


// ===== Закрытие плашки .hzz по крестику =====
const promo = document.querySelector('.hzz');
const promoClose = document.querySelector('.hz__button');

if (promo && promoClose) {
  promoClose.setAttribute('aria-label', 'Закрыть');
  promoClose.addEventListener('click', () => {
    promo.classList.add('hzz--hidden');
  });
}

// ===== Поиск на мобильном: лупа открывает/закрывает поле =====
const searchForm = document.querySelector('.header form');
const searchLabel = document.querySelector('.search__label');
const searchInput = document.getElementById('site-search');
const mobileQuery = window.matchMedia('(width <= 576px)');

if (searchForm && searchLabel && searchInput) {
  searchLabel.addEventListener('click', (e) => {
    if (!mobileQuery.matches) return; // на десктопе обычное поле
    if (e.target === searchInput) return; // клик по самому полю
    e.preventDefault();
    const isOpen = searchForm.classList.toggle('search--open');
    if (isOpen) searchInput.focus();
  });

  // закрыть при клике вне поиска
  document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target)) searchForm.classList.remove('search--open');
  });

  // при переходе на большой экран — сбросить состояние
  mobileQuery.addEventListener('change', () => searchForm.classList.remove('search--open'));
}


// ===== Выпадающее меню «Магазин» =====
const dropdown = document.querySelector('.dropdown');
const shopLink = document.querySelector('.menu__link.shop');

if (dropdown && shopLink) {
  const setOpen = (open) => {
    dropdown.classList.toggle('is-open', open);
    shopLink.setAttribute('aria-expanded', open);
  };

  // клик по «Магазин» — открыть/закрыть (нужно для телефона и планшета)
  shopLink.addEventListener('click', (e) => {
    e.preventDefault();
    setOpen(!dropdown.classList.contains('is-open'));
  });

  // клик вне меню — закрыть
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) setOpen(false);
  });

  // Esc — закрыть
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}
