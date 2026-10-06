const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const backTop = document.querySelector(".back-top");
window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 700);
}, { passive: true });

backTop?.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

const terminal = document.querySelector("#terminalText");
const terminalLines = [
  "> RECOVERED FILE: RAIN_PROTOCOL / FRAGMENT_07",
  "> DATE: UNKNOWN",
  "> SOURCE: UNDERCITY RESISTANCE NODE",
  "",
  "The rain was never designed to kill us.",
  "It was designed to make obedience feel natural.",
  "",
  "Every drop carries a signal.",
  "Every signal asks a question.",
  "Every connected mind gives an answer.",
  "",
  "> WARNING: ARCHIVE CORRUPTED",
  "> SUBJECT ANDROID_01: SIGNAL IMMUNITY CONFIRMED",
  "> NEXT OBJECTIVE: FIND THE SOURCE"
];

let terminalStarted = false;
function typeTerminal() {
  if (!terminal || terminalStarted) return;
  terminalStarted = true;
  let line = 0, char = 0;
  const tick = () => {
    if (line >= terminalLines.length) return;
    const current = terminalLines[line];
    terminal.textContent += current[char] ?? "";
    char++;
    if (char >= current.length) {
      terminal.textContent += "\n";
      line++;
      char = 0;
      setTimeout(tick, 80);
    } else {
      setTimeout(tick, current === "" ? 15 : 14);
    }
  };
  tick();
}
const terminalObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    typeTerminal();
    terminalObserver.disconnect();
  }
}, {threshold: .3});
if (terminal) terminalObserver.observe(terminal);

const signalButton = document.querySelector(".signal-button");
const signalResponse = document.querySelector(".signal-response");
signalButton?.addEventListener("click", () => {
  const messages = [
    "SIGNAL ACCEPTED // SOMEONE IS LISTENING.",
    "NO RESPONSE // TRY AGAIN FROM THE UNDERCITY.",
    "SIGNAL ROUTED // SCRAPYARD NODE FOUND.",
    "ACCESS DENIED // YOU ARE BEING WATCHED."
  ];
  signalResponse.textContent = messages[Math.floor(Math.random() * messages.length)];
});

document.querySelectorAll(".enemy-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - .5) * 5;
    const y = ((e.clientY - r.top) / r.height - .5) * -5;
    card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (prefersReducedMotion.matches) {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
  document.querySelector(".rain")?.remove();
}
