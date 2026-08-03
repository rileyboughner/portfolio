// Keep footer year current.
document.getElementById("year").textContent = new Date().getFullYear();

const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = [...document.querySelectorAll("main section[id], header[id]")];
const menuButton = document.querySelector(".mobile-menu-toggle");
const menu = document.querySelector(".nav-links");

// Make navbar slightly more opaque while scrolling.
window.addEventListener("scroll", () => {
	nav.classList.toggle("scrolled", window.scrollY > 24);
});

// Mobile menu toggle.
menuButton.addEventListener("click", () => {
	menu.classList.toggle("open");
});

navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		menu.classList.remove("open");
	});
});

// Reveal sections smoothly on scroll.
const revealObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				revealObserver.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.18 },
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Update active nav link based on current section.
const sectionObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				navLinks.forEach((link) => {
					const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
					link.classList.toggle("active", isCurrent);
				});
			}
		});
	},
	{
		threshold: 0.55,
		rootMargin: "-20% 0px -30% 0px",
	},
);

sections.forEach((section) => sectionObserver.observe(section));

// Rotate the "currently" status line in the hero.
const statusPhrases = [
	"shipping secure CI/CD pipelines",
	"tinkering with my Kubernetes homelab",
	"open to full-time roles starting May 2027",
	"learning something new in cloud security",
];
const statusText = document.getElementById("statusText");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (statusText && !reduceMotion) {
	let statusIndex = 0;
	setInterval(() => {
		statusIndex = (statusIndex + 1) % statusPhrases.length;
		statusText.style.opacity = 0;
		setTimeout(() => {
			statusText.textContent = statusPhrases[statusIndex];
			statusText.style.opacity = 1;
		}, 350);
	}, 3200);
}

// Friendly inline confirmation for the contact form (no backend wired up yet).
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm) {
	contactForm.addEventListener("submit", (event) => {
		event.preventDefault();
		formNote.textContent = "Thanks — I'll get back to you soon. (Email me directly for now.)";
		contactForm.reset();
	});
}
