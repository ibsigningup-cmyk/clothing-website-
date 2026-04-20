(() => {
  const nav = document.getElementById('nav');
  const toggle = nav.querySelector('.nav__toggle');
  const links = nav.querySelectorAll('.nav__links a, .nav__cta');

  // Scroll state
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  // Reveal on scroll
  const revealable = document.querySelectorAll(
    '.hero__inner, .about__copy, .about__card, .sounds__head, .record, .menu__head, .menu__col, .visit__copy, .reserve'
  );
  revealable.forEach(el => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealable.forEach(el => io.observe(el));
  } else {
    revealable.forEach(el => el.classList.add('is-in'));
  }

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Reserve form (client-side stub)
  const form = document.getElementById('reserve');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.name || !data.email || !data.date) {
        flash(form, 'Please complete the required fields.');
        return;
      }
      form.innerHTML = `
        <h3>Request received.</h3>
        <p class="reserve__lede">Thank you, ${escape(data.name)}. We'll write back to ${escape(data.email)} within 24 hours — Wed through Sun. Until then, a low-volume playlist awaits.</p>
        <p class="reserve__fine">喫茶店 · 乾杯</p>
      `;
    });
  }

  function flash(el, msg) {
    let n = el.querySelector('.flash');
    if (!n) {
      n = document.createElement('p');
      n.className = 'flash reserve__fine';
      n.style.color = 'var(--red)';
      el.appendChild(n);
    }
    n.textContent = msg;
  }
  function escape(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
})();
