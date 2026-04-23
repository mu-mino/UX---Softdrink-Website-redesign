window.addEventListener("DOMContentLoaded", () => {

  // ── Cartoon image fade-in ──
  for (let i = 1; i <= 4; i++) {
    const pic = document.getElementById("pic" + i);
    if (!pic) continue;
    pic.style.opacity = "0";
    pic.style.transition = "opacity 0.3s ease";
    pic.style.willChange = "opacity";
    setTimeout(() => { pic.style.opacity = "1"; }, 300);
  }

  // ── Cartoon scroll observer ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = "opacity 0.6s ease";
        entry.target.style.opacity = "1";
        observer.unobserve(entry.target);
      } else {
        entry.target.style.opacity = "0";
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".cartoonBilder").forEach(box => observer.observe(box));

  // ── Cartoon text word-by-word animation ──
  document.querySelectorAll(".cartoonText").forEach(e => {
    const text = e.innerHTML;
    e.textContent = "";
    text.split(/(<br\s*\/?>|\s)/).forEach(t => {
      const span = document.createElement("span");
      if (t === "\n" || t === "\r" || t === "\r\n" || t === "<br>") {
        span.innerHTML = "<br>";
      } else if (t === " ") {
        span.innerHTML = "&nbsp;";
      } else {
        span.textContent = t;
      }
      span.style.opacity = "0";
      span.style.transition = "opacity 0.3s ease";
      e.appendChild(span);
    });
    observer.observe(e);
  });

  const textObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll("span").forEach((span, i) => {
          setTimeout(() => {
            span.style.opacity = "1";
            span.classList.add("animation");
          }, i * 10);
        });
        textObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".cartoonText").forEach(e => textObserver.observe(e));

  // ── Empathy card slider ──
  const maps = document.querySelectorAll('.empathy-map');
  if (maps.length) {
    let current = 0;
    let clickLocked = false;

    function switchMap(next) {
      if (clickLocked) return;
      clickLocked = true;
      const currentMap = maps[current];
      const nextMap = maps[next];
      currentMap.classList.remove('active');
      currentMap.classList.add('exit-left');
      nextMap.style.display = 'block';
      nextMap.classList.remove('active', 'exit-left', 'enter-right');
      nextMap.classList.add('enter-right');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        nextMap.classList.remove('enter-right');
        nextMap.classList.add('active');
        current = next;
      }));
      setTimeout(() => {
        currentMap.style.display = 'none';
        currentMap.classList.remove('exit-left');
        clickLocked = false;
      }, 1000);
    }

    const empathyCard = document.querySelector('.empathy-card');
    if (empathyCard) empathyCard.addEventListener('click', () => switchMap((current + 1) % maps.length));

    const prevE = document.getElementById('prevEmpathy');
    const nextE = document.getElementById('nextEmpathy');
    if (prevE) prevE.addEventListener('click', e => { e.stopPropagation(); switchMap((current - 1 + maps.length) % maps.length); });
    if (nextE) nextE.addEventListener('click', e => { e.stopPropagation(); switchMap((current + 1) % maps.length); });
  }

  // ── Vision card slider ──
  const visionMaps = document.querySelectorAll('.vision-map');
  if (visionMaps.length) {
    let currentVision = 0;
    let visionClickLocked = false;

    function switchVisionMap(next) {
      if (visionClickLocked) return;
      visionClickLocked = true;
      const currentMap = visionMaps[currentVision];
      const nextMap = visionMaps[next];
      currentMap.classList.remove('active');
      currentMap.classList.add('exit-left');
      nextMap.style.display = 'block';
      nextMap.classList.remove('active', 'exit-left', 'enter-right');
      nextMap.classList.add('enter-right');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        nextMap.classList.remove('enter-right');
        nextMap.classList.add('active');
        currentVision = next;
      }));
      setTimeout(() => {
        currentMap.style.display = 'none';
        currentMap.classList.remove('exit-left');
        visionClickLocked = false;
      }, 1000);
    }

    const visionCard = document.querySelector('.vision-card');
    if (visionCard) visionCard.addEventListener('click', () => switchVisionMap((currentVision + 1) % visionMaps.length));

    const prevV = document.getElementById('prevVision');
    const nextV = document.getElementById('nextVision');
    if (prevV) prevV.addEventListener('click', e => { e.stopPropagation(); switchVisionMap((currentVision - 1 + visionMaps.length) % visionMaps.length); });
    if (nextV) nextV.addEventListener('click', e => { e.stopPropagation(); switchVisionMap((currentVision + 1) % visionMaps.length); });
  }

  // ── TwentyTwenty before/after ──
  const initSlider = () => {
    const container = document.querySelector('.twentytwenty-container');
    if (!container || typeof $ === 'undefined') return;
    const afterImg = document.getElementById('afterImg');
    if (!afterImg) return;
    const run = () => $(".twentytwenty-container").twentytwenty({ default_offset_pct: 0.5 });
    if (afterImg.complete && afterImg.naturalHeight > 0) {
      run();
    } else {
      afterImg.addEventListener('load', run, { once: true });
    }
  };
  if (document.readyState === 'complete') {
    initSlider();
  } else {
    window.addEventListener('load', initSlider, { once: true });
  }

  // ── Scroll-driven handle position ──
  const scrollWrapper = document.querySelector('.scroll-wrapper');
  if (scrollWrapper) {
    const root = document.documentElement;
    const updatePositions = () => {
      const scrollY = scrollWrapper.scrollTop;
      const scrollH = scrollWrapper.scrollHeight - scrollWrapper.clientHeight;
      const progress = scrollH > 0 ? scrollY / scrollH : 0;
      const pct = 3 + progress * 1.1 * 87;
      root.style.setProperty('--handle-top', pct + '%');
      root.style.setProperty('--label-top', pct + '%');
    };
    updatePositions();
    scrollWrapper.addEventListener('scroll', updatePositions);
  }

});
