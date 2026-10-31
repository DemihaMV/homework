const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const overlay = document.getElementById('overlay');

function toggleMenu() {
  const isActive = nav.classList.toggle('active');
  burger.classList.toggle('active');
  overlay.classList.toggle('active');

 
  burger.setAttribute('aria-expanded', isActive);
  burger.setAttribute('aria-label', isActive ? 'Закрыть меню' : 'Открыть меню');
}

burger.addEventListener('click', toggleMenu);

overlay.addEventListener('click', () => {
  if (nav.classList.contains('active')) toggleMenu();
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) toggleMenu();
  });
});
