/* Oraciones V3 LAB - Paso 16: parches visuales finales separados. */
/* ===== v90-20-7-fin-lectura-redisenyo-js ===== */

/* v90.20.7 - Pulido del texto de fin de lectura, sin tocar navegación */
(function () {
  if (window.__v90207EndCardPolish) return;
  window.__v90207EndCardPolish = true;
  function polishEndCard() {
    try {
      var end=document.querySelector('.reader-end-card');
      if(!end) return;
      end.setAttribute('aria-label','Fin de la lectura');
      var title=end.querySelector('.title');
      if (title && !title.dataset.v90207) {
        title.dataset.v90207='1';
        title.textContent='Fin de la lectura';
      }
      var msg=end.querySelector('.msg');
      if (msg && !msg.dataset.v90207) {
        msg.dataset.v90207='1';
        msg.textContent='Que la paz de Cristo permanezca en su corazón.';
      }
    } catch (e) {}
  }
  var old = window.renderReader || (typeof renderReader !== 'undefined' ? renderReader : null);
  if (old && !window.__v90207EndCardRenderWrapped){
    window.__v90207EndCardRenderWrapped = true;
    window.renderReader = function () {
      old.apply(this, arguments);
      setTimeout(polishEndCard,420);
    };
    try {renderReader=window.renderReader} catch (e) {}
  }
  document.addEventListener('DOMContentLoaded', function () {setTimeout(polishEndCard,900)});
})();

/* ===== v90-20-8-fin-lectura-integrada-js ===== */

/* v90.20.8 - Limpia flechas internas del enlace Volver, sin cambiar navegación */
(function () {
  if (window.__v90208EndLinksPolish) return;
  window.__v90208EndLinksPolish = true;
  function polishEndLinks() {
    try {
      document.querySelectorAll('.reader-top-link').forEach(function (el) {
        el.textContent = (el.textContent || '').replace(/^[\s↑⬆️🏠]+/u,'').trim()||'Volver al inicio';
      });
    } catch (e) {}
  }
  var old = window.renderReader || (typeof renderReader !== 'undefined' ? renderReader : null);
  if (old && !window.__v90208EndLinksRenderWrapped){
    window.__v90208EndLinksRenderWrapped = true;
    window.renderReader = function () {
      old.apply(this, arguments);
      setTimeout(polishEndLinks,450);
    };
    try {renderReader=window.renderReader} catch (e) {}
  }
  document.addEventListener('DOMContentLoaded', function () {setTimeout(polishEndLinks,900)});
  document.addEventListener('click', function () {setTimeout(polishEndLinks,120)},true);
})();

/* ===== v90-20-11-fin-lectura-ajuste-real-js ===== */

/* v90.20.11 - Marca la primera línea para asegurar que no muestre cruz */
(function () {
  if (window.__v902011EndCardLineFix) return;
  window.__v902011EndCardLineFix = true;
  function fixEndCardLine() {
    try {
      var end=document.querySelector('.reader-end-card');
      if(!end) return;
      var lines=end.querySelectorAll('.line');
      if (lines && lines[0]) lines[0].classList.add('reader-line-top-v902011');
    } catch (e) {}
  }
  var old = window.renderReader || (typeof renderReader !== 'undefined' ? renderReader : null);
  if (old && !window.__v902011EndCardRenderWrapped){
    window.__v902011EndCardRenderWrapped = true;
    window.renderReader = function () {
      old.apply(this, arguments);
      setTimeout(fixEndCardLine,460);
    };
    try {renderReader=window.renderReader} catch (e) {}
  }
  document.addEventListener('DOMContentLoaded', function () {setTimeout(fixEndCardLine,900)});
  document.addEventListener('click', function () {setTimeout(fixEndCardLine,140)},true);
})();

/* ===== v90-20-35-atardecer-final-js ===== */

/* v90.20.35 - fuerza el ciclo horario real: mañana/tarde/atardecer/noche. */
(function () {
  if (window.__v902035SunsetCycle) return;
  window.__v902035SunsetCycle = true;

  function skyClassForHourV902035(h) {
    if (h >= 6 && h < 12) return "home-sky-morning";
    if (h >= 12 && h < 17) return "home-sky-day";
    if (h >= 17 && h < 20) return "home-sky-sunset";
    return "home-sky-night";
  }

  function applyHomeSkyV902035() {
    try {
      var card = document.getElementById("homeCardV9019");
      if (!card) return;
      var cls = skyClassForHourV902035((new Date()).getHours());
      card.classList.remove("home-sky-morning","home-sky-day","home-sky-sunset","home-sky-night");
      card.classList.add(cls);
    } catch (e) {}
  }

  var oldRender = window.renderHomeV9019;
  if(typeof oldRender === "function" && !oldRender.__v902035Wrapped){
    var wrapped = function () {
      var result = oldRender.apply(this, arguments);
      applyHomeSkyV902035();
      setTimeout(applyHomeSkyV902035, 0);
      return result;
    };
    wrapped.__v902035Wrapped = true;
    window.renderHomeV9019 = wrapped;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", applyHomeSkyV902035);
  else applyHomeSkyV902035();
  setTimeout(applyHomeSkyV902035, 120);
})();

/* ===== v3.1.13 - Arco iris suave visible desde patches.js =====
   Ajuste real sobre el origen que inyecta el fondo: más altura y presencia
   que la v3.1.12, manteniendo el arco bajo y sin volver al anillo central. */
(function(){
  const css = `
.home-card-v9019.home-sky-morning,
.home-card-v9019.home-sky-day,
body.dark .home-card-v9019.home-sky-morning,
body.dark .home-card-v9019.home-sky-day{
  background:
    radial-gradient(ellipse 200% 55% at 50% 116%,
      transparent 0%,
      transparent 47.4%,
      rgba(255, 112, 112, .118) 48.6%,
      rgba(255, 176,  92, .108) 50.1%,
      rgba(255, 235, 130, .098) 51.6%,
      rgba(132, 218, 146, .090) 53.1%,
      rgba(103, 195, 236, .098) 54.6%,
      rgba(128, 151, 236, .084) 56.1%,
      rgba(181, 133, 224, .074) 57.6%,
      transparent 61.8%),
    radial-gradient(circle at 7% 13%, rgba(255,255,255,.86) 0%, rgba(255,255,255,.58) 5%, rgba(255,246,198,.34) 14%, rgba(255,232,138,.18) 27%, rgba(255,232,138,0) 49%),
    radial-gradient(ellipse at 35% 16%, rgba(255,255,255,.42) 0%, rgba(255,255,255,.16) 21%, rgba(255,255,255,0) 49%),
    radial-gradient(ellipse at 78% 25%, rgba(255,255,255,.34) 0%, rgba(255,255,255,.13) 22%, rgba(255,255,255,0) 48%),
    linear-gradient(125deg,#fff2c8 0%,#f8f6e4 25%,#d9f2ff 55%,#eafbff 100%)!important;
}
.home-card-v9019.home-sky-morning::before,
.home-card-v9019.home-sky-day::before,
body.dark .home-card-v9019.home-sky-morning::before,
body.dark .home-card-v9019.home-sky-day::before{
  background:
    radial-gradient(ellipse at 28% 18%, rgba(255,255,255,.36) 0%, rgba(255,255,255,.14) 16%, rgba(255,255,255,0) 38%),
    radial-gradient(ellipse at 70% 22%, rgba(255,255,255,.28) 0%, rgba(255,255,255,.11) 18%, rgba(255,255,255,0) 42%),
    linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,0) 66%)!important;
}
.home-card-v9019.home-sky-sunset,
body.dark .home-card-v9019.home-sky-sunset{
  border-color:rgba(246,184,126,.32)!important;
  background:
    radial-gradient(ellipse 200% 55% at 50% 116%,
      transparent 0%,
      transparent 47.4%,
      rgba(255, 112, 112, .090) 48.6%,
      rgba(255, 176,  92, .080) 50.1%,
      rgba(255, 235, 130, .072) 51.6%,
      rgba(132, 218, 146, .067) 53.1%,
      rgba(103, 195, 236, .074) 54.6%,
      rgba(128, 151, 236, .065) 56.1%,
      rgba(181, 133, 224, .057) 57.6%,
      transparent 61.8%),
    radial-gradient(circle at 7% 14%, rgba(255,255,255,.86) 0%, rgba(255,240,204,.50) 8%, rgba(255,205,150,.22) 21%, rgba(239,148,92,.075) 36%, rgba(239,148,92,0) 60%),
    radial-gradient(ellipse at 0% 48%, rgba(255,184,120,.18) 0%, rgba(255,214,168,.09) 36%, rgba(255,214,168,0) 72%),
    radial-gradient(ellipse at 46% 24%, rgba(255,238,210,.22) 0%, rgba(255,238,210,.08) 30%, rgba(255,238,210,0) 64%),
    radial-gradient(ellipse at 96% 38%, rgba(190,229,255,.48) 0%, rgba(190,229,255,.23) 36%, rgba(190,229,255,0) 73%),
    linear-gradient(135deg,#fff0df 0%,#fff6ea 24%,#f3fbff 59%,#e4f7ff 100%)!important;
  box-shadow:0 24px 58px rgba(72,153,214,.14),0 10px 26px rgba(226,124,76,.045),inset 0 1px 0 rgba(255,255,255,.96)!important;
}
.home-card-v9019.home-sky-sunset::before,
body.dark .home-card-v9019.home-sky-sunset::before{
  background:
    radial-gradient(ellipse at 18% 18%, rgba(255,255,255,.34) 0%, rgba(255,255,255,.13) 19%, rgba(255,255,255,0) 43%),
    radial-gradient(ellipse at 80% 28%, rgba(255,255,255,.23) 0%, rgba(255,255,255,.085) 20%, rgba(255,255,255,0) 45%),
    linear-gradient(180deg, rgba(255,255,255,.11), rgba(255,255,255,0) 68%)!important;
}
.home-card-v9019.home-sky-sunset::after,
body.dark .home-card-v9019.home-sky-sunset::after{
  opacity:.24!important;
  color:rgba(224,126,68,.30)!important;
  filter:saturate(.82) brightness(1.08) blur(.08px)!important;
  text-shadow:0 0 18px rgba(255,226,178,.42),0 0 42px rgba(236,142,78,.13)!important;
}`;
  [
    'v3-1-4-rainbow-covenant-css',
    'v3-1-10-rainbow-bottom-real-css',
    'v3-1-11-rainbow-horizon-real-css',
    'v3-1-12-rainbow-visible-open-css'
  ].forEach(oldId => {
    const old = document.getElementById(oldId);
    if (old) old.remove();
  });
  const id = 'v3-1-13-rainbow-soft-visible-css';
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
})();
