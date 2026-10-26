/**
 * TicketSetu - Train Ticket Exchange Platform
 * Main JavaScript Engine
 */

// Storage Keys
const STORAGE_KEY = 'ticketsetu_tickets';
const USER_LISTED_KEY = 'ticketsetu_user_ticket_ids';

// Helper to format date offset from today (YYYY-MM-DD)
function getOffsetDateString(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Format date for display: "28 Oct, 2026" or "Tomorrow, 28 Oct"
function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(d);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = target - today;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatted = `${target.getDate()} ${months[target.getMonth()]}, ${target.getFullYear()}`;
  
  if (diffDays === 0) return `Today, ${formatted}`;
  if (diffDays === 1) return `Tomorrow, ${formatted}`;
  return formatted;
}

// Sample Seed Tickets
function getSeedTickets() {
  return [
    {
      id: 'tkt_seed_1',
      trainName: 'Vidarbha Express',
      trainNumber: '17618',
      from: 'Pune',
      to: 'Malkapur',
      date: getOffsetDateString(1),
      departureTime: '19:00',
      arrivalTime: '05:15',
      ticketType: 'Sleeper',
      seats: 2,
      price: 350,
      sellerName: 'Rahul Deshmukh',
      sellerPhone: '9823012345',
      notes: 'Confirmed Lower and Middle berths in S4 coach. Can transfer directly or meet at Pune station.',
      isUserListed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'tkt_seed_2',
      trainName: 'Deccan Express',
      trainNumber: '11007',
      from: 'Mumbai',
      to: 'Pune',
      date: getOffsetDateString(2),
      departureTime: '07:00',
      arrivalTime: '11:05',
      ticketType: '3AC',
      seats: 1,
      price: 580,
      sellerName: 'Priya Sharma',
      sellerPhone: '9822154321',
      notes: 'Confirmed Side Lower berth in B2 coach. Work trip cancelled.',
      isUserListed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'tkt_seed_3',
      trainName: 'Duronto Express',
      trainNumber: '12290',
      from: 'Nagpur',
      to: 'Mumbai',
      date: getOffsetDateString(3),
      departureTime: '20:40',
      arrivalTime: '08:05',
      ticketType: '2AC',
      seats: 2,
      price: 1450,
      sellerName: 'Amitabh Sen',
      sellerPhone: '9833445566',
      notes: 'Confirmed 2AC tickets with food included. Direct instant transfer.',
      isUserListed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'tkt_seed_4',
      trainName: 'Godavari Express',
      trainNumber: '12139',
      from: 'Pune',
      to: 'Nashik',
      date: getOffsetDateString(1),
      departureTime: '06:15',
      arrivalTime: '11:45',
      ticketType: 'Sleeper',
      seats: 3,
      price: 280,
      sellerName: 'Sachin Patil',
      sellerPhone: '9765432109',
      notes: 'Confirmed 3 seats in S2 coach together. Family postponed trip.',
      isUserListed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'tkt_seed_5',
      trainName: 'Rajdhani Express',
      trainNumber: '12951',
      from: 'Delhi',
      to: 'Mumbai',
      date: getOffsetDateString(4),
      departureTime: '16:55',
      arrivalTime: '08:35',
      ticketType: '3AC',
      seats: 1,
      price: 2100,
      sellerName: 'Vikas Malhotra',
      sellerPhone: '9811223344',
      notes: 'Confirmed 3AC ticket, includes meals. Genuine travelers only.',
      isUserListed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'tkt_seed_6',
      trainName: 'Ajanta Express',
      trainNumber: '17063',
      from: 'Hyderabad',
      to: 'Pune',
      date: getOffsetDateString(2),
      departureTime: '18:10',
      arrivalTime: '06:40',
      ticketType: 'Sleeper',
      seats: 1,
      price: 420,
      sellerName: 'Kiran Reddy',
      sellerPhone: '9949112233',
      notes: 'Confirmed Sleeper berth S5-34. Safe exchange on call.',
      isUserListed: false,
      createdAt: new Date().toISOString()
    }
  ];
}

// LocalStorage Management
function getTickets() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const seed = getSeedTickets();
    saveTickets(seed);
    return seed;
  }
  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const seed = getSeedTickets();
      saveTickets(seed);
      return seed;
    }
    return parsed;
  } catch (e) {
    console.error('Error parsing tickets from localStorage', e);
    const seed = getSeedTickets();
    saveTickets(seed);
    return seed;
  }
}

function saveTickets(tickets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

function getUserTicketIds() {
  try {
    const ids = localStorage.getItem(USER_LISTED_KEY);
    return ids ? JSON.parse(ids) : [];
  } catch (e) {
    return [];
  }
}

function addUserTicketId(id) {
  const ids = getUserTicketIds();
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(USER_LISTED_KEY, JSON.stringify(ids));
  }
}

function removeUserTicketId(id) {
  const ids = getUserTicketIds().filter(item => item !== id);
  localStorage.setItem(USER_LISTED_KEY, JSON.stringify(ids));
}

// Toast Notifications
function showToast(title, message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconClass = 'fa-info-circle';
  if (type === 'success') iconClass = 'fa-check-circle';
  if (type === 'danger') iconClass = 'fa-exclamation-circle';
  if (type === 'warning') iconClass = 'fa-exclamation-triangle';

  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas ${iconClass}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <div class="toast-close" title="Close">
      <i class="fas fa-times"></i>
    </div>
  `;

  container.appendChild(toast);

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    dismissToast(toast);
  });

  setTimeout(() => {
    dismissToast(toast);
  }, 4500);
}

function dismissToast(toast) {
  toast.classList.add('hiding');
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}

// Copy to Clipboard
function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied', successMsg, 'success');
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('Copied', successMsg, 'success');
  } catch (err) {
    showToast('Oops', 'Could not copy to clipboard', 'danger');
  }
  document.body.removeChild(textArea);
}

// Ticket Badge Helper
function getTicketTypeBadgeClass(type) {
  if (!type) return 'badge-general';
  const clean = type.toLowerCase().trim();
  if (clean.includes('sleep') || clean === 'sl') return 'badge-sleeper';
  if (clean.includes('3a') || clean.includes('3 ac') || clean.includes('3ac')) return 'badge-3ac';
  if (clean.includes('2a') || clean.includes('2 ac') || clean.includes('2ac')) return 'badge-2ac';
  if (clean.includes('1a') || clean.includes('1 ac') || clean.includes('1ac')) return 'badge-1ac';
  return 'badge-general';
}

// Ticket Card HTML Generator
function createTicketCardHTML(ticket, options = {}) {
  const showDelete = options.showDelete || false;
  const badgeClass = getTicketTypeBadgeClass(ticket.ticketType);
  const formattedDate = formatDisplayDate(ticket.date);
  const initials = (ticket.sellerName || 'TS')
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const cleanPhone = (ticket.sellerPhone || '').replace(/\D/g, '');
  const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const waText = encodeURIComponent(`Hi ${ticket.sellerName}, I saw your TicketSetu listing for ${ticket.trainName} (${ticket.from} to ${ticket.to}) on ${ticket.date}. Is it still available?`);

  return `
    <article class="ticket-card" data-ticket-id="${ticket.id}">
      <div class="ticket-header">
        <div class="train-title-wrap">
          <span class="train-name">${ticket.trainName}</span>
          <span class="train-number">Train #${ticket.trainNumber}</span>
        </div>
        <div style="display: flex; gap: 0.4rem; align-items: center;">
          <span class="badge ${badgeClass}"><i class="fas fa-ticket-alt"></i> ${ticket.ticketType}</span>
          ${showDelete ? `
            <button class="btn btn-sm btn-danger-outline delete-ticket-btn" data-id="${ticket.id}" title="Remove Listing">
              <i class="fas fa-trash-alt"></i> Delete
            </button>
          ` : ''}
        </div>
      </div>

      <div class="ticket-body">
        <div class="route-visualizer">
          <div class="station-point from">
            <span class="station-name" title="${ticket.from}">${ticket.from}</span>
            <span class="station-time"><i class="far fa-clock"></i> ${ticket.departureTime || '--:--'}</span>
          </div>

          <div class="route-connector">
            <i class="fas fa-train"></i>
            <div class="route-line"></div>
          </div>

          <div class="station-point to">
            <span class="station-name" title="${ticket.to}">${ticket.to}</span>
            <span class="station-time"><i class="far fa-clock"></i> ${ticket.arrivalTime || '--:--'}</span>
          </div>
        </div>

        <div class="ticket-meta-row">
          <div class="date-pill">
            <i class="far fa-calendar-alt"></i>
            <span>${formattedDate}</span>
          </div>
          <div class="seats-pill">
            <i class="fas fa-user-friends"></i>
            <span>${ticket.seats || 1} Seat${(ticket.seats || 1) > 1 ? 's' : ''}</span>
          </div>
        </div>

        ${ticket.notes ? `
          <div class="ticket-note-box">
            <i class="fas fa-info-circle"></i> ${ticket.notes}
          </div>
        ` : ''}
      </div>

      <div class="ticket-footer">
        <div class="price-seller-bar">
          <div class="seller-info">
            <div class="seller-avatar">${initials}</div>
            <div class="seller-details">
              <span class="seller-name">${ticket.sellerName || 'Verified Member'}</span>
              <span class="seller-tag"><i class="fas fa-shield-alt"></i> Verified Seller</span>
            </div>
          </div>

          <div class="price-display">
            <div class="price-label">Price per seat</div>
            <div class="price-amount">₹${ticket.price}</div>
          </div>
        </div>

        <div class="ticket-actions">
          <a href="tel:${cleanPhone}" class="btn btn-call" title="Call ${ticket.sellerName}">
            <i class="fas fa-phone-alt"></i> Call Seller
          </a>
          <a href="https://wa.me/${waPhone}?text=${waText}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" title="WhatsApp ${ticket.sellerName}">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>
    </article>
  `;
}

// Initialize Navigation & Mobile Menu
function initNavigation() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close when clicking nav-link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggle.contains(e.target) && navMenu.classList.contains('open')) {
        toggle.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  }
}

// Animated Counters for Homepage
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  let hasAnimated = false;

  const animate = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out quadratic formula
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeProgress * target);

        counter.textContent = currentVal.toLocaleString('en-IN');

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target.toLocaleString('en-IN') + (counter.getAttribute('data-suffix') || '');
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animate();
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    } else {
      animate();
    }
  } else {
    animate();
  }
}

// Homepage Logic
function initHomePage() {
  initAnimatedCounters();

  // Populate dynamic recent tickets preview if container exists
  const previewContainer = document.getElementById('recent-tickets-preview');
  if (previewContainer) {
    const all = getTickets();
    const recent = all.slice(0, 3);
    if (recent.length > 0) {
      previewContainer.innerHTML = recent.map(t => createTicketCardHTML(t)).join('');
    }
  }

  // Hero Quick Search Form Handler
  const heroForm = document.getElementById('hero-search-form');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const from = heroForm.querySelector('[name="from"]').value.trim();
      const to = heroForm.querySelector('[name="to"]').value.trim();
      const date = heroForm.querySelector('[name="date"]').value;

      const params = new URLSearchParams();
      if (from) params.set('from', from);
      if (to) params.set('to', to);
      if (date) params.set('date', date);

      window.location.href = `search.html?${params.toString()}`;
    });

    // Swap stations button in hero
    const heroSwapBtn = document.getElementById('hero-swap-stations');
    if (heroSwapBtn) {
      heroSwapBtn.addEventListener('click', () => {
        const fromInput = heroForm.querySelector('[name="from"]');
        const toInput = heroForm.querySelector('[name="to"]');
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
      });
    }

    // Set min date for hero datepicker to today
    const heroDateInput = heroForm.querySelector('[name="date"]');
    if (heroDateInput) {
      heroDateInput.min = getOffsetDateString(0);
    }
  }
}

// Search Page Logic
function initSearchPage() {
  const searchForm = document.getElementById('ticket-search-form');
  const resultsContainer = document.getElementById('search-results-grid');
  const emptyState = document.getElementById('search-empty-state');
  const resultsCount = document.getElementById('results-count-text');
  const sortSelect = document.getElementById('sort-tickets-select');
  const swapBtn = document.getElementById('search-swap-stations');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');

  if (!resultsContainer) return;

  // Set min date for search date picker
  const dateInput = searchForm ? searchForm.querySelector('[name="date"]') : null;
  if (dateInput) {
    dateInput.min = getOffsetDateString(0);
  }

  // Swap stations button handler
  if (swapBtn && searchForm) {
    swapBtn.addEventListener('click', () => {
      const fromInput = searchForm.querySelector('[name="from"]');
      const toInput = searchForm.querySelector('[name="to"]');
      const temp = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = temp;
      performFilter();
    });
  }

  // Pre-fill from URL parameters (e.g. from homepage search or bookmark)
  const urlParams = new URLSearchParams(window.location.search);
  if (searchForm) {
    if (urlParams.get('from')) searchForm.querySelector('[name="from"]').value = urlParams.get('from');
    if (urlParams.get('to')) searchForm.querySelector('[name="to"]').value = urlParams.get('to');
    if (urlParams.get('date')) searchForm.querySelector('[name="date"]').value = urlParams.get('date');
    if (urlParams.get('type')) searchForm.querySelector('[name="type"]').value = urlParams.get('type');
  }

  // Quick Filter Chips (e.g., Pune to Malkapur, Mumbai to Pune)
  const chips = document.querySelectorAll('.chip-btn');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const fromVal = chip.getAttribute('data-from');
      const toVal = chip.getAttribute('data-to');
      if (searchForm) {
        if (fromVal !== null) searchForm.querySelector('[name="from"]').value = fromVal;
        if (toVal !== null) searchForm.querySelector('[name="to"]').value = toVal;
        performFilter();
      }
    });
  });

  // Filter Execution
  function performFilter() {
    const allTickets = getTickets();
    const fromQuery = (searchForm ? searchForm.querySelector('[name="from"]').value : '').trim().toLowerCase();
    const toQuery = (searchForm ? searchForm.querySelector('[name="to"]').value : '').trim().toLowerCase();
    const dateQuery = searchForm ? searchForm.querySelector('[name="date"]').value : '';
    const typeQuery = (searchForm ? searchForm.querySelector('[name="type"]').value : '').toLowerCase();
    const sortBy = sortSelect ? sortSelect.value : 'default';

    const filtered = allTickets.filter(t => {
      // Station matching: partial matching
      const matchFrom = !fromQuery || t.from.toLowerCase().includes(fromQuery);
      const matchTo = !toQuery || t.to.toLowerCase().includes(toQuery);

      // Date matching: exact match if user specified a date
      const matchDate = !dateQuery || t.date === dateQuery;

      // Class/Type matching
      let matchType = true;
      if (typeQuery && typeQuery !== 'all') {
        const ticketTypeLower = t.ticketType.toLowerCase();
        matchType = ticketTypeLower.includes(typeQuery) || 
                    (typeQuery === 'sleeper' && (ticketTypeLower.includes('sl') || ticketTypeLower.includes('sleep'))) ||
                    (typeQuery === '3ac' && (ticketTypeLower.includes('3a') || ticketTypeLower.includes('3 ac'))) ||
                    (typeQuery === '2ac' && (ticketTypeLower.includes('2a') || ticketTypeLower.includes('2 ac'))) ||
                    (typeQuery === '1ac' && (ticketTypeLower.includes('1a') || ticketTypeLower.includes('1 ac')));
      }

      return matchFrom && matchTo && matchDate && matchType;
    });

    // Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'time-early') {
      filtered.sort((a, b) => (a.departureTime || '').localeCompare(b.departureTime || ''));
    } else if (sortBy === 'date-soon') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Render Results
    renderResults(filtered);
  }

  function renderResults(tickets) {
    if (tickets.length === 0) {
      resultsContainer.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (resultsCount) resultsCount.textContent = 'No tickets match your criteria';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      resultsContainer.innerHTML = tickets.map(t => createTicketCardHTML(t)).join('');
      if (resultsCount) {
        resultsCount.textContent = `Showing ${tickets.length} available train ticket${tickets.length > 1 ? 's' : ''}`;
      }
    }
  }

  // Event Listeners
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      performFilter();
    });

    // Real-time filtering on input change
    searchForm.querySelectorAll('input, select').forEach(input => {
      input.addEventListener('input', () => {
        performFilter();
      });
      input.addEventListener('change', () => {
        performFilter();
      });
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', performFilter);
  }

  if (clearFiltersBtn && searchForm) {
    clearFiltersBtn.addEventListener('click', () => {
      searchForm.reset();
      performFilter();
      showToast('Filters Reset', 'Showing all available tickets', 'info');
    });
  }

  // Initial render
  performFilter();
}

// Add Ticket Page Logic
function initAddTicketPage() {
  const form = document.getElementById('add-ticket-form');
  const myListingsContainer = document.getElementById('my-tickets-grid');
  const emptyMyListings = document.getElementById('my-tickets-empty');

  // Set min date to today
  const dateInput = document.getElementById('ticket-date');
  if (dateInput) {
    dateInput.min = getOffsetDateString(0);
    dateInput.value = getOffsetDateString(1); // default to tomorrow
  }

  // Render My Listed Tickets
  function renderMyTickets() {
    if (!myListingsContainer) return;
    const all = getTickets();
    const userIds = getUserTicketIds();
    
    // Filter tickets that were created by user or flagged isUserListed
    const myTickets = all.filter(t => t.isUserListed === true || userIds.includes(t.id));

    if (myTickets.length === 0) {
      myListingsContainer.innerHTML = '';
      if (emptyMyListings) emptyMyListings.style.display = 'block';
    } else {
      if (emptyMyListings) emptyMyListings.style.display = 'none';
      myListingsContainer.innerHTML = myTickets.map(t => createTicketCardHTML(t, { showDelete: true })).join('');

      // Attach Delete Handlers
      myListingsContainer.querySelectorAll('.delete-ticket-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const ticketId = btn.getAttribute('data-id');
          handleDeleteTicket(ticketId);
        });
      });
    }
  }

  function handleDeleteTicket(id) {
    if (!confirm('Are you sure you want to remove this ticket listing?')) {
      return;
    }

    const currentTickets = getTickets();
    const updated = currentTickets.filter(t => t.id !== id);
    saveTickets(updated);
    removeUserTicketId(id);

    renderMyTickets();
    showToast('Listing Removed', 'Your ticket listing has been deleted successfully.', 'success');
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect form values
      const trainName = document.getElementById('train-name').value.trim();
      const trainNumber = document.getElementById('train-number').value.trim();
      const from = document.getElementById('from-station').value.trim();
      const to = document.getElementById('to-station').value.trim();
      const date = document.getElementById('ticket-date').value;
      const departureTime = document.getElementById('departure-time').value;
      const arrivalTime = document.getElementById('arrival-time').value;
      const ticketType = document.getElementById('ticket-type').value;
      const seats = parseInt(document.getElementById('seats-count').value, 10) || 1;
      const price = parseFloat(document.getElementById('ticket-price').value);
      const sellerName = document.getElementById('seller-name').value.trim();
      const sellerPhone = document.getElementById('seller-phone').value.trim();
      const notes = document.getElementById('ticket-notes').value.trim();

      // Basic validation
      let isValid = true;

      // Validate Phone: must be 10 digits
      const phoneDigits = sellerPhone.replace(/\D/g, '');
      const phoneInput = document.getElementById('seller-phone');
      if (phoneDigits.length !== 10) {
        phoneInput.classList.add('is-invalid');
        isValid = false;
      } else {
        phoneInput.classList.remove('is-invalid');
      }

      // Validate Price: must be positive
      const priceInput = document.getElementById('ticket-price');
      if (isNaN(price) || price <= 0) {
        priceInput.classList.add('is-invalid');
        isValid = false;
      } else {
        priceInput.classList.remove('is-invalid');
      }

      // Validate Stations: cannot be identical
      const toInput = document.getElementById('to-station');
      if (from.toLowerCase() === to.toLowerCase() && from !== '') {
        toInput.classList.add('is-invalid');
        showToast('Invalid Route', 'From and To stations cannot be identical', 'danger');
        isValid = false;
      } else {
        toInput.classList.remove('is-invalid');
      }

      if (!isValid) {
        showToast('Form Error', 'Please check highlighted fields and try again', 'danger');
        return;
      }

      // Create new ticket object
      const newTicketId = 'tkt_user_' + Date.now();
      const newTicket = {
        id: newTicketId,
        trainName,
        trainNumber,
        from,
        to,
        date,
        departureTime: departureTime || '12:00',
        arrivalTime: arrivalTime || '18:00',
        ticketType,
        seats,
        price,
        sellerName,
        sellerPhone: phoneDigits,
        notes: notes || 'Confirmed ticket. Contact for details.',
        isUserListed: true,
        createdAt: new Date().toISOString()
      };

      // Add to ticket list
      const tickets = getTickets();
      tickets.unshift(newTicket);
      saveTickets(tickets);
      addUserTicketId(newTicketId);

      // Feedback
      showToast('Ticket Listed Successfully! 🎉', `${trainName} (${from} → ${to}) is now live for buyers.`, 'success');

      // Reset form fields (retain seller contact for convenience)
      form.reset();
      document.getElementById('seller-name').value = sellerName;
      document.getElementById('seller-phone').value = sellerPhone;
      document.getElementById('ticket-date').value = getOffsetDateString(1);

      // Re-render my tickets
      renderMyTickets();

      // Smooth scroll to my tickets section
      const myTicketsSec = document.querySelector('.my-tickets-section');
      if (myTicketsSec) {
        myTicketsSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Initial render of my tickets
  renderMyTickets();
}

// FAQ Accordion Logic for About Page
function initAboutPage() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all other accordion items
      document.querySelectorAll('.accordion-item').forEach(other => {
        other.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Document Ready Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  // Always ensure storage seed is loaded
  getTickets();

  // Initialize common components
  initNavigation();

  // Page detection & execution
  const currentPath = window.location.pathname;

  if (currentPath.includes('search.html')) {
    initSearchPage();
  } else if (currentPath.includes('add.html')) {
    initAddTicketPage();
  } else if (currentPath.includes('about.html')) {
    initAboutPage();
  } else {
    // Default / Index page
    initHomePage();
  }
});
