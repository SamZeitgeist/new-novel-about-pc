/* ============================================================
   Собери мне ПК, Кей — движок визуальной новеллы.
   Без модулей и fetch: работает по двойному щелчку (file://).
   ============================================================ */
/* global CATEGORIES, PARTS, PRESETS, STORY, ENDINGS,
          CATEGORIES_LAPTOP, PARTS_LAPTOP, PRESETS_LAPTOP, STORY_LAPTOP, ENDINGS_LAPTOP */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const LS_KEY = 'jirai-pc-vn-v1';
  const BG = {
    room: 'assets/bg-room.png',
    street: 'assets/bg-street.png',
    shop: 'assets/bg-shop.png',
    desk: 'assets/bg-desk.png'
  };
  const BG_LAPTOP = {
    room: 'assets/bg-room.png',
    street: 'assets/bg-street.png',
    shop: 'assets/bg-shop.png',
    desk: 'assets/bg-kitchen-laptop.png'
  };
  const PLAN_LABEL = { cheap: 'Минималка', mid: 'Середина', lux: 'В кредит' };

  let mode = 'pc';
  let CASH = 47300;
  let currentStory = window.STORY;
  let currentEndings = window.ENDINGS;
  let CATS = window.CATEGORIES;
  let ITEMS = window.PARTS;
  let PRE = window.PRESETS;

  function setMode(m) {
    mode = m === 'laptop' ? 'laptop' : 'pc';
    state.mode = mode;
    window.__VN_MODE = mode;
    if (mode === 'laptop' && window.STORY_LAPTOP) {
      CASH = (window.LAPTOP_CONFIG && window.LAPTOP_CONFIG.cash) || 50000;
      currentStory = window.STORY_LAPTOP;
      currentEndings = window.ENDINGS_LAPTOP || window.ENDINGS;
      CATS = window.CATEGORIES_LAPTOP || window.CATEGORIES;
      ITEMS = window.PARTS_LAPTOP || window.PARTS;
      PRE = window.PRESETS_LAPTOP || window.PRESETS;
    } else {
      mode = 'pc';
      state.mode = 'pc';
      window.__VN_MODE = 'pc';
      CASH = 47300;
      currentStory = window.STORY;
      currentEndings = window.ENDINGS;
      CATS = window.CATEGORIES;
      ITEMS = window.PARTS;
      PRE = window.PRESETS;
    }
  }

  function bgFor(name) {
    const map = mode === 'laptop' ? BG_LAPTOP : BG;
    return map[name] || BG[name];
  }

  const money = n => Math.round(n).toLocaleString('ru-RU') + ' ₽';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  /* ---------------- сохранение ---------------- */
  const saved = { unlocked: [] };
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.unlocked)) {
        saved.unlocked = parsed.unlocked.filter(k => ['cheap', 'mid', 'lux'].indexOf(k) !== -1);
      }
    }
  } catch (e) { /* приватный режим — играем без сохранения */ }

  function persist() {
    try { localStorage.setItem(LS_KEY, JSON.stringify({ unlocked: saved.unlocked })); } catch (e) {}
  }

  /* ---------------- состояние ---------------- */
  const state = {
    build: {},
    plan: 'mid',
    scene: null,
    lines: [],
    index: 0,
    typing: false,
    full: '',
    timer: null,
    choicesOpen: false,
    bgName: null,
    chapter: null
  };

  const part = (cat, id) => (ITEMS[cat] || []).find(p => p.id === id) || null;

  function show(id) {
    $$('.screen').forEach(s => s.classList.toggle('is-active', s.id === 'screen-' + id));
  }

  const SPRITES = {
    neutral: 'assets/sprite-1.png',
    happy:   'assets/sprite-2.png',
    sad:     'assets/sprite-3.png',
    wow:     'assets/sprite-4.png',
    soft:    'assets/sprite-5.png',
    angry:   'assets/sprite-6.png',
    focus:   'assets/sprite-7.png'
  };
  const ALICE_SPRITES = {
    neutral: 'assets/alice-1.png',
    smile:   'assets/alice-2.png'
  };

  function setExp(exp) {
    const e = exp || 'neutral';
    const img = $('#sprite');
    const fb = $('#sprite-fallback');
    const src = SPRITES[e] || '';
    if (img && src) {
      if (img.getAttribute('src') !== src) img.src = src;
      img.setAttribute('data-exp', e);
      img.style.display = '';
      if (fb) fb.style.display = 'none';
    } else {
      if (img) img.style.display = 'none';
      if (fb) {
        fb.style.display = '';
        fb.setAttribute('data-exp', e);
      } else if (img) {
        img.setAttribute('data-exp', e);
      }
    }
  }

  function setAlice(exp) {
    const wrap = $('#sprite-wrap');
    const aw = $('#alice-wrap');
    const img = $('#sprite-alice');
    if (!wrap || !aw || !img) return;
    if (!exp) {
      aw.hidden = true;
      wrap.classList.remove('has-alice');
      return;
    }
    const e = exp === 'happy' ? 'smile' : exp;
    const src = ALICE_SPRITES[e] || ALICE_SPRITES.neutral;
    if (img.getAttribute('src') !== src) img.src = src;
    img.setAttribute('data-exp', e);
    aw.hidden = false;
    wrap.classList.add('has-alice');
  }

  /* ---------------- фон ---------------- */
  function setBg(name) {
    const url = bgFor(name);
    if (!url || state.bgName === name) return;
    state.bgName = name;
    const a = $('#bg-a');
    const b = $('#bg-b');
    const cur = a.classList.contains('is-on') ? a : (b.classList.contains('is-on') ? b : null);
    const next = cur === a ? b : a;
    next.style.backgroundImage = 'url("' + url + '")';
    next.classList.add('is-on');
    if (cur) cur.classList.remove('is-on');
  }

  /* ---------------- плашка главы ---------------- */
  function setChapter(text) {
    const el = $('#chapter-tag');
    if (!el) return;
    if (!text) {
      el.classList.remove('is-on');
      el.textContent = '';
      state.chapter = null;
      return;
    }
    if (state.chapter === text) return;
    state.chapter = text;
    el.textContent = text;
    el.classList.remove('is-on');
    void el.offsetWidth;
    el.classList.add('is-on');
  }

  /* ---------------- диалог ---------------- */

  function setNextVisible(v) {
    $('#btn-next').style.visibility = v ? 'visible' : 'hidden';
  }

  function setSpeaker(who) {
    const np = $('#nameplate');
    const dlg = $('#dialogue');
    if (who) {
      np.textContent = who;
      np.hidden = false;
      dlg.classList.remove('is-narration');
      dlg.setAttribute('data-who', who === 'Кей' ? 'key' : who === 'Алиса' ? 'alice' : 'other');
    } else {
      np.hidden = true;
      dlg.classList.add('is-narration');
      dlg.setAttribute('data-who', 'narrator');
    }
  }

  function hideChoices() {
    const box = $('#choices');
    box.classList.remove('is-on');
    box.innerHTML = '';
  }

  function startScene(id) {
    const scene = currentStory.scenes[id];
    if (!scene) return;
    if (state.timer) clearInterval(state.timer);
    state.timer = null;
    state.typing = false;
    state.scene = scene;
    state.lines = (scene.lines || []).filter(l => typeof l.when !== 'function' || l.when(state));
    state.index = 0;
    state.choicesOpen = false;
    hideChoices();
    if (scene.bg) setBg(scene.bg);
    setChapter(scene.chapter || null);
    setExp(scene.sprite || 'neutral');
    setAlice(scene.alice || null);
    show('game');
    renderLine(0);
  }

  function renderLine(i) {
    const line = state.lines[i];
    if (!line) { finishScene(); return; }
    state.index = i;
    setSpeaker(line.who);
    if (line.exp) setExp(line.exp);
    if (line.aexp) setAlice(line.aexp);
    typeText(line.text || '');
  }

  function typeText(text) {
    if (state.timer) clearInterval(state.timer);
    const el = $('#text');
    state.full = text;
    state.typing = true;
    el.textContent = '';
    setNextVisible(false);

    if (!text.length) {
      state.typing = false;
      afterLine();
      return;
    }

    let i = 0;
    state.timer = setInterval(() => {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(state.timer);
        state.timer = null;
        state.typing = false;
        afterLine();
      }
    }, 16);
  }

  function finishTyping() {
    if (!state.typing) return;
    if (state.timer) clearInterval(state.timer);
    state.timer = null;
    state.typing = false;
    $('#text').textContent = state.full;
    afterLine();
  }

  function afterLine() {
    const scene = state.scene;
    if (!scene) return;
    const last = state.index >= state.lines.length - 1;

    if (last && scene.choices && scene.choices.length) {
      setNextVisible(false);
      renderChoices(scene.choices);
      return;
    }

    setNextVisible(true);
  }

  function advance() {
    if (state.choicesOpen) return;
    if (state.typing) { finishTyping(); return; }
    if (state.index < state.lines.length - 1) {
      renderLine(state.index + 1);
      return;
    }
    finishScene();
  }

  function finishScene() {
    const scene = state.scene;
    if (!scene) return;
    if (scene.choices && scene.choices.length) {
      renderChoices(scene.choices);
      return;
    }
    if (scene.to === 'ending') { showEnding(); return; }
    if (scene.to === 'builder') { openBuilder(); return; }
    if (scene.to) startScene(scene.to);
  }

  function renderChoices(choices) {
    const box = $('#choices');
    box.innerHTML = '';
    state.choicesOpen = true;
    choices.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice';
      btn.innerHTML = '<span class="choice-mark">▸</span><span>' + esc(c.text) + '</span>';
      btn.addEventListener('click', () => {
        state.choicesOpen = false;
        hideChoices();
        if (c.plan) applyPlan(c.plan);
        if (c.to === 'builder') openBuilder();
        else if (c.to === 'ending') showEnding();
        else if (c.to) startScene(c.to);
      });
      box.appendChild(btn);
    });
    box.classList.add('is-on');
  }

  /* ---------------- пресеты ---------------- */
  function applyPlan(plan) {
    if (!PRE || !PRE[plan]) return;
    state.plan = plan;
    state.build = Object.assign({}, PRE[plan].build);
  }

  /* ---------------- конфигуратор ---------------- */
  let activeCat = 'cpu';

  function openBuilder() {
    if (!activeCat || !CATS.some(c => c.id === activeCat)) {
      activeCat = (CATS && CATS[0]) ? CATS[0].id : 'cpu';
    }
    const cashEl = document.querySelector('.b-cash');
    if (cashEl) cashEl.textContent = 'Наличные: ' + money(CASH);
    renderBuilder();
    show('builder');
  }

  function renderBuilder() {
    renderPlans();
    renderLaptopLinks();
    renderCats();
    renderParts();
    updateMoney();
    renderIssues();
  }

  function renderPlans() {
    const box = $('#b-plans');
    box.innerHTML = '';
    const keys = (PRE && Object.keys(PRE).length) ? Object.keys(PRE) : Object.keys(PLAN_LABEL);
    keys.forEach(key => {
      if (!PLAN_LABEL[key]) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'plan' + (state.plan === key ? ' is-active' : '');
      btn.textContent = PLAN_LABEL[key];
      btn.title = 'Загрузить набор «' + PLAN_LABEL[key] + '»';
      btn.addEventListener('click', () => { applyPlan(key); renderBuilder(); });
      box.appendChild(btn);
    });
  }

  function renderCats() {
    const nav = $('#b-cats');
    const scroll = nav.scrollLeft;
    nav.innerHTML = '';
    CATS.forEach(cat => {
      const picked = part(cat.id, state.build[cat.id]);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cat'
        + (activeCat === cat.id ? ' is-active' : '')
        + (picked ? ' is-done' : ' is-empty');
      btn.innerHTML =
        '<span class="cat-top"><span class="cat-name">' + esc(cat.name) + '</span>'
        + (picked ? '<span class="cat-price">' + money(picked.price) + '</span>' : '')
        + '</span><span class="cat-pick">' + esc(picked ? picked.short : cat.hint) + '</span>';
      btn.addEventListener('click', () => {
        activeCat = cat.id;
        renderCats();
        renderParts();
      });
      nav.appendChild(btn);
    });
    nav.scrollLeft = scroll;
  }

  function dnsProductUrl(item) {
    // Точные карточки DNS для товаров, проверенных вручную.
    const exact = {
      // ПК: точные карточки товаров, уже проверенные в DNS
      'r5-5500': 'https://www.dns-shop.ru/product/2779e1d6afeced20/processor-amd-ryzen-5-5500-oem/',
      'i5-12400f': 'https://www.dns-shop.ru/product/0a2114a7fcc9ed20/processor-intel-core-i5-12400f-oem/',
      'rtx5060': 'https://www.dns-shop.ru/product/701949711f27d9cb/videokarta-palit-geforce-rtx-5060-dual-ne75060019p1-gb2063d/',
      // Ноутбук: конкретные SO-DIMM модули и M.2 SSD
      'ram-8': 'https://www.dns-shop.ru/product/20a03f627cd0ed20/operativnaa-pamat-ddr4-sodimm-apacer-es08g21gsh-8-gb/',
      'ram-16': 'https://www.dns-shop.ru/product/3673b775c913ed20/operativnaa-pamat-ddr5-sodimm-adata-ad5s560016g-s-16-gb/',
      'ram-32': 'https://www.dns-shop.ru/product/d4945897c912ed20/operativnaa-pamat-ddr5-sodimm-adata-ad5s560032g-s-32-gb/',
      'ssd-256': 'https://www.dns-shop.ru/product/e37c0f79cfcced20/256-gb-m2-nvme-nakopitel-adata-legend-710-aleg-710-256gcs/',
      'ssd-512': 'https://www.dns-shop.ru/product/78c60575a7e3d582/500-gb-m2-nvme-nakopitel-kingston-nv3-snv3s500g/',
      'ssd-1tb': 'https://www.dns-shop.ru/product/fe0d78e690d9d582/1000-gb-m2-nvme-nakopitel-kingston-nv3-snv3s1000g/',
      // Ноутбук: беспроводные модули (Wi-Fi и Bluetooth в одном M.2-модуле)
      'wifi-ac': 'https://www.dns-shop.ru/product/2af3b7e8de2d3330/modul-wifi-intel-7260hmw-245ghz-bluetooth-40-mini-pci-e/',
      'wifi-ax': 'https://www.dns-shop.ru/product/d9da5b18464e3332/wi-fi-adapter-bluetooth-intel-ax200ngw/',
      'wifi-none': 'https://www.dns-shop.ru/catalog/recipe/44b0813639417d82/s-bluetooth/',
      // Для батарей и экранов ведём на поиск DNS: точная совместимость зависит от модели ноутбука
      'bat-45': 'https://www.dns-shop.ru/search/?q=' + encodeURIComponent('аккумулятор для ноутбука'),
      'bat-60': 'https://www.dns-shop.ru/search/?q=' + encodeURIComponent('аккумулятор для ноутбука'),
      'bat-80': 'https://www.dns-shop.ru/search/?q=' + encodeURIComponent('аккумулятор для ноутбука'),
      // Внутренние вентиляторы и внешние подставки
      'fan-basic': 'https://www.dns-shop.ru/search/?q=' + encodeURIComponent('вентилятор для ноутбука'),
      'thermal': 'https://www.dns-shop.ru/search/?q=' + encodeURIComponent('термопаста для ноутбука'),
      'cooling-pad': 'https://www.dns-shop.ru/catalog/17a9b7a816404e77/podstavki-dla-noutbukov/',
      // Матрицы подбираются по диагонали, разъёму, креплениям и модели ноутбука
      'fhd-60': 'https://www.dns-shop.ru/search/?q=' + encodeURIComponent('матрица экран для ноутбука 15.6 FHD IPS'),
      'fhd-ips': 'https://www.dns-shop.ru/search/?q=' + encodeURIComponent('матрица экран для ноутбука 15.6 FHD 144 Гц'),
      'qhd-16': 'https://www.dns-shop.ru/search/?q=' + encodeURIComponent('матрица экран для ноутбука 16 2560x1600')
    };
    return exact[item.id] || (mode === 'laptop' ? '' : ('https://www.dns-shop.ru/search/?q=' + encodeURIComponent(item.name)));
  }

  function renderLaptopLinks() {
    // В режиме ноутбука показываем ссылки на комплектующие в карточках категорий,
    // а не ссылки на готовые модели ноутбуков.
    const box = $('#b-laptop-links');
    if (!box) return;
    box.hidden = true;
    box.innerHTML = '';
  }

  function renderParts() {
    const box = $('#b-parts');
    box.innerHTML = '';
    (ITEMS[activeCat] || []).forEach(item => {
      const selected = state.build[activeCat] === item.id;
      const warn = partIssue(activeCat, item);
      const card = document.createElement('div');
      card.className = 'part' + (selected ? ' is-selected' : '');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-pressed', selected ? 'true' : 'false');
      card.innerHTML =
        '<span class="part-head">'
        + '<span class="part-name">' + esc(item.name) + '</span>'
        + '<span class="part-price">' + esc(item.priceLabel || money(item.price)) + '</span>'
        + '</span>'
        + '<span class="part-specs">'
        + (item.specs || []).map(s => '<span class="chip">' + esc(s) + '</span>').join('')
        + '</span>'
        + '<span class="part-desc">' + esc(item.desc) + '</span>'
        + (warn ? '<span class="part-warn">' + esc(warn) + '</span>' : '')
        + (dnsProductUrl(item)
          ? '<a class="part-dns-link" href="' + dnsProductUrl(item) + '" target="_blank" rel="noopener noreferrer">Открыть товар или поиск в DNS ↗</a>'
          : (mode === 'laptop' ? '<span class="part-dns-unavailable">Не продаётся отдельно как универсальная деталь</span>' : ''));
      card.addEventListener('click', e => {
        if (e.target.closest('a')) return;
        selectPart(activeCat, item.id);
      });
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('a')) return;
          e.preventDefault();
          selectPart(activeCat, item.id);
        }
      });
      box.appendChild(card);
    });
  }

  function selectPart(catId, id) {
    if (state.build[catId] === id) return;
    state.build[catId] = id;
    const box = $('#b-parts');
    const scroll = box.scrollTop;
    renderCats();
    renderParts();
    box.scrollTop = scroll;
    updateMoney();
    renderIssues();
  }

  function partIssue(catId, item) {
    if (mode === 'laptop') return '';
    const b = state.build;
    const cpu = catId === 'cpu' ? item : part('cpu', b.cpu);
    const mb = catId === 'mb' ? item : part('mb', b.mb);
    const ram = catId === 'ram' ? item : part('ram', b.ram);
    const gpu = catId === 'gpu' ? item : part('gpu', b.gpu);
    const psu = catId === 'psu' ? item : part('psu', b.psu);
    const cs = catId === 'case' ? item : part('case', b.case);
    const cooler = catId === 'cooler' ? item : part('cooler', b.cooler);

    if (catId === 'cpu' && mb && item.socket !== mb.socket) return 'Сокет ' + item.socket + ' — плата под ' + mb.socket;
    if (catId === 'mb' && cpu && item.socket !== cpu.socket) return 'Сокет ' + item.socket + ' — процессор под ' + cpu.socket;
    if (catId === 'mb' && ram && item.mem !== ram.type) return 'Плата под ' + item.mem + ', память ' + ram.type;
    if (catId === 'ram' && mb && item.type !== mb.mem) return item.type + ', а плата под ' + mb.mem;
    if (catId === 'cpu' && gpu && gpu.id === 'none' && !item.igpu) return 'Без видеокарты нужна встроенная графика';
    if (catId === 'gpu' && item.id === 'none' && cpu && !cpu.igpu) return 'У процессора нет встройки — экран будет чёрным';
    if (catId === 'gpu' && cs && item.len && item.len > cs.maxGpu) return item.len + ' мм не влезет: корпус до ' + cs.maxGpu + ' мм';
    if (catId === 'case' && gpu && gpu.len && gpu.len > item.maxGpu) return 'Карта ' + gpu.len + ' мм — корпус держит до ' + item.maxGpu + ' мм';
    if (catId === 'gpu' && item.power === '12v' && psu && !psu.connector12) return 'Нужен 12V-2x6 — у БП его нет, только переходник';
    if (catId === 'psu' && cpu && gpu) {
      const draw = cpu.tdp + gpu.tdp + 70;
      if (item.watt < draw * 1.15) return 'Мало: сборке нужно ~' + Math.round(draw * 1.25) + ' Вт с запасом';
    }
    if (catId === 'cooler' && cpu && item.tdp < cpu.tdp) return 'Кулер на ' + item.tdp + ' Вт, процессор ' + cpu.tdp + ' Вт';
    return '';
  }

  function calcTotal() {
    return CATS.reduce((sum, cat) => {
      const p = part(cat.id, state.build[cat.id]);
      return sum + (p ? p.price : 0);
    }, 0);
  }

  function missingCount() {
    return CATS.filter(cat => !part(cat.id, state.build[cat.id])).length;
  }

  function updateMoney() {
    const total = calcTotal();
    const credit = Math.max(0, total - CASH);
    $('#b-total').textContent = money(total);
    const creditEl = $('#b-credit');
    creditEl.textContent = credit > 0 ? 'из них в кредит: ' + money(credit) : 'наличных хватает';
    creditEl.style.color = credit > 0 ? 'var(--pink-2)' : 'var(--ok)';
    const cashEl = document.querySelector('.b-cash');
    if (cashEl) cashEl.textContent = 'Наличные: ' + money(CASH);
  }

  function validate() {
    const result = [];
    const missing = CATS.filter(cat => !part(cat.id, state.build[cat.id]));
    if (missing.length) {
      result.push({
        level: 'warn',
        text: 'Не выбрано: ' + missing.map(c => c.name.toLowerCase()).join(', ')
      });
      return result;
    }

    if (mode === 'laptop') {
      const total = calcTotal();
      if (total > CASH) {
        result.push({ level: 'warn', text: 'Сумма выше наличных — часть уйдёт в кредит' });
      }
      result.push({ level: 'ok', text: 'Конфигурация выбрана — можно оформлять' });
      return result;
    }

    const cpu = part('cpu', state.build.cpu);
    const mb = part('mb', state.build.mb);
    const ram = part('ram', state.build.ram);
    const gpu = part('gpu', state.build.gpu);
    const psu = part('psu', state.build.psu);
    const cs = part('case', state.build.case);
    const cooler = part('cooler', state.build.cooler);

    if (cpu && mb && cpu.socket !== mb.socket) {
      result.push({ level: 'error', text: 'Сокет: ' + cpu.short + ' — ' + cpu.socket + ', плата — ' + mb.socket });
    }
    if (mb && ram && mb.mem !== ram.type) {
      result.push({ level: 'error', text: 'Память: плата под ' + mb.mem + ', модули ' + ram.type });
    }
    if (gpu && cpu && gpu.id === 'none' && !cpu.igpu) {
      result.push({ level: 'error', text: cpu.short + ' без встроенной графики — нужна видеокарта' });
    }
    if (gpu && cs && gpu.len && gpu.len > cs.maxGpu) {
      result.push({ level: 'error', text: 'Видеокарта ' + gpu.len + ' мм не влезает: корпус до ' + cs.maxGpu + ' мм' });
    }

    if (cpu && gpu && psu) {
      const draw = cpu.tdp + gpu.tdp + 70;
      if (psu.watt < draw) {
        result.push({ level: 'error', text: 'БП ' + psu.watt + ' Вт не вытянет: нужно ~' + Math.round(draw * 1.25) + ' Вт' });
      } else if (psu.watt < draw * 1.3) {
        result.push({ level: 'warn', text: 'БП ' + psu.watt + ' Вт впритык — лучше с запасом' });
      }
    }
    if (cooler && cpu && cooler.tdp < cpu.tdp) {
      result.push({ level: 'warn', text: 'Кулер на ' + cooler.tdp + ' Вт не удержит ' + cpu.tdp + ' Вт' });
    }
    if (gpu && psu && gpu.power === '12v' && !psu.connector12) {
      result.push({ level: 'warn', text: 'Карте нужен 12V-2x6, у БП его нет — понадобится переходник' });
    }
    if (cs && cs.fans === 0) {
      result.push({ level: 'warn', text: 'В корпусе нет вентиляторов — докупи отдельно' });
    }
    if (cpu && mb && cpu.perf >= 95 && mb.id === 'b650m-p') {
      result.push({ level: 'warn', text: 'Под 9800X3D питание платы слабовато — лучше B650M Gaming Plus' });
    }
    if (!result.length) {
      result.push({ level: 'ok', text: mode === 'laptop' ? 'Конфигурация выбрана — можно оформлять' : 'Всё сходится — можно собирать' });
    }
    return result;
  }

  function renderIssues() {
    const issues = validate();
    $('#b-issues').innerHTML = issues
      .map(i => '<span class="issue is-' + i.level + '">' + esc(i.text) + '</span>')
      .join('');

    const ready = missingCount() === 0;
    const errors = issues.filter(i => i.level === 'error').length;
    const btn = $('#b-build');
    btn.disabled = !ready || errors > 0;
    btn.textContent = ready
      ? (errors ? 'Есть несовместимости' : 'Собрать')
      : 'Выбери всё · ' + (CATS.length - missingCount()) + '/' + CATS.length;
  }

  /* ---------------- концовка ---------------- */
  function endingKey(total) {
    if (mode === 'laptop') {
      if (total <= 55000) return 'cheap';
      if (total <= 110000) return 'mid';
      return 'lux';
    }
    if (total <= 90000) return 'cheap';
    if (total <= 190000) return 'mid';
    return 'lux';
  }

  function renderEndBuild(total, credit) {
    const box = $('#end-build');
    box.innerHTML = '';
    CATS.forEach(cat => {
      const p = part(cat.id, state.build[cat.id]);
      if (!p) return;
      const row = document.createElement('div');
      row.className = 'end-row';
      row.innerHTML = '<b>' + esc(cat.name) + ': ' + esc(p.short) + '</b>'
        + '<span>' + money(p.price) + '</span>'
        + '<a href="' + dnsProductUrl(p) + '" target="_blank" rel="noopener noreferrer">DNS ↗</a>';
      box.appendChild(row);
    });

    const sum = document.createElement('div');
    sum.className = 'end-row is-sum';
    sum.innerHTML = '<b>Итого</b><span>' + money(total) + '</span>';
    box.appendChild(sum);

    if (credit > 0) {
      const cr = document.createElement('div');
      cr.className = 'end-row is-credit';
      cr.innerHTML = '<b>Из них в кредит</b><span>' + money(credit) + '</span>';
      box.appendChild(cr);
    }
  }

  function showEnding() {
    if (state.timer) clearInterval(state.timer);
    state.timer = null;
    state.typing = false;

    const total = calcTotal();
    const key = endingKey(total);
    const data = (currentEndings && currentEndings[key]) || ENDINGS[key];
    const credit = Math.max(0, total - CASH);

    if (saved.unlocked.indexOf(key) === -1) {
      saved.unlocked.push(key);
      persist();
    }
    updateTitleProgress();

    const ctx = {
      build: state.build,
      total: total,
      totalText: money(total),
      credit: credit,
      creditText: money(credit),
      plan: state.plan
    };

    $('#ending-card').style.setProperty('--accent', data.accent || 'var(--pink)');
    $('#end-kicker').textContent = data.subtitle + ' · открыто ' + saved.unlocked.length + ' из 3';
    $('#end-title').textContent = data.title;
    $('#end-total').textContent = 'Итого: ' + money(total)
      + (credit ? ' · в кредит ' + money(credit) : ' · без кредита');

    const box = $('#end-lines');
    box.innerHTML = '';
    let shown = 0;
    data.lines.forEach(line => {
      const raw = typeof line === 'function' ? line(ctx) : line;
      const text = raw == null ? '' : String(raw).trim();
      if (!text) return;
      const p = document.createElement('p');
      p.textContent = text;
      p.style.setProperty('--d', (0.1 + shown * 0.22).toFixed(2) + 's');
      box.appendChild(p);
      shown += 1;
    });

    renderEndBuild(total, credit);
    show('ending');
    $('#screen-ending').scrollTop = 0;
    $('#ending-card').scrollTop = 0;
  }

  /* ---------------- модальные окна ---------------- */
  function openModal(title, bodyHtml, actions) {
    $('#modal-title').textContent = title;
    $('#modal-body').innerHTML = bodyHtml;
    const box = $('#modal-actions');
    box.innerHTML = '';
    (actions || []).forEach(action => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn ' + (action.primary ? 'btn-primary' : 'btn-ghost');
      btn.textContent = action.label;
      btn.addEventListener('click', action.onClick || closeModal);
      box.appendChild(btn);
    });
    $('#modal').classList.add('is-open');
    $('#modal').setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    $('#modal').classList.remove('is-open');
    $('#modal').setAttribute('aria-hidden', 'true');
  }

  function openGallery() {
    const keys = ['cheap', 'mid', 'lux'];
    const ends = currentEndings || ENDINGS;
    const html = keys.map((key, i) => {
      const data = ends[key];
      if (!data) return '';
      const open = saved.unlocked.indexOf(key) !== -1;
      return '<div class="g-item' + (open ? ' is-open' : '') + '">'
        + '<span class="g-num">' + (i + 1) + '</span>'
        + '<span class="g-text">'
        + '<span class="g-title">' + (open ? esc(data.title) : '???') + '</span>'
        + '<span class="g-desc">' + (open ? esc(data.subtitle) : 'Ещё не открыта') + '</span>'
        + '</span></div>';
    }).join('');

    openModal(
      'Концовки',
      '<div class="g-list">' + html + '</div>'
      + '<p style="margin-top:16px">Открыто ' + saved.unlocked.length + ' из 3. '
      + 'Концовка зависит от итоговой суммы сборки.</p>',
      [{ label: 'Закрыть', primary: true, onClick: closeModal }]
    );
  }

  function openMenu() {
    openModal(
      'Пауза',
      '<p>Кей ждёт. Железо не портится.</p>',
      [
        { label: 'Продолжить', primary: true, onClick: closeModal },
        { label: 'С начала', onClick: () => { closeModal(); restart(); } },
        { label: 'Концовки', onClick: () => { closeModal(); openGallery(); } }
      ]
    );
  }

  function updateTitleProgress() {
    $('#title-progress').textContent = saved.unlocked.length + ' / 3';
  }

  /* ---------------- запуск / перезапуск ---------------- */
  function restart() {
    if (state.timer) clearInterval(state.timer);
    state.timer = null;
    state.typing = false;
    state.choicesOpen = false;
    state.build = {};
    state.plan = 'mid';
    state.bgName = null;
    state.chapter = null;
    setChapter(null);
    hideChoices();
    activeCat = (CATS && CATS[0]) ? CATS[0].id : 'cpu';
    const cashEl = document.querySelector('.b-cash');
    if (cashEl) cashEl.textContent = 'Наличные: ' + money(CASH);
    startScene(currentStory.start);
  }

  function startGame(m) {
    setMode(m);
    restart();
  }

  function bind() {
    const btnLaptop = $('#btn-start-laptop');
    const btnPc = $('#btn-start-pc');
    if (btnLaptop) btnLaptop.addEventListener('click', () => startGame('laptop'));
    if (btnPc) btnPc.addEventListener('click', () => startGame('pc'));
    const oldStart = $('#btn-start');
    if (oldStart) oldStart.addEventListener('click', () => startGame('pc'));
    $('#btn-endings').addEventListener('click', openGallery);

    $('#btn-next').addEventListener('click', advance);
    $('#btn-menu').addEventListener('click', openMenu);

    $('#screen-game').addEventListener('click', e => {
      if (e.target.closest('button')) return;
      if ($('#modal').classList.contains('is-open')) return;
      if (state.choicesOpen) return;
      advance();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if ($('#modal').classList.contains('is-open')) { closeModal(); return; }
        if ($('#screen-game').classList.contains('is-active')) openMenu();
        return;
      }
      if (e.key === ' ' || e.key === 'Enter') {
        if ($('#modal').classList.contains('is-open')) return;
        if (!$('#screen-game').classList.contains('is-active')) return;
        if (document.activeElement && document.activeElement.tagName === 'BUTTON') return;
        e.preventDefault();
        advance();
      }
    });

    $('#modal').addEventListener('click', e => {
      if (e.target === $('#modal')) closeModal();
    });

    /* конфигуратор */
    $('#b-clear').addEventListener('click', () => {
      state.build = {};
      renderBuilder();
    });

    $('#b-build').addEventListener('click', () => {
      if ($('#b-build').disabled) return;
      startScene(mode === 'laptop' ? 'l_assembly' : 'assembly');
    });

    /* концовка */
    $('#end-again').addEventListener('click', restart);
    $('#end-rebuild').addEventListener('click', openBuilder);
    $('#end-gallery').addEventListener('click', openGallery);
  }

  bind();
  updateTitleProgress();
})();
