(function () {
  function getIconPath() {
    return window.TRANSITION_ICON || 'media/yasarsDoseIcon.png';
  }

  function addTransitionMarkup() {
    if (document.querySelector('.layers')) return;
    const section = document.createElement('section');
    section.className = 'layers';
    section.style.display = 'none';
    section.innerHTML = `
      <div class="layer"></div>
      <div class="layer layer2"></div>
      <div class="layer layer3"></div>
      <div class="transition-content">
        <img src="${getIconPath()}" class="transition-image" alt="" />
        <span class="image-credit">FuseTea – UX Case Study</span>
      </div>
    `;
    document.body.prepend(section);
  }

  function playTransition() {
    const overlay = document.querySelector('.layers');
    if (!overlay || typeof anime === 'undefined') return;
    overlay.style.display = 'block';

    anime.timeline()
      .add({ targets: '.layer', rotateY: 180, duration: 800, easing: 'easeInOutQuad' })
      .add({
        targets: '.layer',
        boxShadow: '0 0 90px 18px rgba(0,255,255,0.8)',
        duration: 600,
        easing: 'easeInOutQuad',
        begin: () => {
          anime({ targets: '.transition-image', opacity: [0, 1], scale: [0.95, 1], duration: 400, easing: 'easeOutQuad' });
          anime({ targets: '.image-credit', opacity: [0, 1], scale: [0.95, 1], duration: 400, delay: 100, easing: 'easeOutQuad' });
        }
      })
      .add({
        targets: '.layer',
        opacity: 0,
        duration: 800,
        easing: 'easeInOutQuad',
        complete: () => {
          anime({ targets: ['.transition-image', '.image-credit'], opacity: [1, 0], scale: [1, 0.9], duration: 500, easing: 'easeInOutQuad' });
        }
      });

    setTimeout(() => { overlay.style.display = 'none'; }, 2300);
  }

  function prepareAnchors() {
    document.querySelectorAll('a[href$=".html"]').forEach(a => {
      a.addEventListener('click', () => {
        sessionStorage.setItem('showTransition', 'true');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.style.display = 'block';
    document.body.style.opacity = '0';

    addTransitionMarkup();
    prepareAnchors();

    if (sessionStorage.getItem('showTransition') === 'true') {
      sessionStorage.removeItem('showTransition');
      document.body.style.transition = 'opacity 0.4s ease';
      setTimeout(() => { document.body.style.opacity = '1'; }, 300);
      playTransition();
    } else {
      document.body.style.transition = 'opacity 0.5s ease';
      setTimeout(() => { document.body.style.opacity = '1'; }, 50);
    }
  });
})();
