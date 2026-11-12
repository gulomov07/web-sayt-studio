
// LOADER
window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector(".loader").style.opacity = "0";
        setTimeout(() => {
            document.querySelector(".loader").style.display = "none";
        }, 700);
    }, 800);
});

// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});

// DARK / LIGHT MODE
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const light = document.body.classList.contains("light");

    themeBtn.textContent = light ? "☾" : "☀";

    localStorage.setItem("nexora-theme", light ? "light" : "dark");
});

if (localStorage.getItem("nexora-theme") === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☾";
}

// PORTFOLIO FILTER
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(button => {
    button.addEventListener("click", () => {
        filters.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.filter;

        projects.forEach(project => {
            const show = category === "all" ||
                         project.dataset.category === category;

            project.classList.toggle("hide", !show);
        });
    });
});

// FAQ
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.parentElement;
        const isOpen = item.classList.contains("open");

        document.querySelectorAll(".faq-item").forEach(faq => {
            faq.classList.remove("open");
            faq.querySelector("span").textContent = "+";
        });

        if (!isOpen) {
            item.classList.add("open");
            button.querySelector("span").textContent = "−";
        }
    });
});

// ANIMATED STATISTICS
const counters = document.querySelectorAll("[data-count]");
let counted = false;

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            counted = true;

            counters.forEach(counter => {
                const target = Number(counter.dataset.count);
                let current = 0;

                const increment = Math.max(1, Math.ceil(target / 60));

                const timer = setInterval(() => {
                    current += increment;

                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }

                    counter.textContent = current + "+";
                }, 25);
            });
        }
    });
}, { threshold: 0.3 });

const numbersSection = document.querySelector(".numbers");

observer.observe(numbersSection);

// CONTACT FORM
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = "Barcha maydonlarni to‘ldiring!";
        return;
    }

    const subject = encodeURIComponent("NEXORA — Yangi loyiha");
    const body = encodeURIComponent(
        `Ism: ${name}\nEmail: ${email}\nXabar: ${message}`
    );

    formMessage.textContent = "Email dasturi ochilmoqda...";

    window.location.href =
        `mailto:hello@nexora.com?subject=${subject}&body=${body}`;

    contactForm.reset();
});

// SCROLL REVEAL
const revealElements = document.querySelectorAll(
    ".info-card, .project-card, .price-card, .service-item"
);

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});
