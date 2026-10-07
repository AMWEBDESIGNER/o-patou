document.body.classList.add('lock');

const wrapWords = () => {
  document.querySelectorAll('.words').forEach((el) => {
    el.innerHTML = el.innerHTML.replace(/([^\s<>]+)(?![^<]*>)/g, '<span class="word"><i>$1</i></span> ');
    el.querySelectorAll('.word i').forEach((word, i) => word.style.transitionDelay = `${i * 55}ms`);
  });
};
wrapWords();

addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.intro').classList.add('done');
    document.body.classList.remove('lock');
    document.querySelector('.hero').classList.add('loaded');
  }, 650);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => isIntersecting && target.classList.add('on'));
}, { threshold: .12 });
document.querySelectorAll('.reveal,.image-wipe,.words').forEach((el) => observer.observe(el));

const pointer = document.querySelector('.pointer');
addEventListener('pointermove', (e) => {
  pointer.style.left = `${e.clientX}px`; pointer.style.top = `${e.clientY}px`;
});
document.querySelectorAll('a,button,.gallery-slider').forEach((el) => {
  el.addEventListener('pointerenter', () => pointer.classList.add('big'));
  el.addEventListener('pointerleave', () => pointer.classList.remove('big'));
});

const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
}));

const slider = document.querySelector('.gallery-slider');
let down = false, startX = 0, scrollLeft = 0;
slider.addEventListener('pointerdown', (e) => { down = true; startX = e.clientX; scrollLeft = slider.scrollLeft; slider.setPointerCapture(e.pointerId); });
slider.addEventListener('pointermove', (e) => { if (down) slider.scrollLeft = scrollLeft - (e.clientX - startX) * 1.3; });
slider.addEventListener('pointerup', () => down = false);

addEventListener('scroll', () => {
  const heroImage = document.querySelector('.hero-photo img');
  if (scrollY < innerHeight) heroImage.style.transform = `scale(1.04) translateY(${scrollY * .13}px)`;
  document.querySelectorAll('.scene img,.panorama-img img').forEach((img) => {
    const r = img.parentElement.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) img.style.transform = `scale(1.05) translateY(${r.top * -.025}px)`;
  });
}, { passive: true });
