document.querySelector('.nav-toggle').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});
setTimeout(() => {
    navLinks.style.display = 'none';
}, 3);
