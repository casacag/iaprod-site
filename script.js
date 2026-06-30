/* =========================================================
   IAPROD — script
   ========================================================= */
(function () {
  "use strict";

  // Where the real portfolio videos live (already deployed, CORS-open).
  // For a self-contained IONOS deploy, copy them into ./video/ and set this to "video/".
  var VIDEO_BASE = "https://casacag.github.io/showreel_IAPROD/video/";

  var PROJECTS = [
    { file: "caffe_eleonora.mp4",     title: "Caffè Eleonora",      cat: "promo",       label: "Brand & Promo",  desc: "Esperienza sensoriale per un brand del gusto." },
    { file: "orologio.mp4",           title: "Orologio",            cat: "promo",       label: "Brand & Promo",  desc: "Product video dall'estetica pulita e materica." },
    { file: "balena_ai.mp4",          title: "Balena AI",           cat: "arte",        label: "Artistico",      desc: "Natura digitale, interamente generata con AI." },
    { file: "giorh audio 7 .mp4",     title: "Giorh",               cat: "arte",        label: "Artistico",      desc: "Visual musicale e sound design." },
    { file: "miscuglio.mp4",          title: "Showreel",            cat: "promo",       label: "Brand & Promo",  desc: "Una selezione dei lavori dello studio." },
    { file: "vino_mandrolisai.mp4",   title: "Vino del Mandrolisai",cat: "territorio",  label: "Territorio",     desc: "Il racconto di un vino e della sua terra." },
    { file: "arrampicata.mp4",        title: "Arrampicata",         cat: "sport",       label: "Sport & Adventure", desc: "Adrenalina verticale, ritmo serrato." },
    { file: "quad.mp4",               title: "Quad",                cat: "sport",       label: "Sport & Adventure", desc: "Dinamiche off-road ad alto impatto." }
  ];

  var url = function (file) { return VIDEO_BASE + encodeURIComponent(file); };

  document.addEventListener("DOMContentLoaded", function () {

    /* ---- year ---- */
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    /* ---- hero video (light, ambient) ---- */
    var hv = document.getElementById("heroVideo");
    if (hv) {
      hv.src = url("balena_ai.mp4");
      hv.play().catch(function () {/* autoplay may be blocked; harmless */});
    }

    /* ---- nav scroll state ---- */
    var nav = document.getElementById("nav");
    var onScroll = function () {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---- mobile menu ---- */
    var burger = document.getElementById("burger");
    var links = document.querySelector(".nav__links");
    if (burger && links) {
      burger.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        burger.classList.toggle("x", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          links.classList.remove("open");
          burger.classList.remove("x");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* ---- reveal on scroll ---- */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

    /* ---- skill bars ---- */
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); sio.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".skill").forEach(function (el) { sio.observe(el); });

    /* ---- portfolio render ---- */
    var grid = document.getElementById("workGrid");
    if (grid) {
      var frag = document.createDocumentFragment();
      PROJECTS.forEach(function (p) {
        var card = document.createElement("article");
        card.className = "work";
        card.dataset.cat = p.cat;
        card.dataset.file = p.file;
        card.dataset.title = p.title;
        card.innerHTML =
          '<video muted loop playsinline preload="metadata" src="' + url(p.file) + '#t=0.5"></video>' +
          '<span class="work__play">▶</span>' +
          '<div class="work__ov">' +
            '<span class="work__cat">' + p.label + '</span>' +
            '<span class="work__title">' + p.title + '</span>' +
          '</div>';

        var v = card.querySelector("video");
        // hover preview on desktop
        card.addEventListener("mouseenter", function () {
          if (window.matchMedia("(hover:hover)").matches) {
            var pr = v.play(); if (pr) pr.catch(function () {});
          }
        });
        card.addEventListener("mouseleave", function () {
          v.pause(); try { v.currentTime = 0.5; } catch (e) {}
        });
        card.addEventListener("click", function () { openLightbox(p); });

        frag.appendChild(card);
      });
      grid.appendChild(frag);
    }

    /* ---- filters ---- */
    var filters = document.getElementById("filters");
    if (filters) {
      filters.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter");
        if (!btn) return;
        filters.querySelectorAll(".filter").forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var f = btn.dataset.filter;
        document.querySelectorAll(".work").forEach(function (w) {
          w.classList.toggle("hide", f !== "all" && w.dataset.cat !== f);
        });
      });
    }

    /* ---- lightbox ---- */
    var lb = document.getElementById("lightbox");
    var lbVideo = document.getElementById("lbVideo");
    var lbCap = document.getElementById("lbCap");
    var lbClose = document.getElementById("lbClose");

    function openLightbox(p) {
      lbVideo.src = url(p.file);
      lbCap.textContent = p.title + " — " + p.desc;
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var pr = lbVideo.play(); if (pr) pr.catch(function () {});
    }
    function closeLightbox() {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      lbVideo.pause();
      lbVideo.removeAttribute("src");
      lbVideo.load();
      document.body.style.overflow = "";
    }
    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lb) lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lb.classList.contains("open")) closeLightbox();
    });
  });
})();
