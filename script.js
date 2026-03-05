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

// Lightweight parallax effect for gradient orbs.
const orbs = document.querySelectorAll(".background-orb");
window.addEventListener("mousemove", (event) => {
	const x = (event.clientX / window.innerWidth - 0.5) * 14;
	const y = (event.clientY / window.innerHeight - 0.5) * 14;
	orbs.forEach((orb, index) => {
		const factor = index === 0 ? 1 : -1;
		orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
	});
});
