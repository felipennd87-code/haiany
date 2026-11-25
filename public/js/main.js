/* Haiany Oliveira — Arquitetura · interações */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  var WA = "5564981232418";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Projetos (dados reais das fotos) ---------- */
  var PROJECTS = [
    { src: "img/08-fachada-por-do-sol.webp", thumb: "img/08-fachada-por-do-sol-thumb.webp", cat: "fachadas", catLabel: "Fachada", title: "Fachada ao pôr do sol", text: "Residência de alto padrão com iluminação pensada para a noite.", wide: true },
    { src: "img/13-fachada-garagem.webp", thumb: "img/13-fachada-garagem-thumb.webp", cat: "fachadas", catLabel: "Fachada", title: "Fachada com garagem coberta", text: "Volumes limpos, pedra e garagem integrada à fachada." },
    { src: "img/07-area-gourmet-piscina.webp", cat: "lazer", catLabel: "Lazer", title: "Área gourmet com piscina", text: "Deck em madeira e lazer integrado à casa." },
    { src: "img/05-sala-pe-direito-duplo.webp", cat: "interiores", catLabel: "Interiores", title: "Sala com pé-direito duplo", text: "Escada escultural e amplitude.", wide: true },
    { src: "img/06-fachada-entrada.webp", cat: "fachadas", catLabel: "Fachada", title: "Fachada de entrada", text: "Vidro, madeira e paisagismo na chegada." },
    { src: "img/11-cozinha-ilha.webp", cat: "interiores", catLabel: "Interiores", title: "Cozinha com ilha", text: "Mármore escuro, madeira e iluminação pendente.", wide: true },
    { src: "img/10-casa-piscina.webp", thumb: "img/10-casa-piscina-thumb.webp", cat: "lazer", catLabel: "Lazer", title: "Casa com piscina", text: "Lazer completo com pergolado e piscina.", wide: true },
    { src: "img/03-sala-tv.webp", cat: "interiores", catLabel: "Interiores", title: "Sala de TV", text: "Marcenaria sob medida e luz indireta." },
    { src: "img/04-fachada-jardim.webp", thumb: "img/04-fachada-jardim-thumb.webp", cat: "fachadas", catLabel: "Fachada", title: "Fachada com jardim", text: "Paisagismo iluminado e arquitetura contemporânea.", wide: true },
    { src: "img/09-sala-jantar.webp", cat: "interiores", catLabel: "Interiores", title: "Sala de jantar integrada", text: "Integração com a área externa e o bar.", wide: true },
    { src: "img/01-cozinha-cinza.webp", cat: "interiores", catLabel: "Interiores", title: "Cozinha em tons de cinza", text: "Linhas retas e marcenaria em cinza." }
  ];

  /* ---------- NAV ---------- */
  var nav = $("#nav");
  var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = $("#navToggle"), menu = $("#menu");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle.addEventListener("click", function () { setMenu(menu.hidden); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setMenu(false); });

  // link ativo no menu desktop
  var links = $$(".nav__links a");
  if ("IntersectionObserver" in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (l) { var s = $(l.getAttribute("href")); if (s) secObs.observe(s); });
  }

  /* ---------- Reveal ao rolar ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var rObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); rObs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el, i) {
      // pequeno escalonamento entre irmãos
      var sib = el.parentElement ? $$(":scope > .reveal", el.parentElement).indexOf(el) : 0;
      el.style.transitionDelay = Math.min(sib, 5) * 80 + "ms";
      rObs.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Card de projeto no hero ---------- */
  var heroCard = $("#heroProject");
  if (heroCard) {
    var heroItems = PROJECTS.filter(function (p) { return p.thumb; });
    var hi = 0, heroTimer;
    var thumb = $(".glass__thumb", heroCard), ht = $(".glass__title", heroCard), hx = $(".glass__text", heroCard), dots = $$(".dots i", heroCard);
    var showHero = function (n) {
      hi = (n + heroItems.length) % heroItems.length;
      var p = heroItems[hi];
      [thumb, ht, hx].forEach(function (el) { el.classList.add("is-fading"); });
      setTimeout(function () {
        thumb.src = p.thumb; thumb.alt = p.title; ht.textContent = p.title; hx.textContent = p.text;
        [thumb, ht, hx].forEach(function (el) { el.classList.remove("is-fading"); });
      }, 280);
      dots.forEach(function (d, i) { d.classList.toggle("on", i === hi % dots.length); });
    };
    var autoHero = function () { clearInterval(heroTimer); heroTimer = setInterval(function () { showHero(hi + 1); }, 6000); };
    $$("button[data-dir]", heroCard).forEach(function (b) {
      b.addEventListener("click", function () { showHero(hi + Number(b.dataset.dir)); autoHero(); });
    });
    heroItems.forEach(function (p) { var i = new Image(); i.src = p.thumb; });
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) autoHero();
  }

  /* ---------- Carrossel de projetos ---------- */
  var carousel = $("#carousel");
  var frag = document.createDocumentFragment();
  PROJECTS.forEach(function (p, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "pcard" + (p.wide ? " pcard--wide" : "");
    b.dataset.cat = p.cat;
    b.dataset.index = i;
    b.setAttribute("aria-label", "Ampliar: " + p.title);
    b.innerHTML =
      '<img src="' + p.src + '" alt="' + p.title + '" loading="lazy">' +
      '<span class="pcard__ic" aria-hidden="true">↗</span>' +
      '<span class="pcard__cap"><span class="pcard__cat">' + p.catLabel + '</span><span class="pcard__t">' + p.title + "</span></span>";
    b.addEventListener("click", function () { openLb(i); });
    frag.appendChild(b);
  });
  carousel.appendChild(frag);

  var cards = $$(".pcard", carousel);
  var step = function () {
    var c = cards.filter(function (x) { return !x.hidden; })[0];
    return c ? c.getBoundingClientRect().width + 16 : 300;
  };
  $("#projPrev").addEventListener("click", function () { carousel.scrollBy({ left: -step(), behavior: "smooth" }); });
  $("#projNext").addEventListener("click", function () { carousel.scrollBy({ left: step(), behavior: "smooth" }); });

  var bar = $("#projProgress");
  var updateBar = function () {
    var max = carousel.scrollWidth - carousel.clientWidth;
    var vis = carousel.clientWidth / carousel.scrollWidth;
    var pos = max > 0 ? carousel.scrollLeft / max : 1;
    var w = Math.max(vis, 0.12) * 100;
    bar.style.width = (w + (100 - w) * pos) + "%";
  };
  carousel.addEventListener("scroll", updateBar, { passive: true });
  window.addEventListener("resize", updateBar);
  updateBar();

  $$(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      $$(".chip").forEach(function (c) { c.classList.toggle("is-on", c === chip); });
      var f = chip.dataset.filter;
      cards.forEach(function (c) { c.hidden = !(f === "todos" || c.dataset.cat === f); });
      carousel.scrollTo({ left: 0 });
      updateBar();
    });
  });

  // teclado no carrossel
  carousel.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); carousel.scrollBy({ left: step(), behavior: "smooth" }); }
    if (e.key === "ArrowLeft") { e.preventDefault(); carousel.scrollBy({ left: -step(), behavior: "smooth" }); }
  });

  /* ---------- Lightbox ---------- */
  var lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap"), li = 0;
  function visibleIdx() { return cards.filter(function (c) { return !c.hidden; }).map(function (c) { return Number(c.dataset.index); }); }
  function showLb(i) {
    li = i; var p = PROJECTS[i];
    lbImg.src = p.src; lbImg.alt = p.title; lbCap.textContent = p.catLabel + " · " + p.title;
  }
  function openLb(i) {
    showLb(i);
    if (typeof lb.showModal === "function") lb.showModal(); else lb.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  }
  function closeLb() { if (lb.close) lb.close(); else lb.removeAttribute("open"); }
  function moveLb(d) { var v = visibleIdx(); var k = v.indexOf(li); showLb(v[(k + d + v.length) % v.length]); }
  lb.addEventListener("close", function () { document.body.style.overflow = ""; });
  $("#lbClose").addEventListener("click", closeLb);
  $("#lbPrev").addEventListener("click", function () { moveLb(-1); });
  $("#lbNext").addEventListener("click", function () { moveLb(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.tagName === "FIGURE") closeLb(); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") moveLb(1);
    if (e.key === "ArrowLeft") moveLb(-1);
  });
  // swipe no lightbox
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (tx === null) return; var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) moveLb(dx < 0 ? 1 : -1); tx = null;
  });

  /* ---------- Quiz "Qual é o seu projeto?" ---------- */
  var form = $("#quizForm");
  var steps = $$(".q", form);
  var LABELS = { tipo: "Projeto", tamanho: "Tamanho", quando: "Quando" };
  var cur = 0;
  var stepTxt = $("#quizStep"), qbar = $("#quizBar"), back = $("#quizBack"), reset = $("#quizReset");

  function go(n) {
    cur = n;
    steps.forEach(function (s, i) { s.classList.toggle("is-active", i === n); });
    var done = n === steps.length - 1;
    stepTxt.textContent = done ? "Resumo" : "0" + (n + 1) + " / 03";
    qbar.style.width = (done ? 100 : ((n + 1) / 3) * 100) + "%";
    back.hidden = n === 0 || done;
    reset.hidden = !done;
    if (done) buildSummary();
  }

  function answers() {
    var a = {};
    ["tipo", "tamanho", "quando"].forEach(function (k) {
      var el = form.querySelector('input[name="' + k + '"]:checked');
      a[k] = el ? el.value : "";
    });
    return a;
  }

  function buildSummary() {
    var a = answers();
    var ul = $("#quizSummary");
    ul.innerHTML = "";
    Object.keys(LABELS).forEach(function (k) {
      var li = document.createElement("li");
      var s = document.createElement("span"); s.textContent = LABELS[k];
      var b = document.createElement("b"); b.textContent = a[k]; b.style.fontWeight = "400";
      li.appendChild(s); li.appendChild(b); ul.appendChild(li);
    });
    var msg =
      "Olá, Haiany! Vim pelo site e respondi o quiz \"Qual é o seu projeto?\":\n\n" +
      "• Tipo: " + a.tipo + "\n" +
      "• Tamanho: " + a.tamanho + "\n" +
      "• Quando: " + a.quando + "\n\n" +
      "Gostaria de conversar sobre o meu projeto.";
    $("#quizSend").href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg);
  }

  steps.forEach(function (s, i) {
    $$("input", s).forEach(function (inp) {
      inp.addEventListener("click", function () { setTimeout(function () { go(i + 1); }, 260); });
    });
  });
  back.addEventListener("click", function () { go(Math.max(0, cur - 1)); });
  reset.addEventListener("click", function () { form.reset(); go(0); });
  form.addEventListener("submit", function (e) { e.preventDefault(); });

  /* ---------- Ano ---------- */
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
})();
