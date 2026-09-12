/* =========================================================================
   MOZAIK ACADEMY — course page behaviour
   mobile menu · sliding table of contents · scroll progress · reveals
   ========================================================================= */
  (function(){
    var btn = document.getElementById('menuBtn');
    var menu = document.getElementById('mobileMenu');
    if(!btn || !menu) return;
    function close(){ btn.classList.remove('open'); menu.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
    function toggle(){
      var open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', toggle);
    menu.addEventListener('click', function(e){ if(e.target.tagName === 'A') close(); });
    window.addEventListener('resize', function(){ if(window.innerWidth > 920) close(); });
  })();
  (function(){
    var toc = document.getElementById('toc');
    if(!toc) return;
    var chev = document.createElement('button');
    chev.className = 'toc-next'; chev.id = 'tocNext';
    chev.setAttribute('aria-label', 'Show more concepts');
    chev.innerHTML = '›';
    toc.insertAdjacentElement('afterend', chev);
    chev.addEventListener('click', function(){ toc.scrollBy({ left: 180, behavior: 'smooth' }); });
    function update(){
      var max = toc.scrollWidth - toc.clientWidth;
      var atStart = toc.scrollLeft <= 2;
      var atEnd = toc.scrollLeft >= max - 2;
      var mask;
      if (max <= 2) { mask = 'none'; }
      else {
        var l = atStart ? '#000 0' : 'transparent 0, #000 20px';
        var r = atEnd ? '#000 100%' : '#000 calc(100% - 28px), transparent 100%';
        mask = 'linear-gradient(to right, ' + l + ', ' + r + ')';
      }
      toc.style.webkitMaskImage = mask;
      toc.style.maskImage = mask;
      chev.classList.toggle('show', max > 2 && !atEnd);
    }
    toc.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    setTimeout(update, 300);
  })();

  // Reveals are an ENHANCEMENT. Content is visible by default; we only arm the
  // hidden-start animation state (html.anim-on) once we've confirmed animation
  // frames actually run. If rAF is throttled (capture/background), we never arm,
  // so all content stays visible and verifiable.
  (function(){
    var progress = document.getElementById('progress');
    var reveals  = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    var cards    = Array.prototype.slice.call(document.querySelectorAll('article.card-c'));
    var tocLinks = Array.prototype.slice.call(document.querySelectorAll('#toc a, nav.top .modtab'));
    var pending  = reveals.slice();
    var lastActive = null;

    function scroller(){ return document.scrollingElement || document.documentElement; }

    function tick(){
      var h = scroller();
      var vh = window.innerHeight || h.clientHeight;

      var max = h.scrollHeight - h.clientHeight;
      var top = h.scrollTop || window.pageYOffset || 0;
      progress.style.width = (max > 0 ? Math.min(100, top / max * 100) : 0) + '%';

      for (var i = pending.length - 1; i >= 0; i--){
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > 0){
          pending[i].classList.add('in');
          pending.splice(i, 1);
        }
      }

      var active = null;
      for (var j = 0; j < cards.length; j++){
        if (cards[j].getBoundingClientRect().top < vh * 0.45) active = cards[j];
      }
      if (active && active !== lastActive){
        lastActive = active;
        var id = '#' + active.getAttribute('id');
        // bonus-module cards (v1..v9) light up the single module tab
        var mod = /^#v\d+$/.test(id) ? '#part5' : null;
        for (var k = 0; k < tocLinks.length; k++){
          var href = tocLinks[k].getAttribute('href');
          tocLinks[k].classList.toggle('active', href === id || (mod !== null && href === mod));
        }
      }
      requestAnimationFrame(tick);
    }

    // Confirm frames run before arming the hidden-start state.
    var armed = false;
    function arm(){
      if (armed) return; armed = true;
      var vh = window.innerHeight;
      // anything already in view stays revealed (no flash)
      reveals.forEach(function(el){
        if (el.getBoundingClientRect().top < vh * 0.9){ el.classList.add('in'); }
      });
      document.documentElement.classList.add('anim-on');
      Array.prototype.forEach.call(document.querySelectorAll('.count'), function(el){
        var target = parseInt(el.textContent, 10);
        if (isNaN(target)) return;
        var start = null, dur = 1100;
        el.textContent = '0';
        requestAnimationFrame(function step(ts){
          if (start === null) start = ts;
          var p = Math.min(1, (ts - start) / dur);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
          if (p < 1) requestAnimationFrame(step); else el.textContent = String(target);
        });
      });
      requestAnimationFrame(tick);
    }
    // double-rAF: only fires if the frame clock is actually advancing
    requestAnimationFrame(function(){ requestAnimationFrame(arm); });
  })();
