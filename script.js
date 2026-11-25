// ===== Mohamed Yossef — Portfolio =====

// Small helper: run a setup function only if its element exists.
// Prevents one missing element from breaking every feature after it.
const on = (el, fn) => { if (el) fn(el); };

// Current year in footer
on(document.getElementById("year"), (el) => {
  el.textContent = new Date().getFullYear();
});

// Navbar border on scroll
on(document.getElementById("navbar"), (navbar) => {
  window.addEventListener(
    "scroll",
    () => navbar.classList.toggle("scrolled", window.scrollY > 10),
    { passive: true }
  );
});

// Mobile menu
on(document.getElementById("hamburger"), (hamburger) => {
  const navLinks = document.getElementById("navLinks");
  if (!navLinks) return;
  const setMenuOpen = (isOpen) => {
    hamburger.classList.toggle("active", isOpen);
    navLinks.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  };

  hamburger.addEventListener("click", () => {
    setMenuOpen(hamburger.getAttribute("aria-expanded") !== "true");
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && hamburger.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      hamburger.focus();
    }
  });
  // Close menu when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => setMenuOpen(false))
  );
});

// Reveal-on-scroll animation
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  // Very old browser: show everything immediately instead of hiding it forever
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}
