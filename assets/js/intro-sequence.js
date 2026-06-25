(function () {
  'use strict';

  function byId(id) {
    return document.getElementById(id);
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function runArcanaIntro() {
    var intro = byId('arcanaIntro');
    if (!intro) return;

    // Home now uses a dedicated center-panel transition; keep legacy full-screen intro disabled.
    intro.classList.add('hidden', 'force-hidden', 'sequence-ending');
    intro.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('intro-active');
    return;

    intro.classList.add('storyboard-v2', 'reference-letter-scene');
    var appContainer = document.querySelector('.app');

    if (appContainer && intro.parentElement !== appContainer) {
      appContainer.appendChild(intro);
    }

    var skipBtn = byId('introSkip');
    var beginBtn = byId('introBeginBtn');
    var scrollSeal = byId('scrollSeal');
    var scrollContent = byId('scrollContent');
    var exteriorImage = byId('introExteriorImage');
    var introExterior = intro.querySelector('.intro-exterior');
    var doorSet = intro.querySelector('.intro-door-set');
    var fireplaceArch = intro.querySelector('.fireplace-arch');
    var interiorFireplace = intro.querySelector('.interior-fireplace');
    var windowNightSky = intro.querySelector('.window-night-sky');
    var interiorWindow = intro.querySelector('.interior-window');
    var tableWrap = intro.querySelector('.interior-table-wrap');
    var introInterior = intro.querySelector('.intro-interior');
    var introScroll = intro.querySelector('.intro-scroll');
    var letterbox = null;
    var timers = [];
    var ended = false;
    var sidebarCaptureAttached = false;

    function create(tag, className) {
      var el = document.createElement(tag);
      if (className) el.className = className;
      return el;
    }

    function appendIfMissing(parent, selector, tag, className) {
      if (!parent) return null;
      var found = parent.querySelector(selector);
      if (found) return found;
      var el = create(tag, className);
      parent.appendChild(el);
      return el;
    }

    function addRichnessElements() {
      var filmGrain = intro.querySelector('.intro-film-grain');
      if (!filmGrain) {
        filmGrain = create('div', 'intro-film-grain');
        intro.insertBefore(filmGrain, intro.firstChild);
      }

      letterbox = intro.querySelector('.intro-letterbox');
      if (!letterbox) {
        letterbox = create('div', 'intro-letterbox');
        letterbox.appendChild(create('div', 'letterbox-top'));
        letterbox.appendChild(create('div', 'letterbox-bottom'));
        intro.appendChild(letterbox);
      }

      appendIfMissing(introExterior, '.intro-vignette', 'div', 'intro-vignette');
      appendIfMissing(introExterior, '.intro-night-overlay', 'div', 'intro-night-overlay');
      appendIfMissing(intro, '.intro-blackout', 'div', 'intro-blackout');

      if (introInterior && !introInterior.querySelector('.intro-inside-photo')) {
        var insidePhoto = create('div', 'intro-inside-photo');
        introInterior.insertBefore(insidePhoto, introInterior.firstChild);
      }

      if (introExterior && !introExterior.querySelector('.intro-star')) {
        var starPositions = [
          { top: '5%', left: '10%' },
          { top: '9%', left: '24%' },
          { top: '6%', left: '42%' },
          { top: '12%', left: '58%' },
          { top: '8%', left: '73%' },
          { top: '15%', left: '86%' }
        ];
        for (var s = 0; s < starPositions.length; s += 1) {
          var star = create('span', 'intro-star');
          star.style.top = starPositions[s].top;
          star.style.left = starPositions[s].left;
          star.style.animationDuration = (2 + Math.random() * 2).toFixed(2) + 's';
          star.style.animationDelay = (s * 0.33).toFixed(2) + 's';
          introExterior.appendChild(star);
        }
      }

      if (doorSet && !doorSet.querySelector('.intro-door-ember')) {
        var emberLefts = ['32%', '44%', '56%', '68%'];
        for (var e = 0; e < emberLefts.length; e += 1) {
          var ember = create('span', 'intro-door-ember');
          ember.style.left = emberLefts[e];
          ember.style.animationDuration = (2 + Math.random()).toFixed(2) + 's';
          ember.style.animationDelay = (e * 0.42).toFixed(2) + 's';
          doorSet.appendChild(ember);
        }
      }

      appendIfMissing(fireplaceArch, '.fireplace-grate', 'div', 'fireplace-grate');

      var smoke = appendIfMissing(interiorFireplace, '.fireplace-smoke', 'div', 'fireplace-smoke');
      if (smoke && !smoke.querySelector('.smoke-wisp')) {
        for (var w = 0; w < 3; w += 1) {
          var wisp = create('span', 'smoke-wisp');
          wisp.style.left = (10 + w * 30) + '%';
          wisp.style.animationDuration = (4 + w).toFixed(2) + 's';
          wisp.style.animationDelay = (w * 0.9).toFixed(2) + 's';
          smoke.appendChild(wisp);
        }
      }

      appendIfMissing(windowNightSky, '.window-moon', 'div', 'window-moon');
      appendIfMissing(interiorWindow, '.window-reflection', 'div', 'window-reflection');

      if (tableWrap && !tableWrap.querySelector('.table-book')) {
        var book = create('div', 'table-book');
        var page1 = create('span', 'book-page');
        var page2 = create('span', 'book-page');
        var page3 = create('span', 'book-page');
        page1.style.left = '25%';
        page2.style.left = '50%';
        page3.style.left = '75%';
        book.appendChild(page1);
        book.appendChild(page2);
        book.appendChild(page3);
        tableWrap.appendChild(book);
      }

      if (tableWrap && !tableWrap.querySelector('.table-candle')) {
        var candle = create('div', 'table-candle');
        candle.appendChild(create('span', 'candle-glow'));
        candle.appendChild(create('span', 'candle-flame'));
        tableWrap.appendChild(candle);
      }

      if (tableWrap && beginBtn && !tableWrap.querySelector('.begin-btn-glow')) {
        var beginGlow = create('div', 'begin-btn-glow');
        tableWrap.insertBefore(beginGlow, beginBtn);
      }

      appendIfMissing(introInterior, '.interior-floor-glow', 'div', 'interior-floor-glow');

      var dustContainer = appendIfMissing(introScroll, '.scroll-dust-motes', 'div', 'scroll-dust-motes');
      if (dustContainer && !dustContainer.querySelector('.dust-mote')) {
        for (var d = 0; d < 6; d += 1) {
          var mote = create('span', 'dust-mote');
          mote.style.left = (10 + Math.random() * 80).toFixed(2) + '%';
          mote.style.top = (18 + Math.random() * 66).toFixed(2) + '%';
          mote.style.setProperty('--dust-x', ((Math.random() * 16) - 8).toFixed(2) + 'px');
          mote.style.animationDuration = (3 + Math.random() * 2).toFixed(2) + 's';
          mote.style.animationDelay = (d * 0.44).toFixed(2) + 's';
          dustContainer.appendChild(mote);
        }
      }

      if (introScroll && !introScroll.querySelector('.scroll-border-ornament')) {
        var topRoll = introScroll.querySelector('.scroll-roll.top');
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'scroll-border-ornament');
        svg.setAttribute('viewBox', '0 0 400 18');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttribute('aria-hidden', 'true');

        var line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        line.setAttribute('d', 'M20 9 L380 9');
        line.setAttribute('stroke', 'rgba(92,58,30,0.4)');
        line.setAttribute('stroke-width', '0.5');
        line.setAttribute('fill', 'none');

        var d1 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        d1.setAttribute('points', '20,5 24,9 20,13 16,9');
        d1.setAttribute('fill', 'rgba(92,58,30,0.35)');

        var d2 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        d2.setAttribute('points', '200,5 204,9 200,13 196,9');
        d2.setAttribute('fill', 'rgba(92,58,30,0.35)');

        var d3 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        d3.setAttribute('points', '380,5 384,9 380,13 376,9');
        d3.setAttribute('fill', 'rgba(92,58,30,0.35)');

        svg.appendChild(line);
        svg.appendChild(d1);
        svg.appendChild(d2);
        svg.appendChild(d3);

        if (topRoll && topRoll.nextSibling) {
          introScroll.insertBefore(svg, topRoll.nextSibling);
        } else if (topRoll) {
          introScroll.appendChild(svg);
        } else {
          introScroll.insertBefore(svg, introScroll.firstChild);
        }
      }
    }

    function setAct(actClass) {
      intro.classList.remove('act-1', 'act-2', 'act-3', 'act-4', 'act-5');
      intro.classList.add(actClass);
    }

    function queue(fn, delay) {
      var id = window.setTimeout(fn, delay);
      timers.push(id);
    }

    function clearQueued() {
      for (var i = 0; i < timers.length; i += 1) {
        window.clearTimeout(timers[i]);
      }
      timers = [];
    }

    function revealScrollContent() {
      if (scrollContent) {
        scrollContent.classList.add('visible');
      }
      if (introScroll) {
        introScroll.classList.add('scroll-ink-trail');
      }
    }

    function crackSeal() {
      if (scrollSeal) {
        scrollSeal.classList.add('cracked');
      }
      if (introScroll) {
        introScroll.classList.add('opened');
      }
    }

    function showActFive() {
      setAct('act-5');
      intro.classList.add('show-button');
      if (scrollContent) scrollContent.classList.add('visible');
      if (scrollSeal) scrollSeal.classList.add('cracked');
      if (introScroll) introScroll.classList.add('opened');
    }

    function announceIntroFinished() {
      window.dispatchEvent(new CustomEvent('arcana:intro-finished'));
    }

    function finishIntro() {
      if (ended) return;
      ended = true;
      clearQueued();
      intro.classList.add('sequence-ending');
      document.body.classList.remove('intro-active');

       if (letterbox && letterbox.parentNode) {
        letterbox.parentNode.removeChild(letterbox);
        letterbox = null;
      }

      window.setTimeout(function () {
        intro.classList.add('hidden');
        intro.setAttribute('aria-hidden', 'true');
        announceIntroFinished();

        if (typeof window.openHomePortal === 'function') {
          window.openHomePortal();
        }
      }, 800);
    }

    function hideIntroImmediately() {
      if (ended) return;
      ended = true;
      clearQueued();
      document.body.classList.remove('intro-active');
      intro.classList.remove('show-button', 'skip-to-end', 'act-1', 'act-2', 'act-3', 'act-4', 'act-5');
      intro.classList.add('hidden');
      intro.setAttribute('aria-hidden', 'true');

      if (letterbox && letterbox.parentNode) {
        letterbox.parentNode.removeChild(letterbox);
        letterbox = null;
      }
    }

    function restoreIntroForHome() {
      if (!intro.classList.contains('hidden')) return;

      ended = false;
      document.body.classList.add('intro-active');
      intro.classList.remove('hidden', 'sequence-ending', 'skip-to-end', 'force-hidden');
      intro.setAttribute('aria-hidden', 'false');

      addRichnessElements();
      showActFive();
    }

    function shouldDismissForSidebarClick(target) {
      var btn = target && target.closest ? target.closest('#sidebar button') : null;
      if (!btn) return false;

      // Keep intro available on explicit home nav; dismiss for any other sidebar action.
      return btn.id !== 'shortcutHomeBtn';
    }

    function attachSidebarDismissListener() {
      if (sidebarCaptureAttached) return;
      sidebarCaptureAttached = true;

      document.addEventListener('click', function (event) {
        var btn = event.target && event.target.closest ? event.target.closest('#sidebar button') : null;
        if (btn && btn.id === 'shortcutHomeBtn') {
          restoreIntroForHome();
          return;
        }

        if (ended) return;
        if (btn && shouldDismissForSidebarClick(event.target)) {
          hideIntroImmediately();
        }
      }, true);

      window.addEventListener('arcana:home-opened', function () {
        restoreIntroForHome();
      });
    }

    function skipToActFive() {
      if (ended) return;
      clearQueued();
      intro.classList.add('skip-to-end');
      showActFive();
    }

    if (exteriorImage) {
      exteriorImage.style.setProperty('--intro-cottage-image', "url('../images/letter.jpeg.png')");
    }

    addRichnessElements();
    attachSidebarDismissListener();

    skipBtn && skipBtn.addEventListener('click', skipToActFive);
    beginBtn && beginBtn.addEventListener('click', finishIntro);

    document.body.classList.add('intro-active');

    if (prefersReducedMotion()) {
      intro.classList.add('reduced-motion', 'skip-to-end');
      showActFive();
      return;
    }

    setAct('act-1');

    // Act 2 starts at 2s
    queue(function () {
      setAct('act-2');
    }, 2400);

    // Act 3 starts after black hold (1-2s)
    queue(function () {
      setAct('act-3');
    }, 3900);

    // Act 4 reveals the letter window
    queue(function () {
      setAct('act-4');
      intro.classList.add('show-button');
      crackSeal();
      queue(revealScrollContent, 650);
    }, 6200);

    // Act 5 shows the begin button
    queue(function () {
      showActFive();
    }, 8600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runArcanaIntro);
  } else {
    runArcanaIntro();
  }
})();
