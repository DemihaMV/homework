// ===== Бесконечная лента товаров =====
// Работает для всех блоков .new-arrivals__container
// («Новые поступления» и «Лидеры продаж»).
// Лента сама медленно едет, останавливается при наведении/касании,
// её можно листать свайпом, колесом/тачпадом или перетаскивать мышью.
// Когда товары заканчиваются, они бесшовно начинаются сначала.

const SPEED = 0.4; // скорость автопрокрутки, px за кадр (0 — выключить)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.new-arrivals__container').forEach((track) => {
  const items = [...track.children];
  if (!items.length) return;

  // 1. Делаем 3 копии набора: [копия][оригинал][копия]
  const makeClone = (item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('a, button').forEach((el) => el.setAttribute('tabindex', '-1'));
    return clone;
  };
  items.forEach((item) => track.append(makeClone(item)));
  items.slice().reverse().forEach((item) => track.prepend(makeClone(item)));

  // ширина одного набора товаров (вместе с промежутками)
  let setWidth = 0;
  const measure = () => {
    setWidth = items[0].offsetLeft - track.children[0].offsetLeft;
  };

  let pos = 0; // текущая позиция с дробной частью
  const jumpToMiddle = () => {
    measure();
    pos = setWidth;
    track.scrollLeft = pos;
  };

  // 2. Если ушли слишком далеко — незаметно перескакиваем на такой же товар
  const loop = () => {
    if (!setWidth) return;
    if (track.scrollLeft < setWidth * 0.5) {
      track.scrollLeft += setWidth;
    } else if (track.scrollLeft > setWidth * 1.5) {
      track.scrollLeft -= setWidth;
    }
  };

  let paused = false;
  track.addEventListener('scroll', () => {
    loop();
    if (paused) pos = track.scrollLeft;
  });

  // 3. Автопрокрутка
  const tick = () => {
    if (!paused && SPEED > 0 && !reduceMotion) {
      pos += SPEED;
      track.scrollLeft = pos;
      if (Math.abs(track.scrollLeft - pos) > 2) pos = track.scrollLeft; // после перескока
    }
    requestAnimationFrame(tick);
  };

  const pause = () => { paused = true; };
  const resume = () => { paused = false; pos = track.scrollLeft; };

  track.addEventListener('mouseenter', pause);
  track.addEventListener('mouseleave', resume);
  track.addEventListener('touchstart', pause, { passive: true });
  track.addEventListener('touchend', () => setTimeout(resume, 1500));
  track.addEventListener('focusin', pause);
  track.addEventListener('focusout', resume);

  // 4. Перетаскивание мышью на компьютере
  let startX = 0;
  let startScroll = 0;
  let dragging = false;
  let moved = false;

  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    dragging = true;
    moved = false;
    startX = e.clientX;
    startScroll = track.scrollLeft;
  });

  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 5) {
      moved = true;
      track.classList.add('is-dragging');
    }
    track.scrollLeft = startScroll - dx;
    // если при перетаскивании сработал перескок — сдвигаем точку отсчёта
    if (Math.abs(track.scrollLeft - (startScroll - dx)) > 2) {
      startScroll = track.scrollLeft + dx;
    }
  });

  window.addEventListener('pointerup', () => {
    dragging = false;
    track.classList.remove('is-dragging');
  });

  // не открывать ссылку, если товар перетаскивали
  track.addEventListener('click', (e) => {
    if (moved) {
      e.preventDefault();
      moved = false;
    }
  }, true);

  // 5. Старт и пересчёт при изменении размера окна
  window.addEventListener('load', jumpToMiddle);
  window.addEventListener('resize', jumpToMiddle);
  jumpToMiddle();
  requestAnimationFrame(tick);
});
