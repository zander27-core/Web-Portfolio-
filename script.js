const siteNav = document.getElementById('siteNav');
const navLinks = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');

window.addEventListener('scroll', () => {
  siteNav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

const revealEls = document.querySelectorAll('.reveal:not(.in)');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), i * 60);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

const codeLines = [
  '<span class="cm">// student.js</span>',
  '<span class="kw">const</span> <span class="prop">student</span> = {',
  '&nbsp;&nbsp;<span class="prop">name</span>: <span class="str">"Zander Estanislao"</span>,',
  '&nbsp;&nbsp;<span class="prop">course</span>: <span class="str">"BS Information Technology"</span>,',
  '&nbsp;&nbsp;<span class="prop">year</span>: <span class="str">"3rd Year"</span>,',
  '&nbsp;&nbsp;<span class="prop">stack</span>: [<span class="str">"HTML"</span>, <span class="str">"JS"</span>, <span class="str">"PHP"</span>, <span class="str">"Laravel"</span>],',
  '&nbsp;&nbsp;<span class="prop">status</span>: <span class="str">"building &amp; learning"</span>',
  '};',
  '',
  '<span class="kw">function</span> <span class="fn">buildSomethingUseful</span>() {',
  '&nbsp;&nbsp;<span class="kw">return</span> <span class="str">"lets talk"</span>;',
  '}'
];

const termTarget = document.getElementById('typeTarget');
let lineIdx = 0, charIdx = 0;

function typeTerminal() {
  if (lineIdx >= codeLines.length) {
    const caret = document.createElement('span');
    caret.className = 'caret';
    termTarget.appendChild(caret);
    return;
  }
  const full = codeLines[lineIdx];
  const plain = full.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
  if (charIdx === 0) {
    const p = document.createElement('p');
    p.innerHTML = '<span class="ln">' + String(lineIdx + 1).padStart(2, '0') + '</span><span class="content"></span>';
    termTarget.appendChild(p);
  }
  const rows = termTarget.querySelectorAll('.content');
  const currentRow = rows[rows.length - 1];

  if (charIdx <= plain.length) {
    const ratio = plain.length === 0 ? 1 : charIdx / plain.length;
    const targetLen = Math.round(full.length * ratio);
    currentRow.innerHTML = full.slice(0, targetLen);
    charIdx++;
    setTimeout(typeTerminal, plain.length === 0 ? 80 : 14 + Math.random() * 18);
  } else {
    currentRow.innerHTML = full;
    lineIdx++;
    charIdx = 0;
    setTimeout(typeTerminal, 120);
  }
}
typeTerminal();

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Ready';
  btn.style.background = 'linear-gradient(135deg, #1f9e73, #167a58)';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    contactForm.reset();
  }, 2200);
});

document.getElementById('year').textContent = new Date().getFullYear();