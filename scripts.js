document.querySelector('.nav-toggle').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});
setTimeout(() => {
    consoleElement.style.display = 'none';
    consoleOutput.textContent = '';
}, 3);
