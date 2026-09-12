/* =========================================================================
   MOZAIK ACADEMY — shared gate, session, progress and analytics
   -------------------------------------------------------------------------
   Include on every page:
     <script>window.MOZAIK = { lang:'en', page:'course', id:'hidden-potential' };</script>
     <script src="../shared/academy.js" defer></script>

   Each page must contain an empty placeholder as the first element in <body>:
     <div id="gate"><div class="card" id="gateCard"></div></div>

   Everything else (welcome toast, first-steps tour, admin analytics view,
   user chip in the nav, course progress) is injected by this file.
   ========================================================================= */
(function () {
  'use strict';

  /* ======================= CONFIG — edit here ============================ */
  var SITE_PASSWORD = "Mozaik2026!";          /* shared team password        */
  var ANALYTICS_URL = "https://script.google.com/macros/s/AKfycbx1QWf6LgZ8E4O7eCJzIgdBoFHy4c27Zg31CoupOo7___boaiyichQJXrGzOjUmwG25Ww/exec";
  var NAMES = [
    "Onur Akkök",
    /* Sales — Retail, Enterprise, Lighting, Sales heads */
    "Artun Agbulut","Aysara Özenç","Bener Tanberk","Betül Albayrak","Biricik Maltepe","Burçin Karaca",
    "Candan Özcan Sayat","Ceren Şenyüz","Deniz Boyraz","Derin Zaimoğlu","Elif Duysak Tiryaki","Elif Sena Kekeç",
    "Esin Ertem","İdil Alanyalıoğlu","İrem Beliz Öztürk","İrem Su Eliaçık","Meryem Banu Nazlıca",
    "Öykü Üner","Simge Binat","Zeynep Uzel",
    /* Marketing */
    "Ceren Acar","Tuana Başak Kök","Zeynep Büyükhanlı",
    /* Operations */
    "Abdullah Yıldırım","Adem Ögdüm","Barış Öğdüm","Burak Kat","Burcu Özçelik","Caner Doğru","Davut Koncaoğlu",
    "Elmas Çaykara Yılmaz","Erdinç Öğdüm","Erhan Aydın","Fahri Aydın","Fatma Öztürk","Fulya Yıldırım","Güldem Baykara",
    "Hatice Nur Selçuk","Hilal Kaban","Hüseyin Emre Aydın","İsa Tümay","Kübra Kocaman","Melek Aydemir","Metin Ögdüm",
    "Nermin Şenel","Özlem Lambacı Taner","Pervin Bilgin","Sebahattin Karagöz","Serhat Öğdüm","Seval Güneş",
    "Sima Giray Alkan","Süreyya Kurt","Şerife Keskin","Zeynep Hürcan","Zufar Urayev",
    /* Admin */
    "Doğan Balamir Nazlıca"
  ];
  var ADMINS = ["Doğan Balamir Nazlıca"];     /* can open the Analytics view */
  /* ======================================================================= */

  var P = window.MOZAIK || {};
  var LANG = P.lang === 'tr' ? 'tr' : 'en';
  var PAGE = P.page || 'hub';                 /* 'hub' | 'course'            */
  var COURSE = P.id || null;                  /* course folder slug          */

  /* ------------------------------- strings ------------------------------- */
  var STR = {
    en: {
      other: 'tr.html', otherLang: 'tr', otherLabel: 'Türkçe',
      signin: 'Sign in', hint: 'Select your name and enter the team password to continue.',
      yourName: 'Your name', choose: 'Choose your name…', password: 'Password',
      passHint: 'Team password', enter: 'Enter Academy →',
      errName: 'Please select your name.', errPass: 'Incorrect password. Please try again.',
      welcome: 'Welcome, ', signout: 'Sign out', analytics: 'Analytics',
      skip: 'Skip', next: 'Next →', start: 'Start exploring →',
      aTitle: 'Usage Analytics', aSub: 'Mozaik Academy · admin view',
      aRefresh: '↻ Refresh', aClose: 'Close ✕',
      kSignins: 'Total sign-ins', kPeople: 'People', kTime: 'Total time', kAvg: 'Avg session',
      aLoading: 'Loading…', aNoCfg: 'Analytics endpoint not configured.',
      aErr: 'Could not load data — check your connection and hit Refresh.',
      aPer: 'Per person — ', aTotal: ' total', aNone: 'No usage recorded yet.',
      thName: 'Name', thSign: 'Sign-ins', thTime: 'Total time', thLast: 'Last seen',
      thCourse: 'Training', thViews: 'Opens',
      aByCourse: 'By training',
      doneQ: 'Finished this training?',
      doneHint: 'Mark it complete so it shows as done on your Academy home.',
      doneBtn: 'Mark as complete', doneOn: 'Completed on ', undo: 'Mark as not complete',
      stNew: 'Not started', stOpen: 'In progress', stDone: 'Completed',
      goNew: 'Start', goOpen: 'Continue', goDone: 'Review', soon: 'Coming soon',
      tour: [
        { n: 'Welcome', t: 'Welcome, {name} 👋',
          b: 'This is Mozaik Academy — our internal training library. Each card below is a self-contained training you can take at your own pace, in English or Turkish.' },
        { n: 'Step 1 of 3', t: 'Pick a training',
          b: 'Open any card to start. Your place is remembered, so you can stop halfway and come back later without losing where you were.' },
        { n: 'Step 2 of 3', t: 'Mark it complete',
          b: 'At the end of each training there is a “Mark as complete” button. Use it and the card here turns green, so you can see at a glance what is left.' },
        { n: 'Step 3 of 3', t: 'New trainings arrive here',
          b: 'Every new session we build shows up on this page. Use “Sign out” in the top bar when you are done. Ready?' }
      ]
    },
    tr: {
      other: 'index.html', otherLang: 'en', otherLabel: 'English',
      signin: 'Giriş yap', hint: 'Devam etmek için adını seç ve ekip şifresini gir.',
      yourName: 'Adınız', choose: 'Adını seç…', password: 'Şifre',
      passHint: 'Ekip şifresi', enter: "Academy'ye Gir →",
      errName: 'Lütfen adını seç.', errPass: 'Şifre hatalı. Lütfen tekrar dene.',
      welcome: 'Hoş geldin, ', signout: 'Çıkış yap', analytics: 'Analitik',
      skip: 'Atla', next: 'İleri →', start: 'Keşfetmeye başla →',
      aTitle: 'Kullanım Analitiği', aSub: 'Mozaik Academy · yönetici görünümü',
      aRefresh: '↻ Yenile', aClose: 'Kapat ✕',
      kSignins: 'Toplam giriş', kPeople: 'Kişi', kTime: 'Toplam süre', kAvg: 'Ort. oturum',
      aLoading: 'Yükleniyor…', aNoCfg: 'Analitik adresi tanımlı değil.',
      aErr: 'Veri yüklenemedi — bağlantını kontrol edip Yenile’ye bas.',
      aPer: 'Kişi bazında — ', aTotal: ' kişi', aNone: 'Henüz kullanım kaydı yok.',
      thName: 'İsim', thSign: 'Giriş', thTime: 'Toplam süre', thLast: 'Son görülme',
      thCourse: 'Eğitim', thViews: 'Açılma',
      aByCourse: 'Eğitim bazında',
      doneQ: 'Bu eğitimi bitirdin mi?',
      doneHint: 'Tamamlandı olarak işaretle; Academy ana sayfanda tamamlandı görünsün.',
      doneBtn: 'Tamamlandı olarak işaretle', doneOn: 'Tamamlanma: ', undo: 'Tamamlanmadı olarak işaretle',
      stNew: 'Başlanmadı', stOpen: 'Devam ediyor', stDone: 'Tamamlandı',
      goNew: 'Başla', goOpen: 'Devam et', goDone: 'Tekrar bak', soon: 'Yakında',
      tour: [
        { n: 'Hoş geldiniz', t: 'Hoş geldin, {name} 👋',
          b: 'Burası Mozaik Academy — iç eğitim kütüphanemiz. Aşağıdaki her kart, kendi hızında ilerleyebileceğin bağımsız bir eğitim; İngilizce ya da Türkçe.' },
        { n: 'Adım 1 / 3', t: 'Bir eğitim seç',
          b: 'Başlamak için herhangi bir kartı aç. Kaldığın yer hatırlanır; yarıda bırakıp sonra devam edebilirsin.' },
        { n: 'Adım 2 / 3', t: 'Tamamlandı olarak işaretle',
          b: 'Her eğitimin sonunda “Tamamlandı olarak işaretle” düğmesi var. Kullandığında buradaki kart yeşile döner; geriye ne kaldığını bir bakışta görürsün.' },
        { n: 'Adım 3 / 3', t: 'Yeni eğitimler burada',
          b: 'Hazırladığımız her yeni eğitim bu sayfada belirir. Bitirdiğinde üst çubuktaki “Çıkış yap”ı kullan. Hazır mısın?' }
      ]
    }
  };
  var T = STR[LANG];

  /* ------------------------------ helpers -------------------------------- */
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) { for (var k in attrs) { n.setAttribute(k, attrs[k]); } }
    if (html != null) { n.innerHTML = html; }
    return n;
  }
  function firstName(n) { return (n || '').trim().split(/\s+/)[0]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
  function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }

  /* --------------------------- progress store ---------------------------- */
  var PKEY = 'mozaik_progress_v1';
  function allProgress() { try { return JSON.parse(ls(PKEY) || '{}') || {}; } catch (e) { return {}; } }
  function progressFor(name) { var a = allProgress(); return a[name] || {}; }
  function setProgress(name, course, status) {
    if (!name || !course) return;
    var a = allProgress();
    if (!a[name]) a[name] = {};
    var cur = a[name][course];
    if (cur && cur.s === 'done' && status === 'open') return;   /* never downgrade */
    a[name][course] = { s: status, t: new Date().toISOString() };
    lsSet(PKEY, JSON.stringify(a));
  }
  function clearProgress(name, course) {
    var a = allProgress();
    if (a[name] && a[name][course]) { delete a[name][course]; lsSet(PKEY, JSON.stringify(a)); }
  }

  /* ------------------------------ injection ------------------------------ */
  var gate = document.getElementById('gate');
  if (!gate) { gate = el('div', { id: 'gate' }); document.body.insertBefore(gate, document.body.firstChild); }
  var card = document.getElementById('gateCard');
  if (!card) { card = el('div', { class: 'card', id: 'gateCard' }); gate.appendChild(card); }
  card.innerHTML =
    '<div class="glogo"><div class="chip">M</div><div class="wm">Mozaik <span>Academy</span></div></div>' +
    '<a class="langswitch gatelang" href="' + T.other + '" data-setlang="' + T.otherLang + '">' + T.otherLabel + '</a>' +
    '<h2>' + T.signin + '</h2>' +
    '<p class="hint">' + T.hint + '</p>' +
    '<label for="gateName">' + T.yourName + '</label>' +
    '<select id="gateName"><option value="" disabled selected>' + T.choose + '</option></select>' +
    '<label for="gatePass">' + T.password + '</label>' +
    '<input id="gatePass" type="password" autocomplete="off" placeholder="' + T.passHint + '" />' +
    '<div class="err" id="gateErr"></div>' +
    '<button id="gateBtn">' + T.enter + '</button>';

  document.body.appendChild(el('div', { id: 'welcome', role: 'status', 'aria-live': 'polite' }));
  document.body.appendChild(el('div', { id: 'tour', hidden: 'hidden' },
    '<div class="tcard">' +
    '<div class="tnum" id="tourNum"></div><h3 id="tourTitle"></h3><p id="tourBody"></p>' +
    '<div class="trow"><div class="dots" id="tourDots"></div>' +
    '<div class="tbtns"><button class="skip" id="tourSkip">' + T.skip + '</button>' +
    '<button class="next" id="tourNext">' + T.next + '</button></div></div></div>'));
  document.body.appendChild(el('div', { id: 'analytics' },
    '<div class="abar"><div><div class="atitle">' + T.aTitle + '</div><div class="asub">' + T.aSub + '</div></div>' +
    '<div class="aspacer"></div><button class="abtn" id="aRefresh">' + T.aRefresh + '</button>' +
    '<button class="abtn aclose" id="aClose">' + T.aClose + '</button></div>' +
    '<div class="awrap"><div class="kpis">' +
    '<div class="kpi"><div class="k">' + T.kSignins + '</div><div class="v" id="kSignins">–</div></div>' +
    '<div class="kpi"><div class="k">' + T.kPeople + '</div><div class="v" id="kPeople">–</div></div>' +
    '<div class="kpi"><div class="k">' + T.kTime + '</div><div class="v" id="kTime">–</div></div>' +
    '<div class="kpi"><div class="k">' + T.kAvg + '</div><div class="v" id="kAvg">–</div></div></div>' +
    '<div id="aCourseWrap" style="display:none"><h4>' + T.aByCourse + '</h4>' +
    '<table><thead><tr><th>' + T.thCourse + '</th><th>' + T.thViews + '</th><th></th></tr></thead>' +
    '<tbody id="aCourseBody"></tbody></table></div>' +
    '<h4 id="aStatus">' + T.aLoading + '</h4>' +
    '<table id="aTable" style="display:none"><thead><tr><th>' + T.thName + '</th><th>' + T.thSign + '</th>' +
    '<th>' + T.thTime + '</th><th>' + T.thLast + '</th><th></th></tr></thead><tbody id="aBody"></tbody></table></div>'));

  var sel = document.getElementById('gateName'),
    pass = document.getElementById('gatePass'),
    err = document.getElementById('gateErr'),
    btn = document.getElementById('gateBtn'),
    welcome = document.getElementById('welcome'),
    tour = document.getElementById('tour'),
    tourNum = document.getElementById('tourNum'),
    tourTitle = document.getElementById('tourTitle'),
    tourBody = document.getElementById('tourBody'),
    tourDots = document.getElementById('tourDots'),
    tourNext = document.getElementById('tourNext'),
    tourSkip = document.getElementById('tourSkip'),
    analytics = document.getElementById('analytics');
  var tourIdx = 0, tourSteps = [];

  NAMES.slice().sort(function (a, b) { return a.localeCompare(b, 'tr'); }).forEach(function (n) {
    var o = document.createElement('option'); o.value = n; o.textContent = n; sel.appendChild(o);
  });

  /* ------------------------------ analytics ------------------------------ */
  var sessionUser = null, sessionStart = null, ended = false;

  function send(event, extra) {
    if (!ANALYTICS_URL || ANALYTICS_URL.indexOf('__') === 0) return;
    var payload = { name: sessionUser, event: event, ts: new Date().toISOString(), page: COURSE || 'home' };
    if (extra) { for (var k in extra) { payload[k] = extra[k]; } }
    try {
      var blob = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=UTF-8' });
      if (navigator.sendBeacon) { navigator.sendBeacon(ANALYTICS_URL, blob); }
      else { fetch(ANALYTICS_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) }); }
    } catch (e) { }
  }
  function endSession() {
    if (ended || !sessionUser || !sessionStart) return;
    ended = true;
    send('session_end', { duration_seconds: Math.round((Date.now() - sessionStart) / 1000) });
  }
  function fmtDur(sec) {
    sec = Math.round(sec || 0);
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    if (h > 0) return h + 'h ' + m + 'm';
    if (m > 0) return m + 'm ' + s + 's';
    return s + 's';
  }
  function openAnalytics() { analytics.classList.add('open'); document.body.classList.add('locked'); loadAnalytics(); }
  function closeAnalytics() { analytics.classList.remove('open'); document.body.classList.remove('locked'); }
  function loadAnalytics() {
    var status = document.getElementById('aStatus');
    status.textContent = T.aLoading;
    document.getElementById('aTable').style.display = 'none';
    if (!ANALYTICS_URL || ANALYTICS_URL.indexOf('__') === 0) { status.textContent = T.aNoCfg; return; }
    var s = document.createElement('script');
    window.__mozAnalytics = function (data) { renderAnalytics(data); try { document.head.removeChild(s); } catch (e) { } };
    s.onerror = function () { status.textContent = T.aErr; };
    s.src = ANALYTICS_URL + '?callback=__mozAnalytics&t=' + Date.now();
    document.head.appendChild(s);
  }
  function renderAnalytics(data) {
    var rows = (data && data.rows) || [];
    var logins = rows.filter(function (r) { return r.event === 'login'; });
    var ends = rows.filter(function (r) { return r.event === 'session_end'; });
    var totalSec = ends.reduce(function (a, r) { return a + (Number(r.duration) || 0); }, 0);
    var people = {}, courses = {};
    rows.forEach(function (r) {
      if (r.page) { courses[r.page] = (courses[r.page] || 0) + 1; }
      if (!r.name) return;
      var p = people[r.name] || (people[r.name] = { signins: 0, sec: 0, last: null });
      if (r.event === 'login') p.signins++;
      if (r.event === 'session_end') p.sec += Number(r.duration) || 0;
      var t = new Date(r.ts).getTime();
      if (!p.last || t > p.last) p.last = t;
    });
    var names = Object.keys(people);
    document.getElementById('kSignins').textContent = logins.length;
    document.getElementById('kPeople').textContent = names.length;
    document.getElementById('kTime').textContent = fmtDur(totalSec);
    document.getElementById('kAvg').textContent = ends.length ? fmtDur(totalSec / ends.length) : '–';

    var ck = Object.keys(courses);
    var cw = document.getElementById('aCourseWrap');
    if (ck.length) {
      var cmax = ck.reduce(function (m, k) { return Math.max(m, courses[k]); }, 0) || 1;
      var cb = document.getElementById('aCourseBody'); cb.innerHTML = '';
      ck.sort(function (a, b) { return courses[b] - courses[a]; }).forEach(function (k) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + esc(k) + '</td><td>' + courses[k] + '</td>' +
          '<td style="width:160px"><div class="bar" style="width:' + Math.max(6, Math.round(courses[k] / cmax * 100)) + '%"></div></td>';
        cb.appendChild(tr);
      });
      cw.style.display = '';
    } else { cw.style.display = 'none'; }

    var arr = names.map(function (n) { return { name: n, s: people[n].signins, sec: people[n].sec, last: people[n].last }; });
    arr.sort(function (a, b) { return b.sec - a.sec; });
    var max = arr.reduce(function (m, x) { return Math.max(m, x.sec); }, 0) || 1;
    var body = document.getElementById('aBody'); body.innerHTML = '';
    arr.forEach(function (x) {
      var tr = document.createElement('tr');
      var last = x.last ? new Date(x.last).toLocaleString() : '—';
      var pct = Math.max(6, Math.round(x.sec / max * 100));
      tr.innerHTML = '<td>' + esc(x.name) + '</td><td>' + x.s + '</td><td>' + fmtDur(x.sec) + '</td>' +
        '<td class="amuted">' + last + '</td><td style="width:130px"><div class="bar" style="width:' + pct + '%"></div></td>';
      body.appendChild(tr);
    });
    document.getElementById('aStatus').textContent = arr.length ? (T.aPer + arr.length + T.aTotal) : T.aNone;
    document.getElementById('aTable').style.display = arr.length ? 'table' : 'none';
  }
  document.getElementById('aClose').addEventListener('click', closeAnalytics);
  document.getElementById('aRefresh').addEventListener('click', loadAnalytics);

  /* ------------------------- language preference ------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('.langswitch'), function (a) {
    a.addEventListener('click', function () { lsSet('mozaik_lang', a.getAttribute('data-setlang')); });
  });

  /* --------------------------------- UI ---------------------------------- */
  function isAdmin(name) { return ADMINS.indexOf(name) >= 0; }

  function addUserChip(name) {
    var nav = document.querySelector('nav.top .inner');
    if (!nav || document.getElementById('userChip')) return;
    var chip = el('div', { class: 'userchip', id: 'userChip' });
    var adminLink = isAdmin(name) ? '<a id="openAnalytics">' + T.analytics + '</a> · ' : '';
    chip.innerHTML = adminLink + '<span class="lbl"><b>' + esc(firstName(name)) + '</b> · </span><a id="signout">' + T.signout + '</a>';
    nav.appendChild(chip);
    document.getElementById('signout').addEventListener('click', function () {
      endSession();
      try { sessionStorage.removeItem('mozaik_user'); } catch (e) { }
      location.reload();
    });
    var oa = document.getElementById('openAnalytics');
    if (oa) { oa.addEventListener('click', openAnalytics); }
  }

  function showWelcome(name) {
    welcome.textContent = T.welcome + firstName(name) + ' 👋';
    welcome.classList.add('show');
    setTimeout(function () { welcome.classList.remove('show'); }, 4200);
  }

  /* --------------------------------- tour -------------------------------- */
  var TOUR_KEY = 'mozaik_tour_seen_' + (PAGE === 'course' ? (COURSE || 'course') : 'hub');
  function buildTour(name) {
    var steps = (P.tour && P.tour.length ? P.tour : T.tour);
    tourSteps = steps.map(function (s) {
      return { n: s.n, t: String(s.t).replace('{name}', firstName(name)), b: s.b };
    });
  }
  function renderTour() {
    var s = tourSteps[tourIdx], last = tourIdx === tourSteps.length - 1;
    tourNum.textContent = s.n; tourTitle.textContent = s.t; tourBody.textContent = s.b;
    tourNext.textContent = last ? T.start : T.next;
    tourSkip.style.display = last ? 'none' : '';
    tourDots.innerHTML = '';
    for (var i = 0; i < tourSteps.length; i++) {
      var d = document.createElement('i'); if (i === tourIdx) d.className = 'on'; tourDots.appendChild(d);
    }
  }
  function startTour(name) { buildTour(name); tourIdx = 0; renderTour(); tour.hidden = false; lsSet(TOUR_KEY, '1'); }
  function closeTour() { tour.hidden = true; }
  tourNext.addEventListener('click', function () { if (tourIdx >= tourSteps.length - 1) { closeTour(); } else { tourIdx++; renderTour(); } });
  tourSkip.addEventListener('click', closeTour);

  /* ------------------------------ hub cards ------------------------------ */
  function paintHub(name) {
    var prog = progressFor(name);
    Array.prototype.forEach.call(document.querySelectorAll('.ccard[data-course]'), function (c) {
      var id = c.getAttribute('data-course');
      var st = (prog[id] && prog[id].s) || 'new';
      var pill = c.querySelector('.cstatus');
      var go = c.querySelector('.cgo');
      c.classList.remove('is-open', 'is-done');
      if (st === 'done') { c.classList.add('is-done'); if (pill) pill.textContent = T.stDone; if (go) go.textContent = T.goDone; }
      else if (st === 'open') { c.classList.add('is-open'); if (pill) pill.textContent = T.stOpen; if (go) go.textContent = T.goOpen; }
      else { if (pill) pill.textContent = T.stNew; if (go) go.textContent = T.goNew; }
    });
    Array.prototype.forEach.call(document.querySelectorAll('.ccard.soon .cstatus'), function (p) { p.textContent = T.soon; });
    var done = 0, total = 0;
    Array.prototype.forEach.call(document.querySelectorAll('.ccard[data-course]'), function (c) {
      total++; if (c.classList.contains('is-done')) done++;
    });
    var bar = document.getElementById('hubBar'), lab = document.getElementById('hubBarLabel');
    if (bar) bar.style.width = (total ? Math.round(done / total * 100) : 0) + '%';
    if (lab) lab.textContent = done + ' / ' + total;
  }

  /* --------------------------- course completion ------------------------- */
  function paintCourse(name) {
    var box = document.getElementById('completeBox');
    if (!box) return;
    var prog = progressFor(name);
    var rec = prog[COURSE];
    if (rec && rec.s === 'done') {
      var d = new Date(rec.t);
      box.className = 'complete is-done';
      box.innerHTML = '<div class="ctext"><b>✓ ' + T.doneOn + (isNaN(d) ? '' : d.toLocaleDateString()) + '</b></div>' +
        '<button class="cundo" id="undoDone">' + T.undo + '</button>';
      document.getElementById('undoDone').addEventListener('click', function () {
        clearProgress(name, COURSE); setProgress(name, COURSE, 'open'); paintCourse(name);
      });
    } else {
      box.className = 'complete';
      box.innerHTML = '<div class="ctext"><b>' + T.doneQ + '</b><span>' + T.doneHint + '</span></div>' +
        '<button class="cbtn" id="markDone">' + T.doneBtn + '</button>';
      document.getElementById('markDone').addEventListener('click', function () {
        setProgress(name, COURSE, 'done');
        send('course_complete', { course: COURSE });
        paintCourse(name);
      });
    }
  }

  /* ------------------------------- session -------------------------------- */
  function startSession(name, isFresh) {
    sessionUser = name; sessionStart = Date.now(); ended = false;
    document.body.classList.remove('locked');
    gate.hidden = true;
    addUserChip(name);
    if (PAGE === 'course' && COURSE) { setProgress(name, COURSE, 'open'); }
    paintHub(name);
    paintCourse(name);
    if (isFresh) { send('login', {}); }
    var hasTour = (P.tour && P.tour.length) || PAGE === 'hub';
    if (hasTour && ls(TOUR_KEY) !== '1') { startTour(name); } else { showWelcome(name); }
    window.addEventListener('pagehide', endSession);
    window.addEventListener('beforeunload', endSession);
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') endSession(); });
  }

  function tryLogin() {
    err.textContent = '';
    var name = sel.value;
    if (!name) { err.textContent = T.errName; return; }
    if (pass.value !== SITE_PASSWORD) { err.textContent = T.errPass; pass.value = ''; pass.focus(); return; }
    try { sessionStorage.setItem('mozaik_user', name); } catch (e) { }
    startSession(name, true);
  }
  btn.addEventListener('click', tryLogin);
  pass.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); tryLogin(); } });

  var existing = null; try { existing = sessionStorage.getItem('mozaik_user'); } catch (e) { }
  if (existing && NAMES.indexOf(existing) >= 0) {
    startSession(existing, false);
  } else {
    document.body.classList.add('locked');
    setTimeout(function () { sel.focus(); }, 80);
  }
})();
