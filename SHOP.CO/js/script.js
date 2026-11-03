document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('reviewsGrid');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!grid || !prevBtn || !nextBtn) return;

  const getScrollStep = () => {
    const card = grid.querySelector('.review-card');
    if (!card) return grid.clientWidth;
    const gap = parseInt(getComputedStyle(grid).columnGap) || 20;
    return card.offsetWidth + gap;
  };

  prevBtn.addEventListener('click', () => {
    grid.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    grid.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
  });

  // отключаем кнопки на краях списка
  const updateButtons = () => {
    const maxScroll = grid.scrollWidth - grid.clientWidth - 1;
    prevBtn.disabled = grid.scrollLeft <= 0;
    nextBtn.disabled = grid.scrollLeft >= maxScroll;
    prevBtn.style.opacity = prevBtn.disabled ? .4 : 1;
    nextBtn.style.opacity = nextBtn.disabled ? .4 : 1;
  };

  grid.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  updateButtons();
});