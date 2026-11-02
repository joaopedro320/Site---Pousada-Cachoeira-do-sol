/* Pousada Cachoeira do Sol | site completo | desenvolvido por Malta Business */
(function () {
  'use strict';
  var WA = '5531972671559';
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function waLink(msg) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg); }
  function evento(nome, extra) {
    window.dataLayer = window.dataLayer || [];
    var d = { event: nome, pagina: location.pathname };
    if (extra) for (var k in extra) d[k] = extra[k];
    window.dataLayer.push(d);
  }
  function br(d) { return d ? d.split('-').reverse().join('/') : ''; }

  /* WhatsApp com mensagem pronta + eventos */
  $$('[data-wa]').forEach(function (a) { a.href = waLink(a.getAttribute('data-wa')); });
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-ev]');
    if (el) evento(el.getAttribute('data-ev'), { link_url: el.href || '' });
  });

  /* Cabeçalho */
  var topo = $('.topo');
  function rolou() { if (topo) topo.classList.toggle('rolou', window.scrollY > 10); }
  window.addEventListener('scroll', rolou, { passive: true }); rolou();

  var burguer = $('.burguer'), menu = $('#menu');
  if (burguer) {
    burguer.addEventListener('click', function () {
      var abre = !menu.classList.contains('aberto');
      menu.classList.toggle('aberto', abre);
      burguer.setAttribute('aria-expanded', abre);
      burguer.setAttribute('aria-label', abre ? 'Fechar menu' : 'Abrir menu');
      document.body.style.overflow = abre ? 'hidden' : '';
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('aberto')) burguer.click(); });
  }

  /* Balão do WhatsApp flutuante (uma vez) */
  var wa = $('.wa');
  if (wa && !reduz) setTimeout(function () { wa.classList.add('fala'); setTimeout(function () { wa.classList.remove('fala'); }, 4000); }, 5000);

  /* Revelar ao rolar */
  var alvos = $$('.revela, .revela-arco, .relogio, .prato');
  if ('IntersectionObserver' in window && !reduz) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visto'); io.unobserve(en.target); } });
    }, { threshold: .14, rootMargin: '0px 0px -40px 0px' });
    alvos.forEach(function (el) { io.observe(el); });
  } else { alvos.forEach(function (el) { el.classList.add('visto'); }); }

  /* Home: fotos do arco em sequência + contador */
  var arcoFotos = $$('.arcos .a1 img');
  if (arcoFotos.length > 1 && !reduz) {
    var ai = 0;
    setInterval(function () {
      arcoFotos[ai].classList.remove('on'); ai = (ai + 1) % arcoFotos.length; arcoFotos[ai].classList.add('on');
    }, 5000);
  }
  $$('[data-conta]').forEach(function (el) {
    var alvo = +el.getAttribute('data-conta');
    if (reduz) { el.textContent = alvo; return; }
    var feito = false;
    var o = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting || feito) return; feito = true;
      var t0 = null;
      (function passo(t) {
        if (!t0) t0 = t; var p = Math.min((t - t0) / 1500, 1);
        el.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(passo);
      })(performance.now());
      requestAnimationFrame(function passo2() {});
    });
    o.observe(el);
  });

  /* Datas mínimas = hoje */
  var hoje = new Date(); hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
  var hojeStr = hoje.toISOString().slice(0, 10);
  $$('input[type="date"]').forEach(function (i) { i.min = hojeStr; });

  /* Home: consulta rápida direto no WhatsApp */
  var consulta = $('#consulta');
  if (consulta) {
    var cTipo = $('#c-tipo'), cSaida = $('#c-saida'), cSaidaBox = $('#c-saida-box'), cEntrada = $('#c-entrada');
    cTipo.addEventListener('change', function () { cSaidaBox.style.visibility = cTipo.value === 'Day Use' ? 'hidden' : 'visible'; });
    cEntrada.addEventListener('change', function () { if (cEntrada.value) cSaida.min = cEntrada.value; });
    consulta.addEventListener('submit', function (e) {
      e.preventDefault();
      var t = cTipo.value, l = ['Olá! Estou no site da Pousada Cachoeira do Sol e quero consultar disponibilidade.', '', 'Tipo: ' + t];
      if (cEntrada.value) l.push((t === 'Day Use' ? 'Data: ' : 'Check-in: ') + br(cEntrada.value));
      if (t !== 'Day Use' && cSaida.value) l.push('Check-out: ' + br(cSaida.value));
      l.push('Pessoas: ' + $('#c-pessoas').value);
      evento('consulta_rapida', { tipo_reserva: t });
      window.open(waLink(l.join('\n')), '_blank');
    });
  }

  /* Carrosséis das suítes */
  $$('.fotos').forEach(function (box) {
    var trilho = $('.fotos__trilho', box), imgs = $$('img', trilho), conta = $('.fotos__conta', box), i = 0;
    function vai(n) {
      i = (n + imgs.length) % imgs.length;
      trilho.style.transform = 'translateX(' + (-100 * i) + '%)';
      if (conta) conta.textContent = (i + 1) + ' / ' + imgs.length;
    }
    var ant = $('[data-ant]', box), prox = $('[data-prox]', box);
    if (ant) ant.addEventListener('click', function () { vai(i - 1); });
    if (prox) prox.addEventListener('click', function () { vai(i + 1); });
    var x0 = null;
    trilho.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    trilho.addEventListener('touchend', function (e) {
      if (x0 === null) return; var d = e.changedTouches[0].clientX - x0;
      if (Math.abs(d) > 40) vai(i + (d < 0 ? 1 : -1)); x0 = null;
    });
    vai(0);
  });

  /* Índice ativo conforme a rolagem (acomodações e normas) */
  $$('[data-indice]').forEach(function (nav) {
    var links = $$('a[href^="#"]', nav);
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }).filter(Boolean);
    if (!('IntersectionObserver' in window)) return;
    var o = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + en.target.id;
          a.classList.toggle('ativo', on);
          if (on && nav.scrollWidth > nav.clientWidth) a.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduz ? 'auto' : 'smooth' });
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    secs.forEach(function (s) { o.observe(s); });
  });

  /* Galeria: filtros */
  var filtros = $$('.filtros button');
  filtros.forEach(function (b) {
    b.addEventListener('click', function () {
      var cat = b.getAttribute('data-cat');
      filtros.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      $$('.grade button').forEach(function (it) {
        it.hidden = !(cat === 'todas' || it.getAttribute('data-cat') === cat);
      });
      evento('filtro_galeria', { categoria: cat });
    });
  });

  /* Parallax leve (hero da cachoeira e fotos marcadas) */
  var par = $('.cach-hero img');
  if (par && !reduz) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY; if (y < window.innerHeight) par.style.transform = 'translate3d(0,' + (y * .3) + 'px,0)';
    }, { passive: true });
  }

  /* Lightbox */
  var lb = $('#lb');
  if (lb) {
    var lbImg = $('#lbImg'), lbLeg = $('#lbLeg'), grupo = [], li = 0, antes = null;
    function mostra(n) {
      li = (n + grupo.length) % grupo.length;
      var b = grupo[li], im = $('img', b);
      lbImg.classList.add('troca');
      setTimeout(function () {
        lbImg.src = b.getAttribute('data-full') || im.getAttribute('src');
        lbImg.alt = im.alt;
        lbLeg.textContent = im.alt + '  (' + (li + 1) + ' de ' + grupo.length + ')';
        lbImg.onload = function () { lbImg.classList.remove('troca'); };
      }, 120);
    }
    function abre(b) {
      var nome = b.getAttribute('data-lb');
      grupo = $$('[data-lb="' + nome + '"]').filter(function (x) { return !x.hidden; });
      antes = document.activeElement;
      lb.hidden = false; requestAnimationFrame(function () { lb.classList.add('aberto'); });
      document.body.style.overflow = 'hidden';
      mostra(grupo.indexOf(b)); $('#lbX').focus();
      evento('abrir_foto', { grupo: nome });
    }
    function fecha() {
      lb.classList.remove('aberto'); document.body.style.overflow = '';
      setTimeout(function () { lb.hidden = true; }, 280);
      if (antes) antes.focus();
    }
    document.addEventListener('click', function (e) { var b = e.target.closest('[data-lb]'); if (b) abre(b); });
    $('#lbX').addEventListener('click', fecha);
    $('#lbAnt').addEventListener('click', function () { mostra(li - 1); });
    $('#lbProx').addEventListener('click', function () { mostra(li + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) fecha(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') fecha();
      if (e.key === 'ArrowLeft') mostra(li - 1);
      if (e.key === 'ArrowRight') mostra(li + 1);
    });
  }

  /* Acordeão: um aberto por vez */
  $$('.acordeao details').forEach(function (d) {
    d.addEventListener('toggle', function () { if (d.open) $$('details', d.parentNode).forEach(function (o) { if (o !== d) o.open = false; }); });
  });

  /* Formulário de reserva */
  var form = $('#form');
  if (form) {
    var enviar = $('#f-enviar'), aviso = $('#f-aviso'), tel = $('#f-tel'), entrada = $('#f-entrada'), saida = $('#f-saida');
    var campoSaida = $('#campo-saida'), campoSuite = $('#campo-suite'), lbEntrada = $('#lb-entrada'), sel = $('#f-suite');

    /* Pré-preenche vindo de outras páginas (?tipo=Day%20Use ou ?suite=...) */
    var q = new URLSearchParams(location.search);
    if (q.get('tipo') === 'dayuse') $('input[value="Day Use"]', form).checked = true;
    if (q.get('suite')) { Array.prototype.forEach.call(sel.options, function (o) { if (o.value === q.get('suite')) sel.value = o.value; }); }

    tel.addEventListener('input', function () {
      var v = tel.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
      else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
      else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      else if (v.length) v = v.replace(/^(\d{0,2})/, '($1');
      tel.value = v;
    });
    entrada.addEventListener('change', function () {
      if (entrada.value) saida.min = entrada.value;
      if (saida.value && saida.value <= entrada.value) saida.value = '';
    });
    function tipo() { return $('input[name="tipo"]:checked', form).value; }
    function ajusta() {
      var day = tipo() === 'Day Use';
      campoSaida.hidden = day; saida.required = !day; saida.disabled = day;
      campoSuite.hidden = day;
      lbEntrada.textContent = day ? 'Data do Day Use' : 'Check-in';
      valida();
    }
    function valida() {
      var ok = form.checkValidity();
      if (ok && tipo() === 'Hospedagem' && saida.value <= entrada.value) ok = false;
      enviar.disabled = !ok;
      aviso.textContent = ok ? 'Tudo certo! Ao enviar, o WhatsApp abre com a sua mensagem pronta.' : 'Preencha os campos obrigatórios para liberar o envio.';
    }
    $$('input[name="tipo"]', form).forEach(function (r) { r.addEventListener('change', ajusta); });
    form.addEventListener('input', valida); form.addEventListener('change', valida);
    $$('input,select,textarea', form).forEach(function (c) {
      c.addEventListener('blur', function () { if (c.value) c.classList.toggle('erro', !c.checkValidity()); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault(); valida(); if (enviar.disabled) return;
      var f = new FormData(form), t = tipo();
      var l = ['Olá! Acabei de preencher o formulário no site da Pousada Cachoeira do Sol.', '', '*Pedido de reserva: ' + t + '*', 'Nome: ' + f.get('nome'), 'WhatsApp: ' + f.get('telefone')];
      if (t === 'Hospedagem') {
        l.push('Check-in: ' + br(f.get('entrada')), 'Check-out: ' + br(f.get('saida')), 'Suíte de interesse: ' + (f.get('suite') || 'Sem preferência'));
      } else { l.push('Data do Day Use: ' + br(f.get('entrada'))); }
      l.push('Adultos: ' + f.get('adultos'), 'Crianças: ' + f.get('criancas'));
      if ((f.get('mensagem') || '').trim()) l.push('Observações: ' + f.get('mensagem').trim());
      l.push('', 'Aguardo mais informações.');
      evento('form_submit', { tipo_reserva: t });
      var url = waLink(l.join('\n')), aba = window.open(url, '_blank');
      if (aba) { try { aba.opener = null; } catch (er) {} location.href = 'obrigado.html'; } else { location.href = url; }
    });
    ajusta();
  }
})();
