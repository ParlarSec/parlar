// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target element
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      // Scroll to the target element with smooth behavior
      window.scrollTo({
        top: targetElement.offsetTop - 80,  // Adjusting for sticky nav height
        behavior: 'smooth'
      });
    });
  });
  
  // Adding Neon Glow Animation on Hover for Links
  const links = document.querySelectorAll('nav a, footer a');
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.animation = 'neonGlow 1.5s ease-in-out infinite alternate';
    });
  
    link.addEventListener('mouseleave', () => {
      link.style.animation = 'none';  // Reset animation
    });
  });
  
  // Scroll-to-Top Button with Animation
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerText = '↑';
  scrollToTopBtn.classList.add('scroll-to-top');
  document.body.appendChild(scrollToTopBtn);
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.onscroll = function() {
    // Toggle the visibility of the scroll-to-top button
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  };
  
  // Neon Glow Keyframes Animation
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
  @keyframes neonGlow {
    0% {
      text-shadow: 0 0 10px #ff0080, 0 0 20px #ff0080, 0 0 30px #ff0080, 0 0 40px #ff0080;
    }
    100% {
      text-shadow: 0 0 20px #ff0080, 0 0 40px #ff0080, 0 0 60px #ff0080, 0 0 80px #ff0080;
    }
  }
  `, styleSheet.cssRules.length);
  
// Start "Security Scan" (Hacking Effect)
document.getElementById('startHackBtn').addEventListener('click', function() {
    document.getElementById('console').style.display = 'block';
    startHackingSimulation();
  });
  
  // Simulate Hacking (Console Output)
  function startHackingSimulation() {
    const consoleOutput = document.getElementById('console-output');
    
    // Messages for the hacking simulation
    const messages = [
      'Scanning network...',
      'Connection established...',
      'Analyzing system...',
      'Bypassing security...',
      'Injecting payload...',
      'Accessing files...',
      'Security breach detected!',
      'Initiating countermeasures...',
      'Breach successful...'
    ];
  
    let i = 0;
    let intervalId = setInterval(() => {
      if (i < messages.length) {
        consoleOutput.textContent += '\n' + messages[i];
        i++;
      } else {
        clearInterval(intervalId);
        showSecurityBreachAlert();
      }
    }, 1500);
  }
  
  // Simulate Security Breach Warning
  function showSecurityBreachAlert() {
    alert('WARNING: Security Breach Detected! Initiating Containment Protocol.');
    document.getElementById('console-output').textContent += '\n[ALERT] SYSTEM COMPROMISED!';
  }
  
  // Neon Flickering Effect for Terminal Output
  setInterval(() => {
    const console = document.getElementById('console-output');
    if (console.style.color === 'rgb(0, 255, 0)') {
      console.style.color = '#ddd';
    } else {
      console.style.color = 'rgb(0, 255, 0)';
    }
  }, 300);
  