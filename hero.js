/* OpenWhisp hero — the signature waveform→text moment.
   A small re-creation of the app's "Quiet Glass" overlay: a centered waveform
   that animates as if hearing speech, while a line types out beneath it.
   Respects prefers-reduced-motion (renders a static still, full text shown). */

(function () {
  "use strict";

  var canvas = document.getElementById("wave");
  var transcript = document.getElementById("overlay-transcript");
  if (!canvas || !transcript) return;

  var PHRASE = "Speak. It's typed. Nothing leaves your Mac.";
  var ACCENT_LISTEN = "#E8ECF2"; // overlay white (idle)
  var ACCENT_SPEAK = "#3DD8E0";  // cyan (speaking)
  var ACCENT_FINAL = "#8B7CF6";  // violet (finalizing)

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var BARS = 48;
  var seeds = [];
  for (var i = 0; i < BARS; i++) seeds.push(i * 1.37 + (i % 5) * 0.6);

  function sizeCanvas() {
    var rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
  }

  // Envelope: tall in the middle, tapering to the edges (matches the app icon).
  function envelope(n) {
    var x = (n / (BARS - 1)) * 2 - 1; // -1..1
    return Math.pow(Math.cos((x * Math.PI) / 2), 1.6);
  }

  function lerpColor(a, b, t) {
    function h(c) { return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; }
    var ca = h(a), cb = h(b);
    return "rgb(" +
      Math.round(ca[0] + (cb[0] - ca[0]) * t) + "," +
      Math.round(ca[1] + (cb[1] - ca[1]) * t) + "," +
      Math.round(ca[2] + (cb[2] - ca[2]) * t) + ")";
  }

  function drawFrame(t, energy, accent) {
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    var mid = h / 2;
    var gap = w / BARS;
    var barW = Math.max(2 * dpr, gap * 0.36);

    ctx.shadowColor = accent;
    ctx.shadowBlur = 10 * dpr * energy;

    for (var n = 0; n < BARS; n++) {
      var env = envelope(n);
      // layered sines give a lively, non-repetitive motion
      var wobble = (Math.sin(t * 0.004 + seeds[n]) * 0.5 + 0.5) *
                   (Math.sin(t * 0.011 + seeds[n] * 0.7) * 0.5 + 0.5);
      var amp = env * (0.18 + wobble * 0.82 * energy);
      var barH = Math.max(3 * dpr, amp * (h * 0.82));
      var x = n * gap + (gap - barW) / 2;

      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.55 + env * 0.45;
      var r = barW / 2;
      var y = mid - barH / 2;
      // rounded-rect bar
      ctx.beginPath();
      if (ctx.roundRect) { ctx.roundRect(x, y, barW, barH, r); }
      else { ctx.rect(x, y, barW, barH); }
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }

  // ---- reduced motion: one static still + full text, no loop ----
  if (reduceMotion) {
    sizeCanvas();
    drawFrame(1200, 0.6, ACCENT_LISTEN);
    transcript.textContent = PHRASE;
    return;
  }

  // ---- animated loop: idle → listening → typing → hold → reset ----
  var start = null;
  var typed = 0;
  // timeline (ms): rise, type window start/end, finalize, hold, reset
  var T_RISE = 900;
  var T_TYPE_START = 1100;
  var T_TYPE_END = 4200;
  var T_FINAL = 4600;
  var T_HOLD = 6200;
  var T_LOOP = 7400;

  function frame(now) {
    if (start === null) start = now;
    var t = (now - start) % T_LOOP;

    // energy + accent by phase
    var energy, accent;
    if (t < T_RISE) {
      energy = 0.15 + (t / T_RISE) * 0.55;
      accent = lerpColor(ACCENT_LISTEN, ACCENT_SPEAK, Math.min(1, t / T_RISE));
    } else if (t < T_FINAL) {
      energy = 0.7 + Math.sin(now * 0.006) * 0.18;
      accent = ACCENT_SPEAK;
    } else if (t < T_HOLD) {
      var k = (t - T_FINAL) / (T_HOLD - T_FINAL);
      energy = 0.7 - k * 0.55;
      accent = lerpColor(ACCENT_SPEAK, ACCENT_FINAL, k);
    } else {
      energy = 0.55 - ((t - T_HOLD) / (T_LOOP - T_HOLD)) * 0.4;
      accent = lerpColor(ACCENT_FINAL, ACCENT_LISTEN, (t - T_HOLD) / (T_LOOP - T_HOLD));
    }

    drawFrame(now, Math.max(0.12, energy), accent);

    // typing: reveal characters across the type window
    var target;
    if (t < T_TYPE_START) target = 0;
    else if (t >= T_TYPE_END) target = PHRASE.length;
    else target = Math.round(((t - T_TYPE_START) / (T_TYPE_END - T_TYPE_START)) * PHRASE.length);

    if (t < 60) typed = 0; // reset at loop start
    if (target !== typed) {
      typed = target;
      transcript.textContent = PHRASE.slice(0, typed);
    }

    requestAnimationFrame(frame);
  }

  sizeCanvas();
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(sizeCanvas, 150);
  });

  // Only animate when visible (saves battery when scrolled away).
  var running = false;
  function startLoop() { if (!running) { running = true; requestAnimationFrame(frame); } }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) startLoop();
    }, { threshold: 0.1 });
    io.observe(canvas);
  } else {
    startLoop();
  }
})();
