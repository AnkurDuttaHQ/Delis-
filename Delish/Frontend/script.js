AOS.init();

// =========================
// Navbar scroll
// =========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled'); // semi-yellow background
  } else {
    navbar.classList.remove('scrolled'); // transparent
  }
});

// =========================
// Menu filter
// =========================
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    menuItems.forEach(item => {
      item.style.display = (filter === 'all' || item.dataset.category === filter) 
        ? 'block' 
        : 'none';
    });
  });
});

// =========================
// Dark/Light mode toggle
// =========================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function updateThemeIcon() {
  themeIcon.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '🌞';
}

function applyNavbarTheme() {
  if (document.body.classList.contains('dark-mode')) {
    navbar.classList.add('dark-mode');
    navbar.classList.remove('light-mode');
  } else {
    navbar.classList.add('light-mode');
    navbar.classList.remove('dark-mode');
  }
}

// Toggle theme on click
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  applyNavbarTheme();
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  updateThemeIcon();
});

// Load saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
} else {
  document.body.classList.remove('dark-mode');
}
applyNavbarTheme();
updateThemeIcon();

// =========================
// Scroll progress & Back to Top
// =========================
const progressBar = document.getElementById('progress-bar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';

  backToTop.style.display = scrollTop > 200 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================
// Booking form
// =========================
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    alert("Booking Submitted!");
  });
}

// =========================
// Pie chart random %
// =========================
document.querySelectorAll(".pie-chart").forEach((chart) => {
  const percent = Math.floor(Math.random() * 101);
  chart.style.background = `conic-gradient(#fa812f 0% ${percent}%, #fab12f ${percent}% 100%)`;
  chart.nextElementSibling.textContent = percent + "%";
});

// =========================
// Pagination for reviews
// =========================
const cardsPerPage = 3;
const cols = document.querySelectorAll(".review-cards-row > .col-md-4");
const pageNums = document.querySelectorAll(".page-num");

function showPage(page) {
  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage;

  cols.forEach((col, index) => {
    col.classList.toggle("hidden", index < start || index >= end);
  });

  pageNums.forEach(num => num.classList.remove("active"));
  const activePage = document.querySelector(`.page-num[data-page="${page}"]`);
  if (activePage) activePage.classList.add("active");
}

// Initial page
showPage(1);

// Page click events
pageNums.forEach(num => {
  num.addEventListener("click", () => {
    const page = parseInt(num.getAttribute("data-page"));
    showPage(page);
  });
});