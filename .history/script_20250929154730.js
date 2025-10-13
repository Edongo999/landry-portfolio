// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Check for saved theme preference or use system preference
if (
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  html.classList.add("dark");
} else {
  html.classList.remove("dark");
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    html.classList.contains("dark") ? "dark" : "light"
  );
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// ===== SKILLS FILTER =====
const skillFilters = document.querySelectorAll(".skill-filter");
const skillCards = document.querySelectorAll(".skill-card");

skillFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    // Update active filter button
    skillFilters.forEach((f) =>
      f.classList.remove("bg-primary-600", "text-white")
    );
    skillFilters.forEach((f) =>
      f.classList.add("hover:bg-gray-100", "dark:hover:bg-dark-700")
    );
    filter.classList.add("bg-primary-600", "text-white");
    filter.classList.remove("hover:bg-gray-100", "dark:hover:bg-dark-700");

    // Filter skills
    const category = filter.dataset.category;
    skillCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Here you would typically send the form data to a server
  // For this example, we'll just show a success message
  alert("Thank you for your message! I will get back to you soon.");
  contactForm.reset();
});

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove("opacity-0", "invisible");
    backToTopButton.classList.add("opacity-100", "visible");
  } else {
    backToTopButton.classList.remove("opacity-100", "visible");
    backToTopButton.classList.add("opacity-0", "invisible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== SCROLL ANIMATION =====
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

// ===== ACTIVE NAVIGATION LINK =====
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 300) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-nav");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-nav");
    }
  });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }
  });
});



const roles = [
  "Développeur Web",
  "Développeur Fullstack",
  "Créateur d'expériences numériques",
  "Designer Graphique",
  "Concepteur de sites vitrines",
  "Développeur d'applications Desktop"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.querySelector(".typewriter");

function type() {
  const currentText = roles[roleIndex];

  // Calcul du texte à afficher
  let displayedText = isDeleting
    ? currentText.substring(0, charIndex--)
    : currentText.substring(0, charIndex++);

  typewriterElement.textContent = displayedText;

  let delay = 100;

  // Quand on a fini d’écrire le mot
  if (!isDeleting && charIndex === currentText.length + 1) {
    delay = 2000; // pause après l’écriture complète
    isDeleting = true;
  }

  // Quand on a fini d’effacer le mot
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 500; // petite pause avant le prochain mot
  }

  setTimeout(type, delay);
}

type(); // Démarrer l’effet
