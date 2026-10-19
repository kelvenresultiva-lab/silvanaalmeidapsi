// Carrossel dos depoimentos no celular: pontinhos de navegação + troca automática a cada 5s
(function () {
  var mq = window.matchMedia('(max-width: 767px)');
  var trilho = document.querySelector('.ti-widget .ti-reviews-container-wrapper');
  if (!trilho) return;
  var cards = trilho.querySelectorAll('.ti-review-item');
  if (cards.length < 2) return;

  var dots = document.createElement('div');
  dots.className = 'ti-carrossel-dots';
  cards.forEach(function (_, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Depoimento ' + (i + 1));
    b.addEventListener('click', function () { ir(i); reiniciar(); });
    dots.appendChild(b);
  });
  trilho.parentNode.appendChild(dots);

  function atual() {
    var meio = trilho.scrollLeft + trilho.clientWidth / 2, melhor = 0, dist = Infinity;
    cards.forEach(function (c, i) {
      var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - meio);
      if (d < dist) { dist = d; melhor = i; }
    });
    return melhor;
  }
  function marcar() {
    var a = atual();
    dots.querySelectorAll('button').forEach(function (b, i) { b.classList.toggle('ativo', i === a); });
  }
  function ir(i) {
    var c = cards[i];
    trilho.scrollTo({ left: c.offsetLeft - (trilho.clientWidth - c.offsetWidth) / 2, behavior: 'smooth' });
  }

  var timer;
  function reiniciar() {
    clearInterval(timer);
    if (!mq.matches) return;
    timer = setInterval(function () { ir((atual() + 1) % cards.length); }, 5000);
  }

  trilho.addEventListener('scroll', function () { window.requestAnimationFrame(marcar); }, { passive: true });
  trilho.addEventListener('touchstart', function () { clearInterval(timer); }, { passive: true });
  trilho.addEventListener('touchend', reiniciar, { passive: true });
  mq.addEventListener('change', reiniciar);
  marcar();
  reiniciar();
})();
