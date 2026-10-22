
/* =========================================================
   SHARED SCRIPT FOR EVERY PAGE
   ========================================================= */

const CONTACT_EMAIL = "you@yourcompany.com";

// Update the copyright year
document.querySelectorAll(".yr").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "Close" : "Menu";
  });
}

// Quote popup
const dlg = document.getElementById("enquiry");

if (dlg) {
  document.querySelectorAll("[data-enquire]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const error = dlg.querySelector(".error");
      if (error) error.textContent = "";
      if (!dlg.open) dlg.showModal();
    });
  });

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => dlg.close());
  });
}

// Enquiry form
document.querySelectorAll("form.enq").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const err = form.querySelector(".error");
    const val = (name) =>
      form.elements[name] ? form.elements[name].value.trim() : "";

    const missing = [
      ...form.querySelectorAll("[required]")
    ].filter((field) => !field.value.trim());

    if (missing.length) {
      if (err) {
        err.textContent =
          "Please fill in all required fields.";
      }
      missing[0].focus();
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(val("email"))) {
      if (err) err.textContent = "Enter a valid email address.";
      if (form.elements.email) form.elements.email.focus();
      return;
    }

    const fields = [
      ["Name", "name"],
      ["Email", "email"],
      ["Company", "company"],
      ["Quantity", "quantity"],
      ["Needed", "needed"]
    ];

    const details = fields
      .map(([label, key]) =>
        val(key) ? `${label}: ${val(key)}` : ""
      )
      .filter(Boolean)
      .join("\n");

    const body = `${details}\n\n${val("message")}`;
    const subject = "Quote request from " + val("company");

    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    if (dlg && dlg.open) dlg.close();
  });
});

// =========================================================
// CERTIFICATE LOGO SLIDER
// Moves the first logo to the end for continuous scrolling.
// Uses the existing .cert-slider and .cert-track HTML.
// =========================================================

(function () {
  const slider = document.querySelector(".cert-slider");
  if (!slider) return;

  const track = slider.querySelector(".cert-track");
  if (!track || track.children.length < 2) return;

  // Respect the visitor's reduced-motion preference.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const SPEED = 0.8; // Pixels per animation frame
  let position = 0;
  let paused = false;
  let animationId;

  function getGap() {
    return parseFloat(window.getComputedStyle(track).columnGap) ||
           parseFloat(window.getComputedStyle(track).gap) || 24;
  }

  function animate() {
    if (!paused) {
      const first = track.firstElementChild;

      if (first) {
        const distance = first.getBoundingClientRect().width + getGap();

        position += SPEED;

        if (position >= distance) {
          position -= distance;
          track.appendChild(first);
        }

        track.style.transform = `translate3d(${-position}px, 0, 0)`;
      }
    }

    animationId = window.requestAnimationFrame(animate);
  }

  slider.addEventListener("mouseenter", () => {
    paused = true;
  });

  slider.addEventListener("mouseleave", () => {
    paused = false;
  });

  slider.addEventListener("focusin", () => {
    paused = true;
  });

  slider.addEventListener("focusout", () => {
    paused = false;
  });

  // Start only after the browser has loaded the page.
  animationId = window.requestAnimationFrame(animate);

  // Stop the animation if the page is hidden.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.cancelAnimationFrame(animationId);
    } else {
      animationId = window.requestAnimationFrame(animate);
    }
  });
})();

// =========================================================
// OTHER SLIDESHOW (.dw-*)
// Used on pages containing the matching slideshow elements.
// =========================================================

(function () {
  const slides = document.querySelectorAll(".dw-slide");
  const dots = document.querySelectorAll(".dw-dot");
  const container = document.querySelector(".dw-slider");
  const prev = document.querySelector(".dw-prev");
  const next = document.querySelector(".dw-next");

  if (!slides.length || !container) return;

  let current = 0;
  let timer = null;

  function goTo(index) {
    slides[current].classList.remove("active");
    if (dots[current]) dots[current].classList.remove("active");

    current = (index + slides.length) % slides.length;

    slides[current].classList.add("active");
    if (dots[current]) dots[current].classList.add("active");
  }

  function stopTimer() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(() => goTo(current + 1), 3000);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number.parseInt(dot.dataset.index, 10);
      if (Number.isNaN(index)) return;
      goTo(index);
      startTimer();
    });
  });

  if (prev) {
    prev.addEventListener("click", () => {
      goTo(current - 1);
      startTimer();
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      goTo(current + 1);
      startTimer();
    });
  }

  container.addEventListener("mouseenter", stopTimer);
  container.addEventListener("mouseleave", startTimer);

  startTimer();
})();
// =========================================================
// CATEGORY NAV — smooth scroll + active highlight
// =========================================================
(function () {
  document.querySelectorAll('.cat-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const sections = document.querySelectorAll('#cat-1,#cat-2,#cat-3,#cat-4,#cat-5');
  const links = document.querySelectorAll('.cat-link');

    if (sections.length && links.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => {
            l.classList.toggle('active',
              l.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));
  }
})();