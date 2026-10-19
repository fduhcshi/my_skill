(() => {
  'use strict';

  const skills = window.MY_SKILLS || [];
  const colors = { yellow: '#ffd84d', blue: '#a5dcff', pink: '#ffb9cc', green: '#b9e6b1', orange: '#ffd0b3' };
  const paths = {
    book: '<path d="M3 6c5-2 9-2 13 1 4-3 8-3 13-1v21c-5-2-9-2-13 1-4-3-8-3-13-1zM16 7v21M7 12l5 1M7 17l5 1M20 13l5-1M20 18l5-1"/>',
    experiment: '<path d="M12 3h8M14 3v10L5 25q-2 4 3 4h16q5 0 3-4l-9-12V3M10 20h12"/><circle cx="15" cy="24" r="1"/><circle cx="20" cy="25" r=".6"/>',
    spark: '<path d="m17 2 3 10 10 3-10 3-3 11-3-11-11-3 11-3zM4 3l2 3M26 25l3 3M2 26l4-3"/>',
    code: '<rect x="2" y="5" width="28" height="23" rx="4"/><path d="M2 11h28M9 17l-4 3 4 3M23 17l4 3-4 3M18 15l-4 10"/><path d="M6 8h.1M10 8h.1M14 8h.1"/>',
    design: '<rect x="3" y="3" width="23" height="23" rx="5"/><path d="M26 15h-7a4 4 0 0 0-4 4v7M16 26l10-10M9 10h.1M19 10h.1M10 17q4 4 8 0"/>',
  };
  const icon = (name) => `<svg viewBox="0 0 32 32" aria-hidden="true">${paths[name] || paths.book}</svg>`;
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  // A small, dependency-free reader. Raw HTML stays text, and links are allowlisted.
  function inline(text) {
    const tokens = [];
    const stash = (html) => `\u0000${tokens.push(html) - 1}\u0000`;
    let value = text.replace(/`([^`\n]+)`/g, (_, content) => stash(`<code>${escapeHTML(content)}</code>`));
    value = value.replace(/\[([^\]\n]+)\]\(([^\s)]+)\)/g, (_, label, href) => {
      const allowed = /^(?:https?:\/\/|mailto:|#|\.?\.?\/|[a-z0-9_-]+\.(?:md|html|json)(?:#|$))/i.test(href);
      if (!allowed) return label;
      const external = /^https?:\/\//i.test(href) ? ' target="_blank" rel="noopener noreferrer"' : '';
      return stash(`<a href="${escapeHTML(href)}"${external}>${escapeHTML(label)}</a>`);
    });
    value = escapeHTML(value).replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>').replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>');
    return value.replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)]);
  }

  function markdown(source) {
    const lines = source.replace(/\r\n/g, '\n').split('\n');
    const html = [];
    let i = 0;
    const listMatch = (line) => line.match(/^(\s*)([-+*]|\d+[.)])\s+(.+)$/);
    const divider = (line) => /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line || '');
    const cells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((cell) => cell.trim());
    const block = (index) => /^(?:\s*$|\s*`{3,}|\s*~{3,}|#{1,6}\s|\s*>|\s*\$\$\s*$|\s*(?:---+|\*\*\*+)\s*$)/.test(lines[index]) || listMatch(lines[index]) || divider(lines[index + 1]);
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }
      const fence = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
      if (fence) {
        const code = [];
        const marker = fence[1][0];
        const count = fence[1].length;
        i++;
        while (i < lines.length) {
          const end = lines[i].match(/^\s*(`{3,}|~{3,})\s*$/);
          if (end && end[1][0] === marker && end[1].length >= count) { i++; break; }
          code.push(lines[i++]);
        }
        html.push(`<pre><code>${escapeHTML(code.join('\n'))}</code></pre>`);
        continue;
      }
      if (/^\s*\$\$\s*$/.test(line)) {
        const math = [line]; i++;
        while (i < lines.length) { const next = lines[i++]; math.push(next); if (/^\s*\$\$\s*$/.test(next)) break; }
        html.push(`<pre class="math-source"><code>${escapeHTML(math.join('\n'))}</code></pre>`);
        continue;
      }
      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) { html.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`); i++; continue; }
      if (/^\s*(?:---+|\*\*\*+)\s*$/.test(line)) { html.push('<hr>'); i++; continue; }
      if (divider(lines[i + 1])) {
        const header = cells(line);
        i += 2;
        const rows = [];
        while (i < lines.length && lines[i].includes('|') && lines[i].trim()) {
          rows.push(`<tr>${cells(lines[i++]).map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`);
        }
        html.push(`<div class="table-scroll"><table><thead><tr>${header.map((cell) => `<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`);
        continue;
      }
      if (/^\s*>/.test(line)) {
        const quote = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) quote.push(lines[i++].replace(/^\s*>\s?/, ''));
        html.push(`<blockquote>${markdown(quote.join('\n'))}</blockquote>`);
        continue;
      }
      const first = listMatch(line);
      if (first) {
        const indent = first[1].length;
        const ordered = /^\d/.test(first[2]);
        const items = [];
        while (i < lines.length) {
          const match = listMatch(lines[i]);
          if (!match || match[1].length !== indent || /^\d/.test(match[2]) !== ordered) break;
          const content = [match[3]];
          i++;
          while (i < lines.length) {
            if (!lines[i].trim()) {
              const next = lines[i + 1] || '';
              if (next.search(/\S/) > indent) { content.push(''); i++; continue; }
              i++; break;
            }
            const nested = listMatch(lines[i]);
            const leading = lines[i].search(/\S/);
            if ((nested && nested[1].length <= indent) || leading <= indent) break;
            content.push(lines[i++].slice(Math.min(indent + 2, leading)));
          }
          items.push(`<li>${markdown(content.join('\n'))}</li>`);
        }
        const tag = ordered ? 'ol' : 'ul';
        const start = ordered && parseInt(first[2], 10) !== 1 ? ` start="${parseInt(first[2], 10)}"` : '';
        html.push(`<${tag}${start}>${items.join('')}</${tag}>`);
        continue;
      }
      const paragraph = [line];
      i++;
      while (i < lines.length && !block(i)) paragraph.push(lines[i++]);
      html.push(`<p>${inline(paragraph.join('\n')).replace(/  \n/g, '<br>')}</p>`);
    }
    return html.join('\n');
  }

  const grid = document.querySelector('#skill-grid');
  const search = document.querySelector('#skill-search');
  const dialog = document.querySelector('#skill-dialog');
  const toast = document.querySelector('#toast');
  let currentSource = '';
  let toastTimer;

  function renderCards() {
    const query = search.value.trim().toLocaleLowerCase();
    const found = skills.filter((skill) => [skill.id, skill.title, skill.subtitle, skill.summary, ...skill.tags, skill.input, skill.output].join(' ').toLocaleLowerCase().includes(query));
    grid.innerHTML = found.map((skill) => `<article class="skill-card" style="--accent: ${colors[skill.color]}">
      <div class="card-head"><span class="skill-icon" aria-hidden="true">${icon(skill.icon)}</span><p class="skill-id">${escapeHTML(skill.file)}</p><span class="skill-number">${String(skills.indexOf(skill) + 1).padStart(2, '0')}</span></div>
      <div class="card-body"><h3>${escapeHTML(skill.title)}</h3><p class="skill-description">${escapeHTML(skill.summary)}</p><div class="tag-list">${skill.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}</div>
      <div class="card-actions"><a class="card-open" href="#skill/${skill.id}" aria-label="阅读${escapeHTML(skill.title)}的使用说明">使用说明 <span aria-hidden="true">↗</span></a><a class="download-link" href="${skill.file}" download aria-label="下载 ${skill.file}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/></svg>下载 skill.md</a></div></div></article>`).join('');
    document.querySelector('#empty-state').hidden = found.length > 0;
    document.querySelector('#result-count').textContent = `找到 ${found.length} 个 skill`;
  }

  function notify(message) {
    clearTimeout(toastTimer);
    (dialog.open ? dialog : document.body).appendChild(toast);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
  }

  async function copyText(text) {
    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(text); copied = true; } catch (_) { /* Use the local-file fallback below. */ }
    }
    if (!copied) {
      const active = document.activeElement;
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('aria-label', '待复制的内容');
      area.style.cssText = 'position:fixed;left:-9999px;top:0';
      (dialog.open ? dialog : document.body).appendChild(area);
      area.select();
      try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
      area.remove();
      if (active && active.focus) active.focus();
    }
    notify(copied ? '已复制，可以发给 AI 了。' : '浏览器未允许复制，请选中文本手动复制。');
  }

  function setView(view, focus = false) {
    document.querySelectorAll('[data-view]').forEach((tab) => {
      const selected = tab.dataset.view === view;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    document.querySelector('#overview-panel').hidden = view !== 'overview';
    document.querySelector('#source-panel').hidden = view !== 'source';
  }

  function showSkill(skill) {
    currentSource = skill.source;
    document.querySelector('#copy-source').textContent = '复制完整 Skill';
    dialog.style.setProperty('--accent', colors[skill.color]);
    document.querySelector('#dialog-label').textContent = `SKILL / ${String(skills.indexOf(skill) + 1).padStart(2, '0')}`;
    document.querySelector('#dialog-title').textContent = skill.title;
    document.querySelector('#dialog-id').textContent = skill.file;
    document.querySelector('#dialog-icon').innerHTML = icon(skill.icon);
    document.querySelector('#dialog-summary').textContent = skill.summary;
    const download = document.querySelector('#dialog-download');
    download.href = skill.file;
    download.download = skill.file;
    download.innerHTML = '下载 skill.md <span aria-hidden="true">↓</span>';
    document.querySelector('#overview-panel').innerHTML = `<h3>什么时候用</h3><p>${escapeHTML(skill.use)}</p><div class="guide-grid"><div><h3>你提供</h3><p>${escapeHTML(skill.input)}</p></div><div><h3>你得到</h3><p>${escapeHTML(skill.output)}</p></div></div><h3>试着这样说</h3><pre class="example-prompt">${escapeHTML(skill.prompt)}</pre><button class="button small" id="copy-example">复制调用示例</button>`;
    document.querySelector('#copy-example').addEventListener('click', () => copyText(skill.prompt));
    document.querySelector('#source-panel').innerHTML = markdown(skill.body);
    document.querySelector('.reader-tabs').hidden = false;
    setView('overview');
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    document.querySelector('#close-dialog').focus({ preventScroll: true });
  }

  function showReadme() {
    currentSource = window.MY_SKILLS_README || '';
    document.querySelector('#copy-source').textContent = '复制 README';
    dialog.style.setProperty('--accent', colors.green);
    document.querySelector('#dialog-label').textContent = 'ABOUT THE COLLECTION';
    document.querySelector('#dialog-title').textContent = '关于 My Skills';
    document.querySelector('#dialog-id').textContent = 'README.md';
    document.querySelector('#dialog-icon').innerHTML = icon('book');
    document.querySelector('#dialog-summary').textContent = '技能清单、调用示例，以及这个小工具箱的使用与维护方式。';
    const download = document.querySelector('#dialog-download');
    download.href = 'README.md';
    download.download = 'README.md';
    download.innerHTML = '下载 README.md <span aria-hidden="true">↓</span>';
    document.querySelector('#overview-panel').innerHTML = '';
    document.querySelector('#source-panel').innerHTML = markdown(currentSource);
    setView('source');
    document.querySelector('.reader-tabs').hidden = true;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    document.querySelector('#close-dialog').focus({ preventScroll: true });
  }

  function syncRoute() {
    const match = location.hash.match(/^#skill\/([a-z0-9-]+)$/);
    const skill = match && skills.find((entry) => entry.id === match[1]);
    if (skill) showSkill(skill);
    else if (location.hash === '#readme') showReadme();
    else if (dialog.open) dialog.close();
  }

  search.addEventListener('input', renderCards);
  document.querySelector('#reset-search').addEventListener('click', () => { search.value = ''; renderCards(); search.focus(); });
  document.querySelector('[data-copy-install]').addEventListener('click', () => copyText(document.querySelector('#install-prompt').textContent));
  document.querySelector('#copy-source').addEventListener('click', () => { if (currentSource) copyText(currentSource); });
  document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (location.hash.startsWith('#skill/') || location.hash === '#readme') history.replaceState(null, '', `${location.pathname}${location.search}#skills`);
    toast.hidden = true;
    document.body.appendChild(toast);
  });
  const tabs = [...document.querySelectorAll('[data-view]')];
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setView(tab.dataset.view));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      setView(tabs[next].dataset.view, true);
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !dialog.open && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !document.activeElement.isContentEditable) {
      event.preventDefault(); search.focus();
    }
  });
  window.addEventListener('hashchange', syncRoute);
  renderCards();
  syncRoute();
})();
