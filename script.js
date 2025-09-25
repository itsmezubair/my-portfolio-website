document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Navbar Scroll Effect ---
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- 2. Typed.js Initialization (Declared here, initialized in animation) ---
  let typed;
  const typedOptions = {
    strings: ["Web Developer", "Programmer", "Problem Solver"],
    typeSpeed: 50,
    backSpeed: 25,
    loop: true,
  };

  // --- 3. Particles.js Initialization ---
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#00BFFF" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00BFFF",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: { distance: 200 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });

  // --- 4. NEW Hero Section Entry Animation ---
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function typewriter(element, text, speed = 100) {
    for (let i = 0; i < text.length; i++) {
      element.textContent += text[i];
      await sleep(speed);
    }
    element.classList.add("typing-done");
  }

  async function startHeroAnimation() {
    const introLine = document.getElementById("intro-line");
    const nameLine = document.getElementById("name-line");
    const heroContent = document.querySelector(".hero-content");

    // Animation Sequence
    introLine.classList.add("animate");
    await sleep(500);

    // Start typing the name and simultaneously schedule the rest
    typewriter(nameLine, "Muhammad Zubair", 110);

    // Schedule the rest of the animations to start while the name is typing
    // After "Muhammad " is typed (8 chars * 110ms ≈ 900ms)
    await sleep(900);

    const h2Element = heroContent.querySelector("h2");
    h2Element.classList.add("animate");
    if (!typed) {
      typed = new Typed("#typed-text", typedOptions);
    }

    // Stagger the remaining items
    setTimeout(() => {
      heroContent.querySelector(".social-links").classList.add("animate");
    }, 200);

    setTimeout(() => {
      heroContent.querySelector(".hero-buttons").classList.add("animate");
    }, 400);
  }

  window.onload = () => {
    startHeroAnimation();
  };

  // --- 5. Intersection Observer for Scroll Animations ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
  elementsToAnimate.forEach((el) => observer.observe(el));

  // --- 6. Staggered Animation Delay for Cards ---
  const grids = document.querySelectorAll(".skills-grid, .projects-grid");
  grids.forEach((grid) => {
    const cards = grid.querySelectorAll(".skill-card, .project-card");
    cards.forEach((card, index) => {
      card.style.setProperty("--delay", `${index * 100}ms`);
    });
  });

  // --- 7. Mobile Menu Toggle ---
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("is-active");
    navLinks.classList.toggle("nav-active");
  });

  // --- 8. Close mobile menu when a link is clicked ---
  const allNavLinks = document.querySelectorAll(".nav-links a");
  allNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("nav-active")) {
        menuToggle.classList.remove("is-active");
        navLinks.classList.remove("nav-active");
      }
    });
  });
});
