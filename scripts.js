document.querySelector('.nav-toggle').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});


let lastScrollTop = 0;
const navToggle = document.querySelector('.nav-toggle');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScrollTop) {
    // Scrolling down, hide the nav container
    navToggle.style.height = '0';
  } else {
    // Scrolling up, show the nav container
    navToggle.style.height = '50px';
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});
