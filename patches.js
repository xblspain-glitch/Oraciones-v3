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

/* ===== v3.1.16 - Arco iris alto en mañana/día =====
   Mañana y día mantienen un único arco iris, ahora más alto.
   Atardecer queda sin arco iris para evitar mezcla rara con el degradado cálido.
   Noche queda sin cambios. */
(function(){
  const css = `
.home-card-v9019.home-sky-morning,
.home-card-v9019.home-sky-day,
body.dark .home-card-v9019.home-sky-morning,
body.dark .home-card-v9019.home-sky-day{
  background:
    radial-gradient(ellipse 170% 80% at 50% 82%,
      transparent 0%,
      transparent 52.6%,
      rgba(255,  86, 106, .205) 54.0%,
      rgba(255, 165,  72, .185) 55.8%,
      rgba(255, 232, 105, .165) 57.6%,
      rgba(111, 218, 134, .150) 59.4%,
      rgba( 74, 190, 242, .165) 61.2%,
      rgba(111, 136, 238, .145) 63.0%,
      rgba(178, 110, 224, .128) 64.8%,
      transparent 69.2%),
    radial-gradient(ellipse 170% 80% at 50% 82%,
      transparent 0%,
      transparent 51.8%,
      rgba(255,255,255,.070) 58.8%,
      rgba(255,255,255,.020) 68.8%,
      transparent 73.2%),
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
    radial-gradient(ellipse at 28% 18%, rgba(255,255,255,.34) 0%, rgba(255,255,255,.13) 16%, rgba(255,255,255,0) 38%),
    radial-gradient(ellipse at 70% 22%, rgba(255,255,255,.27) 0%, rgba(255,255,255,.10) 18%, rgba(255,255,255,0) 42%),
    linear-gradient(180deg, rgba(255,255,255,.11), rgba(255,255,255,0) 66%)!important;
}
.home-card-v9019.home-sky-sunset,
body.dark .home-card-v9019.home-sky-sunset{
  border-color:rgba(246,184,126,.30)!important;
  background:
    radial-gradient(circle at 8% 16%, rgba(255,255,255,.84) 0%, rgba(255,244,218,.42) 8%, rgba(255,218,170,.16) 22%, rgba(239,148,92,.045) 38%, rgba(239,148,92,0) 62%),
    radial-gradient(ellipse at 0% 48%, rgba(255,192,132,.13) 0%, rgba(255,223,184,.065) 36%, rgba(255,223,184,0) 72%),
    radial-gradient(ellipse at 48% 24%, rgba(255,246,226,.21) 0%, rgba(255,246,226,.075) 30%, rgba(255,246,226,0) 64%),
    radial-gradient(ellipse at 96% 38%, rgba(196,232,255,.50) 0%, rgba(196,232,255,.25) 36%, rgba(196,232,255,0) 73%),
    linear-gradient(135deg,#fff1e3 0%,#fff7ed 24%,#f6fcff 59%,#e6f8ff 100%)!important;
  box-shadow:0 24px 58px rgba(72,153,214,.13),0 10px 26px rgba(226,124,76,.035),inset 0 1px 0 rgba(255,255,255,.96)!important;
}
.home-card-v9019.home-sky-sunset::before,
body.dark .home-card-v9019.home-sky-sunset::before{
  background:
    radial-gradient(ellipse at 18% 18%, rgba(255,255,255,.36) 0%, rgba(255,255,255,.14) 19%, rgba(255,255,255,0) 43%),
    radial-gradient(ellipse at 80% 28%, rgba(255,255,255,.24) 0%, rgba(255,255,255,.09) 20%, rgba(255,255,255,0) 45%),
    linear-gradient(180deg, rgba(255,255,255,.11), rgba(255,255,255,0) 68%)!important;
}`;
  [
    'v3-1-4-rainbow-covenant-css',
    'v3-1-10-rainbow-bottom-real-css',
    'v3-1-11-rainbow-horizon-real-css',
    'v3-1-12-rainbow-visible-open-css',
    'v3-1-13-rainbow-soft-visible-css',
    'v3-1-14-rainbow-visible-final-css',
    'v3-1-15-rainbow-clean-single-css',
    'v3-1-16-rainbow-high-no-sunset-css'
  ].forEach(function(oldId){
    const old = document.getElementById(oldId);
    if (old) old.remove();
  });
  const style = document.createElement('style');
  style.id = 'v3-1-16-rainbow-high-no-sunset-css';
  style.textContent = css;
  document.head.appendChild(style);
})();
