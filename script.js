document.addEventListener('DOMContentLoaded', function() {
  const noticeCard = document.querySelector('.notice-card');
  const closeBtn = document.querySelector('.notice-close');
  if (localStorage.getItem('hideNotice') === '1') {
    if (noticeCard) noticeCard.style.display = 'none';
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      if (noticeCard) noticeCard.style.display = 'none';
      localStorage.setItem('hideNotice', '1');
    });
  }

  // Hamburger menu functionality
  const hamburger = document.getElementById('hamburgerMenu');
  const headerIcons = document.getElementById('headerIcons');
  function toggleMenu() {
    if (headerIcons.style.display === 'flex') {
      headerIcons.style.display = 'none';
    } else {
      headerIcons.style.display = 'flex';
      headerIcons.style.flexDirection = 'column';
      headerIcons.style.position = 'absolute';
      headerIcons.style.top = '54px';
      headerIcons.style.right = '18px';
      headerIcons.style.background = '#fff';
      headerIcons.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
      headerIcons.style.borderRadius = '12px';
      headerIcons.style.padding = '0.7rem 1.2rem';
      headerIcons.style.zIndex = '100';
    }
    feather.replace();
  }
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  // Hide menu on resize if not mobile
  window.addEventListener('resize', function() {
    if (window.innerWidth > 600 && headerIcons) {
      headerIcons.style.display = 'flex';
      headerIcons.style.flexDirection = '';
      headerIcons.style.position = '';
      headerIcons.style.top = '';
      headerIcons.style.right = '';
      headerIcons.style.background = '';
      headerIcons.style.boxShadow = '';
      headerIcons.style.borderRadius = '';
      headerIcons.style.padding = '';
      headerIcons.style.zIndex = '';
    } else if (window.innerWidth <= 600 && headerIcons) {
      headerIcons.style.display = 'none';
    }
  });
  // Initial state
  if (window.innerWidth <= 600 && headerIcons) {
    headerIcons.style.display = 'none';
  }

  // Settings dropdown logic
  const settingsIconWrapper = document.querySelector('.settings-icon-wrapper');
  const settingsDropdown = document.getElementById('settingsDropdown');
  if (settingsIconWrapper && settingsDropdown) {
    settingsIconWrapper.addEventListener('click', function(e) {
      e.stopPropagation();
      settingsIconWrapper.classList.toggle('active');
      feather.replace();
    });
    settingsDropdown.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent closing when clicking inside dropdown
    });
    document.addEventListener('click', function(e) {
      if (!settingsIconWrapper.contains(e.target)) {
        settingsIconWrapper.classList.remove('active');
        feather.replace();
      }
    });
  }

  // Notification dropdown logic (updated for seamless header)
  const notificationIconWrapper = document.getElementById('notificationIconWrapper');
  const notificationDropdown = document.getElementById('notificationDropdown');
  const header = document.querySelector('.header');
  if (notificationIconWrapper && notificationDropdown && header) {
    notificationIconWrapper.addEventListener('click', function(e) {
      e.stopPropagation();
      notificationDropdown.classList.toggle('active');
      if (notificationDropdown.classList.contains('active')) {
        header.classList.add('dropdown-open');
      } else {
        header.classList.remove('dropdown-open');
      }
      if (settingsIconWrapper) settingsIconWrapper.classList.remove('active');
      feather.replace();
    });
    notificationDropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    document.addEventListener('click', function(e) {
      if (!notificationDropdown.contains(e.target) && !notificationIconWrapper.contains(e.target)) {
        notificationDropdown.classList.remove('active');
        header.classList.remove('dropdown-open');
        feather.replace();
      }
    });
  }

  // Dark mode toggle (now in dropdown)
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeIcon = document.getElementById('darkModeIcon');
  const body = document.body;
  function setDarkMode(on) {
    if (on) {
      body.classList.add('dark-mode');
      if (darkModeIcon) darkModeIcon.setAttribute('data-feather', 'sun');
    } else {
      body.classList.remove('dark-mode');
      if (darkModeIcon) darkModeIcon.setAttribute('data-feather', 'moon');
    }
    feather.replace();
  }
  // Load preference
  const darkPref = localStorage.getItem('darkMode');
  setDarkMode(darkPref === '1');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isDark = body.classList.toggle('dark-mode');
      setDarkMode(isDark);
      localStorage.setItem('darkMode', isDark ? '1' : '0');
    });
  }

  // Profile dropdown logic
  const profilePicWrapper = document.getElementById('profilePicWrapper');
  const profileDropdown = document.getElementById('profileDropdown');
  if (profilePicWrapper && profileDropdown && header) {
    profilePicWrapper.addEventListener('click', function(e) {
      e.stopPropagation();
      profileDropdown.classList.toggle('active');
      notificationDropdown.classList.remove('active');
      header.classList.remove('dropdown-open');
      if (profileDropdown.classList.contains('active')) {
        header.classList.add('profile-dropdown-open');
      } else {
        header.classList.remove('profile-dropdown-open');
      }
      feather.replace();
    });
    profileDropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    document.addEventListener('click', function(e) {
      if (!profileDropdown.contains(e.target) && !profilePicWrapper.contains(e.target)) {
        profileDropdown.classList.remove('active');
        header.classList.remove('profile-dropdown-open');
        feather.replace();
      }
    });
  }

  // Search bar transformation logic (fix: remove old searchDropdown logic)
  const searchIconWrapper = document.getElementById('searchIconWrapper');
  const headerSearchBar = document.getElementById('headerSearchBar');
  if (searchIconWrapper && headerSearchBar && header) {
    searchIconWrapper.addEventListener('click', function(e) {
      e.stopPropagation();
      header.classList.add('search-active');
      notificationDropdown.classList.remove('active');
      profileDropdown.classList.remove('active');
      header.classList.remove('dropdown-open');
      header.classList.remove('profile-dropdown-open');
      headerSearchBar.querySelector('input').focus();
      document.body.classList.add('modal-blur-active');
      feather.replace();
    });
    document.addEventListener('click', function(e) {
      if (!headerSearchBar.contains(e.target) && !searchIconWrapper.contains(e.target)) {
        header.classList.remove('search-active');
        document.body.classList.remove('modal-blur-active');
      }
    });
    headerSearchBar.querySelector('input').addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        header.classList.remove('search-active');
        document.body.classList.remove('modal-blur-active');
      }
    });
  }

  // Live search with suggestions
  const searchInput = headerSearchBar ? headerSearchBar.querySelector('input') : null;
  const searchSuggestions = document.getElementById('searchSuggestions');
  let cardData = [];
  let cardElements = [];
  // Gather all card titles and elements
  function gatherCards() {
    cardData = [];
    cardElements = [];
    document.querySelectorAll('.card').forEach(card => {
      const title = card.querySelector('.card-title')?.textContent?.trim() || '';
      if (title) {
        cardData.push(title);
        cardElements.push(card);
      }
    });
  }
  gatherCards();
  // Show suggestions
  function showSuggestions(query) {
    if (!searchSuggestions) return;
    searchSuggestions.innerHTML = '';
    if (!query) {
      searchSuggestions.classList.remove('active');
      header.classList.remove('search-dropdown-open');
      return;
    }
    const q = query.toLowerCase();
    const matches = cardData
      .map((title, idx) => ({ title, idx }))
      .filter(item => item.title.toLowerCase().includes(q));
    if (matches.length === 0) {
      searchSuggestions.classList.remove('active');
      header.classList.remove('search-dropdown-open');
      return;
    }
    matches.forEach((item, i) => {
      const regex = new RegExp(`(${q.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'ig');
      const highlighted = item.title.replace(regex, '<span class="search-suggestion-highlight">$1</span>');
      const div = document.createElement('div');
      div.className = 'search-suggestion-item';
      div.innerHTML = highlighted;
      div.tabIndex = 0;
      div.addEventListener('mousedown', function(e) {
        e.preventDefault();
        selectSuggestion(item.idx);
      });
      searchSuggestions.appendChild(div);
    });
    searchSuggestions.classList.add('active');
    header.classList.add('search-dropdown-open');
  }
  // Scroll to card
  function selectSuggestion(idx) {
    searchSuggestions.classList.remove('active');
    header.classList.remove('search-active');
    cardElements[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
    cardElements[idx].classList.add('search-highlight');
    setTimeout(() => cardElements[idx].classList.remove('search-highlight'), 1500);
  }
  // Keyboard navigation
  let suggestionIdx = -1;
  function updateActiveSuggestion() {
    const items = searchSuggestions.querySelectorAll('.search-suggestion-item');
    items.forEach((el, i) => {
      el.classList.toggle('active', i === suggestionIdx);
    });
  }
  if (searchInput && searchSuggestions) {
    searchInput.addEventListener('input', function() {
      showSuggestions(this.value);
      suggestionIdx = -1;
    });
    searchInput.addEventListener('keydown', function(e) {
      const items = searchSuggestions.querySelectorAll('.search-suggestion-item');
      if (e.key === 'ArrowDown') {
        suggestionIdx = Math.min(suggestionIdx + 1, items.length - 1);
        updateActiveSuggestion();
        if (items[suggestionIdx]) items[suggestionIdx].focus();
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        suggestionIdx = Math.max(suggestionIdx - 1, 0);
        updateActiveSuggestion();
        if (items[suggestionIdx]) items[suggestionIdx].focus();
        e.preventDefault();
      } else if (e.key === 'Enter') {
        if (suggestionIdx >= 0 && items[suggestionIdx]) {
          items[suggestionIdx].click();
          e.preventDefault();
        }
      }
    });
    document.addEventListener('click', function(e) {
      if (!searchSuggestions.contains(e.target) && e.target !== searchInput) {
        searchSuggestions.classList.remove('active');
        header.classList.remove('search-dropdown-open');
      }
    });
  }
  // Highlight card when selected
  const style = document.createElement('style');
  style.innerHTML = `.search-highlight { box-shadow: 0 0 0 3px #1976d2 !important; transition: box-shadow 0.3s; }`;
  document.head.appendChild(style);

  // Initial icon render
  feather.replace();

  function updateModalBlur() {
    const anyOpen = notificationDropdown.classList.contains('active') ||
      profileDropdown.classList.contains('active') ||
      (searchSuggestions && searchSuggestions.classList.contains('active'));
    document.body.classList.toggle('modal-blur-active', anyOpen);
  }
  // Update blur on dropdown open/close
  if (notificationIconWrapper && notificationDropdown && header) {
    notificationIconWrapper.addEventListener('click', function(e) {
      setTimeout(updateModalBlur, 0);
    });
    document.addEventListener('click', function(e) {
      setTimeout(updateModalBlur, 0);
    });
  }
  if (profilePicWrapper && profileDropdown && header) {
    profilePicWrapper.addEventListener('click', function(e) {
      setTimeout(updateModalBlur, 0);
    });
    document.addEventListener('click', function(e) {
      setTimeout(updateModalBlur, 0);
    });
  }
  if (searchInput && searchSuggestions) {
    searchInput.addEventListener('input', function() {
      setTimeout(updateModalBlur, 0);
    });
    document.addEventListener('click', function(e) {
      setTimeout(updateModalBlur, 0);
    });
  }

  // --- UNIVERSAL SEARCH ENGINE ---
  // List of pages to index
  const PAGES = [
    { name: 'Dashboard', file: 'index.html' },
    { name: 'Personal Information', file: 'personal-information.html' },
    { name: 'Finance', file: 'finance.html' },
    { name: 'Login', file: 'login.html' }
  ];
  let universalIndex = [];
  let universalReady = false;

  async function fetchAndIndexPages() {
    const parser = new DOMParser();
    for (const page of PAGES) {
      try {
        const res = await fetch(page.file);
        if (!res.ok) continue;
        const html = await res.text();
        const doc = parser.parseFromString(html, 'text/html');
        // Index all visible text, including tab content
        // For personal-information.html, index all tab-content
        if (page.file === 'personal-information.html') {
          doc.querySelectorAll('.tab-content').forEach(tab => {
            const tabName = tab.querySelector('h2')?.textContent?.trim() || '';
            const tabText = tab.innerText.replace(/\s+/g, ' ').trim();
            universalIndex.push({
              page: page.name,
              file: page.file,
              tab: tabName,
              text: tabText,
              anchor: tab.id
            });
          });
        } else {
          // For other pages, index all main content
          const main = doc.body;
          if (main) {
            const text = main.innerText.replace(/\s+/g, ' ').trim();
            universalIndex.push({
              page: page.name,
              file: page.file,
              tab: '',
              text,
              anchor: ''
            });
          }
        }
      } catch (e) { /* ignore */ }
    }
    universalReady = true;
  }
  fetchAndIndexPages();

  // Enhanced universal search logic
  if (searchInput && searchSuggestions) {
    let activeIdx = -1;
    let currentResults = [];
    let debounceTimeout = null;
    const PAGE_ICONS = {
      'Dashboard': 'home',
      'Personal Information': 'user',
      'Finance': 'dollar-sign',
      'Login': 'log-in'
    };
    function renderSuggestions(query) {
      searchSuggestions.innerHTML = '';
      if (!query || !universalReady) {
        searchSuggestions.classList.remove('active');
        header.classList.remove('search-dropdown-open');
        return;
      }
      // Search all indexed content
      const results = [];
      for (const entry of universalIndex) {
        const idx = entry.text.toLowerCase().indexOf(query);
        if (idx !== -1) {
          // Highlight in page/tab
          const pageLabel = entry.page.replace(new RegExp(query, 'ig'), m => `<span class="search-suggestion-highlight">${m}</span>`);
          const tabLabel = entry.tab ? entry.tab.replace(new RegExp(query, 'ig'), m => `<span class="search-suggestion-highlight">${m}</span>`) : '';
          // Show a snippet
          const snippet = entry.text.substring(Math.max(0, idx-30), idx+70).replace(new RegExp(query, 'ig'), m => `<span class="search-suggestion-highlight">${m}</span>`);
          results.push({
            page: entry.page,
            file: entry.file,
            tab: entry.tab,
            anchor: entry.anchor,
            snippet,
            pageLabel,
            tabLabel
          });
        }
      }
      currentResults = results;
      activeIdx = -1;
      if (results.length === 0) {
        const div = document.createElement('div');
        div.className = 'search-suggestion-item';
        div.innerHTML = `<span style='color:#888;'>No results found.<br><span style='font-size:0.95em;'>Try a different keyword or check your spelling.</span></span>`;
        searchSuggestions.appendChild(div);
        searchSuggestions.classList.add('active');
        header.classList.add('search-dropdown-open');
        return;
      }
      results.slice(0, 10).forEach((result, i) => {
        const div = document.createElement('div');
        div.className = 'search-suggestion-item';
        div.innerHTML = `
          <span style='display:flex;align-items:center;gap:0.5em;'>
            <i data-feather='${PAGE_ICONS[result.page] || 'file'}' style='width:1.1em;height:1.1em;vertical-align:middle;'></i>
            <b>${result.pageLabel}</b>${result.tabLabel ? ' &mdash; <i>'+result.tabLabel+'</i>' : ''}
          </span>
          <div style='font-size:0.95em;margin-top:0.2em;'>${result.snippet}</div>
        `;
        div.tabIndex = 0;
        div.addEventListener('mousedown', function(e) {
          e.preventDefault();
          selectUniversalSuggestion(i);
        });
        searchSuggestions.appendChild(div);
        if (i < results.length-1) {
          const hr = document.createElement('hr');
          hr.style.margin = '0.3em 0';
          hr.style.border = 'none';
          hr.style.borderTop = '1px solid #eee';
          searchSuggestions.appendChild(hr);
        }
      });
      searchSuggestions.classList.add('active');
      header.classList.add('search-dropdown-open');
      feather.replace();
    }
    function selectUniversalSuggestion(idx) {
      const result = currentResults[idx];
      if (!result) return;
      searchSuggestions.classList.remove('active');
      header.classList.remove('search-active');
      if (window.location.pathname.endsWith(result.file)) {
        // Same page: switch tab if needed
        if (result.anchor) {
          const tabBtn = document.querySelector(`[data-tab='${result.anchor.replace('tab-','')}']`);
          if (tabBtn) tabBtn.click();
          setTimeout(() => {
            const tabDiv = document.getElementById(result.anchor);
            if (tabDiv) {
              const regex = new RegExp(searchInput.value.trim(), 'ig');
              highlightMatchesInNode(tabDiv, regex);
              setTimeout(() => {
                tabDiv.querySelectorAll('.search-match-highlight').forEach(span => span.classList.add('fade'));
                setTimeout(() => {
                  tabDiv.querySelectorAll('.search-match-highlight').forEach(span => span.outerHTML = span.innerText);
                }, 500);
              }, 2000);
              tabDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 200);
        }
      } else {
        // Go to another page
        let url = result.file;
        if (result.anchor) url += '#' + result.anchor + '|search=' + encodeURIComponent(searchInput.value.trim());
        window.location.href = url;
      }
    }
    searchInput.addEventListener('input', function() {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        renderSuggestions(searchInput.value.trim().toLowerCase());
      }, 120);
    });
    searchInput.addEventListener('keydown', function(e) {
      const items = Array.from(searchSuggestions.querySelectorAll('.search-suggestion-item'));
      if (!items.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = (activeIdx + 1) % items.length;
        items.forEach((el, i) => el.classList.toggle('active', i === activeIdx));
        items[activeIdx].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = (activeIdx - 1 + items.length) % items.length;
        items.forEach((el, i) => el.classList.toggle('active', i === activeIdx));
        items[activeIdx].focus();
      } else if (e.key === 'Enter') {
        if (activeIdx >= 0) {
          selectUniversalSuggestion(activeIdx);
        }
      } else if (e.key === 'Escape') {
        searchSuggestions.classList.remove('active');
        header.classList.remove('search-dropdown-open');
      }
    });
  }

  // Utility: recursively highlight all matches in a node
  function highlightMatchesInNode(node, regex) {
    if (node.nodeType === 3) { // Text node
      const match = node.data.match(regex);
      if (match) {
        const span = document.createElement('span');
        span.innerHTML = node.data.replace(regex, m => `<span class='search-match-highlight'>${m}</span>`);
        node.replaceWith(...span.childNodes);
        return true;
      }
    } else if (node.nodeType === 1 && node.childNodes) {
      let found = false;
      Array.from(node.childNodes).forEach(child => {
        if (highlightMatchesInNode(child, regex)) found = true;
      });
      return found;
    }
    return false;
  }

  // On page load, if location.hash contains '|search=', robustly highlight the match
  if (window.location.hash && window.location.hash.includes('|search=')) {
    const [anchor, search] = window.location.hash.slice(1).split('|search=');
    const tabDiv = document.getElementById(anchor);
    if (tabDiv && search) {
      const regex = new RegExp(decodeURIComponent(search), 'ig');
      highlightMatchesInNode(tabDiv, regex);
      setTimeout(() => {
        tabDiv.querySelectorAll('.search-match-highlight').forEach(span => span.classList.add('fade'));
        setTimeout(() => {
          tabDiv.querySelectorAll('.search-match-highlight').forEach(span => span.outerHTML = span.innerText);
        }, 500);
      }, 2000);
      tabDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Clean up hash
      history.replaceState(null, '', window.location.pathname + window.location.search + '#' + anchor);
    }
  }
}); 