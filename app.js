/* =============================================================
   MID CAP ANALYST  (app.js)
   -------------------------------------------------------------
   This file is the "brain" of the website. It decides which page
   to show, scores the quizzes, does the simulation maths and runs
   the animations.

   The words for the modules, quizzes, companies, prices and
   glossary live in the "data" folder, so you can change those
   without touching this file.

   What is in this file, in order:
     1.  Settings you might want to change (Google Form, budget, page text)
     2.  Saving and loading (localStorage)
     3.  Small helper tools (formatting money, dates, "TBD" values)
     4.  Icons
     5.  Animations
     6.  Page switching (which page to show)
     7.  Home page
     8.  Modules pages
     9.  Glossary page
     10. Quizzes
     11. Simulation
     12. Google Form "Submit" buttons
     13. Pop-up confirm box
     14. Clicks and typing (what happens when you press things)
     15. Start-up
   ============================================================= */


/* =============================================================
   1. SETTINGS YOU MIGHT WANT TO CHANGE
   ============================================================= */

/* ---- GOOGLE FORM SETTINGS ----------------------------------
   When your Google Form is ready:
     1. Open the form in Google Forms. Click the three dots (top right)
        and choose "Get pre-filled link".
     2. Type any sample answer into every question, then click "Get link"
        and copy it.
     3. Paste the start of that link (everything BEFORE the "?",
        it ends in "viewform") in place of GOOGLE_FORM_LINK_HERE.
     4. The copied link also contains parts like "entry.123456789=".
        Each one is a question in your form. Copy each entry code
        into the matching line below (keep the quote marks).
   You can use one form for everything, or one form for the quizzes
   and a different one for the simulation.
   ------------------------------------------------------------ */
const GOOGLE_FORM = {
  // Form used by the "Submit my results" button on both quiz results pages
  quizFormLink: "GOOGLE_FORM_LINK_HERE",
  quizFields: {
    quizName: "entry.QUIZ_NAME",                     // "Prior Knowledge Quiz" or "Post Quiz"
    totalScore: "entry.TOTAL_SCORE",                 // e.g. 85
    moduleScores: "entry.MODULE_SCORES",             // e.g. "M1 15/20, M2 20/20, ..."
    preScore: "entry.PRE_SCORE",                     // the pre quiz score
    postScore: "entry.POST_SCORE",                   // the post quiz score (Post Quiz only)
    rawGain: "entry.RAW_GAIN",                       // post minus pre (Post Quiz only)
    percentImprovement: "entry.PERCENT_IMPROVEMENT", // e.g. "40.0%" (Post Quiz only)
    dateTaken: "entry.DATE_TAKEN"                    // e.g. "1 November 2026"
  },

  // Form used by the "Submit my simulation results" button
  simulationFormLink: "GOOGLE_FORM_LINK_HERE",
  simulationFields: {
    totalReturn: "entry.TOTAL_RETURN",               // e.g. "9.45%"
    indexReturn: "entry.INDEX_RETURN",               // e.g. "5.00%"
    redFlagCompanies: "entry.RED_FLAG_COMPANIES",    // number of picks with 3 or more red flags
    sentences: "entry.SENTENCES"                     // every "Why?" sentence joined with " | "
  }
};

// Friendly names for each field, used when the form is not connected yet
const FIELD_NAMES = {
  quizName: "Quiz",
  totalScore: "Total score",
  moduleScores: "Score per module",
  preScore: "Pre quiz score",
  postScore: "Post quiz score",
  rawGain: "Raw gain",
  percentImprovement: "Percentage improvement",
  dateTaken: "Date",
  totalReturn: "Your total return",
  indexReturn: "Nifty Midcap 150 return",
  redFlagCompanies: "Companies picked with 3 or more red flags",
  sentences: "Your sentences"
};

/* ---- SIMULATION AND QUIZ NUMBERS --------------------------- */
const STARTING_BUDGET = 1000000;  // Rs 10,00,000 of fake money
const BROKERAGE_RATE = 0.005;     // 0.5% brokerage charged on every purchase
const MARKS_PER_QUESTION = 5;     // 20 questions x 5 marks = 100
const RED_FLAG_LIMIT = 3;         // "Companies you picked with 3 or more red flags"

/* ---- PAGE TEXT -----------------------------------------------
   Sentences that appear on the pages. Edit the words between the
   quote marks if you want to change them.
   ------------------------------------------------------------ */
const PAGE_TEXT = {
  homeTitle: "Mid Cap Analyst",
  homeTagline: "Learn how to judge an Indian mid cap stock by its numbers, not the hype.",
  homeQuizNote: "Take this first if you want to measure how much you learn.",
  videoError: "Video not available, please use the Text tab.",
  consolidatedNote: "Consolidated figures, FY26 (April 2025 to March 2026)",
  comingSoon: "Data coming soon",
  lockConfirm: "Once locked, you cannot change your picks. Continue?",
  simulationIntro: "You have Rs 10,00,000 of fake money. Below are real Indian mid cap companies with their real numbers as of 1 June 2026. Use the 10 step framework from Module 5. Decide how much to invest in each company (you can skip any). A brokerage of 0.5% is charged on every purchase. Write one sentence for every company you pick explaining why. When you are ready, lock in your picks. Your results will be calculated from real NSE closing prices between 1 June 2026 and 23 October 2026 and compared with the Nifty Midcap 150 index over the same period."
};


/* =============================================================
   2. SAVING AND LOADING (localStorage)
   -------------------------------------------------------------
   Quiz scores and simulation picks are saved in the browser on
   this device only. Every save and load is wrapped in try/catch,
   so if the browser blocks storage (for example in private mode)
   the site still works; it just forgets when the page is closed.
   ============================================================= */
const STORAGE_KEYS = {
  pre: "midCapAnalyst.preQuiz",
  post: "midCapAnalyst.postQuiz",
  simulation: "midCapAnalyst.simulation"
};

// A backup copy kept in memory, used if localStorage is blocked
const memoryCopy = {};

function saveData(key, value) {
  const text = JSON.stringify(value);
  memoryCopy[key] = text;
  try {
    localStorage.setItem(key, text);
  } catch (error) {
    // Storage is blocked. The memory copy above is still used.
  }
}

function loadData(key) {
  let text = null;
  try {
    text = localStorage.getItem(key);
  } catch (error) {
    text = null;
  }
  if (text === null && key in memoryCopy) text = memoryCopy[key];
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    return null; // The saved data was damaged, so act as if nothing was saved
  }
}

function deleteData(key) {
  delete memoryCopy[key];
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // Storage is blocked, nothing else to do
  }
}


/* =============================================================
   3. SMALL HELPER TOOLS
   ============================================================= */

// Makes text safe to put on the page (so a "<" in a sentence cannot break the layout)
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// True if a value has not been filled in yet ("TBD", empty or missing)
function isTBD(value) {
  if (value === undefined || value === null) return true;
  const text = String(value).trim();
  return text === "" || text.toUpperCase() === "TBD";
}

// Turns a value like 1234.5 or "1,234.50" into a number. Returns null if it is "TBD" or not a number.
function toNumber(value) {
  if (isTBD(value)) return null;
  if (typeof value === "number") return isFinite(value) ? value : null;
  const number = Number(String(value).replace(/,/g, "").trim());
  return isFinite(number) ? number : null;
}

// Shows a card value, or "Data coming soon" if it is still "TBD"
function showValue(value) {
  if (isTBD(value)) return '<span class="coming-soon">' + PAGE_TEXT.comingSoon + "</span>";
  if (typeof value === "number") return value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  return escapeHtml(value);
}

// Like showValue, but negative numbers (e.g. "-2,891") are shown in red
function showFigure(value) {
  const html = showValue(value);
  if (!isTBD(value) && String(value).trim().charAt(0) === "-") return '<span class="is-negative">' + html + "</span>";
  return html;
}

// Rounds a number to a set number of decimal places (e.g. roundTo(9.456, 2) = 9.46)
function roundTo(number, places) {
  const factor = Math.pow(10, places);
  return Math.round((number + Number.EPSILON) * factor) / factor;
}

// Formats money the Indian way: 200000 -> "Rs 2,00,000". withSign adds "+" in front of gains.
function formatRupees(amount, withSign) {
  const rounded = roundTo(amount, 2);
  const hasPaise = Math.abs(Math.round(rounded * 100)) % 100 !== 0;
  const digits = Math.abs(rounded).toLocaleString("en-IN", {
    minimumFractionDigits: hasPaise ? 2 : 0,
    maximumFractionDigits: 2
  });
  let sign = "";
  if (rounded < 0) sign = "-";
  else if (withSign && rounded > 0) sign = "+";
  return sign + "Rs " + digits;
}

// Formats a percentage to 2 decimal places: 9.45 -> "9.45%". withSign adds "+" in front of gains.
function formatPercent(number, withSign) {
  const rounded = roundTo(number, 2);
  const sign = withSign && rounded > 0 ? "+" : "";
  return sign + rounded.toFixed(2) + "%";
}

// Adds a colour class: teal for gains, red for losses
function gainClass(number) {
  if (number > 0) return "positive";
  if (number < 0) return "negative";
  return "";
}

// Turns a saved date into words, e.g. "1 November 2026"
function formatDate(isoText) {
  const date = new Date(isoText);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

// Finds a company by its NSE code
function findCompany(code) {
  return COMPANIES.find(function (company) { return company.nseCode === code; });
}


/* =============================================================
   4. ICONS
   Small line drawings used on buttons and labels. They are drawn
   in code, so no image files are needed.
   ============================================================= */
const ICON_PATHS = {
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  cross: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  flag: '<path d="M5.5 21V3.5"/><path d="M5.5 4h12l-2.5 4.25L17.5 12.5h-12z" fill="currentColor"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path class="lock-shackle" d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  lockOpen: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.7"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  book: '<path d="M12 6.5C10.5 5 8 4.5 4 4.5v13c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-13c-4 0-6.5.5-8 2z"/><path d="M12 6.5v13"/>',
  text: '<path d="M5 6.5h14M5 10.5h14M5 14.5h14M5 18.5h8"/>',
  play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
  list: '<path d="M9.5 6.5H20M9.5 12H20M9.5 17.5H20M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01"/>',
  chart: '<path d="M4.5 20h15M7.5 16v-5M12 16V6.5M16.5 16v-3"/>',
  send: '<path d="M4.5 12L20 4.5 15 20l-3-6.5z"/><path d="M12 13.5l8-9"/>',
  retry: '<path d="M4.5 12a7.5 7.5 0 1 0 2.4-5.5"/><path d="M4.5 4.5v4h4"/>',
  trendUp: '<path d="M4 16.5l5.5-5.5 4 4L20 8.5"/><path d="M15 8.5h5v5"/>',
  trendDown: '<path d="M4 7.5l5.5 5.5 4-4L20 15.5"/><path d="M15 15.5h5v-5"/>'
};

// Returns the SVG code for one icon. extraClass is optional.
function icon(name, size, extraClass) {
  const px = size || 20;
  return '<svg class="icon icon-' + name + (extraClass ? " " + extraClass : "") + '" viewBox="0 0 24 24" width="' + px + '" height="' + px + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + ICON_PATHS[name] + "</svg>";
}


/* =============================================================
   5. ANIMATIONS
   -------------------------------------------------------------
   Most animations are written in style.css. This part switches
   them on, counts numbers up, and starts animations when things
   scroll into view.

   If someone has asked their phone or laptop for "reduced motion",
   motionOK() is false: nothing slides or counts, everything simply
   appears.
   ============================================================= */
const reducedMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

function motionOK() {
  return !(reducedMotion && reducedMotion.matches);
}

// Adds the "motion" class to the page, which switches the CSS animations on
function applyMotionSetting() {
  document.documentElement.classList.toggle("motion", motionOK());
}

// A curve that starts fast and slows down gently at the end
function easeOut(t) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// How numbers are written while they count up ("done" is true for the final value)
const COUNT_FORMATS = {
  int: function (n) { return String(Math.round(n)); },
  rupees: function (n, done) { return formatRupees(done ? n : Math.round(n)); },
  rupeesSigned: function (n, done) { return formatRupees(done ? n : Math.round(n), true); },
  percentSigned: function (n) { return formatPercent(n, true); },
  percentOne: function (n) { return roundTo(n, 1).toFixed(1) + "%"; }
};

// A number that counts up from 0 when it scrolls into view.
// Screen readers get the final value straight away from a hidden copy.
function countHtml(value, format, delay, duration) {
  const finalText = COUNT_FORMATS[format](value, true);
  return '<span class="count" aria-hidden="true" data-count="' + value + '" data-format="' + format + '"' +
      (delay ? ' data-delay="' + delay + '"' : "") +
      (duration ? ' data-duration="' + duration + '"' : "") + ">" +
      escapeHtml(finalText) + "</span>" +
    '<span class="visually-hidden">' + escapeHtml(finalText) + "</span>";
}

// Smoothly changes the number shown in an element from one value to another
function tweenNumber(el, from, to, format, duration, delay) {
  const write = COUNT_FORMATS[format];
  if (el.tweenFrame) cancelAnimationFrame(el.tweenFrame);
  el.tweenFrame = null;
  if (!motionOK() || from === to) {
    el.textContent = write(to, true);
    el.tweenValue = to;
    return;
  }
  const start = performance.now() + (delay || 0);
  function frame(now) {
    const t = Math.max(0, Math.min(1, (now - start) / duration));
    el.tweenValue = from + (to - from) * easeOut(t);
    el.textContent = write(t >= 1 ? to : el.tweenValue, t >= 1);
    el.tweenFrame = t < 1 ? requestAnimationFrame(frame) : null;
  }
  el.tweenValue = from;
  el.textContent = write(from, false);
  el.tweenFrame = requestAnimationFrame(frame);
}

// Watches for things marked data-reveal (or counting numbers) to scroll
// into view, then adds "is-in" so their CSS animation plays.
let revealWatcher = null;

function startPageAnimations() {
  if (revealWatcher) revealWatcher.disconnect();
  revealWatcher = null;
  const targets = appEl.querySelectorAll("[data-reveal], .count");

  if (!motionOK() || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-in"); });
    return; // numbers already show their final values
  }

  revealWatcher = new IntersectionObserver(function (entries, watcher) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      watcher.unobserve(el);
      el.classList.add("is-in");
      if (el.classList.contains("count")) {
        tweenNumber(el, 0, Number(el.dataset.count), el.dataset.format,
          Number(el.dataset.duration || 1200), Number(el.dataset.delay || 0));
      }
    });
  }, { rootMargin: "0px 0px -5% 0px", threshold: 0.15 });

  targets.forEach(function (el) {
    if (el.classList.contains("count")) el.textContent = COUNT_FORMATS[el.dataset.format](0, false);
    revealWatcher.observe(el);
  });
}

// Puts new content on the page and starts its animations
function paint(html) {
  appEl.innerHTML = html;
  startPageAnimations();
}

// Makes the whole page glide in when you arrive on it
function playPageEnter() {
  if (!motionOK()) return;
  appEl.classList.remove("is-entering");
  void appEl.offsetWidth; // forces the browser to restart the animation
  appEl.classList.add("is-entering");
}

// The thin reading-progress line at the top of module pages
const readProgressEl = document.getElementById("read-progress");
let readFrame = null;

function updateReadProgress() {
  readFrame = null;
  if (readProgressEl.hidden) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const amount = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  readProgressEl.firstElementChild.style.transform = "scaleX(" + amount + ")";
}

window.addEventListener("scroll", function () {
  if (readFrame === null) readFrame = requestAnimationFrame(updateReadProgress);
}, { passive: true });

// Slides the teal line in the top bar under the current page's link (laptop only)
function moveNavIndicator() {
  const indicator = document.querySelector(".nav-indicator");
  const active = document.querySelector(".main-nav a.is-active");
  if (!indicator) return;
  if (!active || window.innerWidth < 760) {
    indicator.style.opacity = "0";
    return;
  }
  indicator.style.opacity = "1";
  indicator.style.width = (active.offsetWidth - 28) + "px";
  indicator.style.transform = "translateX(" + (active.offsetLeft + 14) + "px)";
}

window.addEventListener("resize", moveNavIndicator);


/* =============================================================
   6. PAGE SWITCHING
   -------------------------------------------------------------
   The address after the "#" decides which page is shown:
     #/              Home
     #/modules       list of modules
     #/module/3      Module 3 (add /video for the Video tab)
     #/glossary      Glossary
     #/quizzes       both quizzes
     #/quiz/pre      Prior Knowledge Quiz
     #/quiz/post     Post Quiz
     #/simulation    Simulation
     #/reset         hidden page that clears saved data (for testing)
   ============================================================= */
const appEl = document.getElementById("app");
let currentHash = "";
let lastRoute = { page: "", parts: [] };
let glossaryBackHash = "#/"; // where the Glossary "Back" button goes

function readRoute() {
  const hash = location.hash || "#/";
  const parts = hash.replace(/^#\/?/, "").split("/").filter(function (part) { return part !== ""; });
  return { hash: hash, page: parts[0] || "home", parts: parts };
}

function showPage() {
  const route = readRoute();

  // Remember the page we came from, so "Back" on the Glossary can return to it
  if (route.page === "glossary" && currentHash.indexOf("#/glossary") !== 0) {
    glossaryBackHash = currentHash || "#/";
  }
  // Switching between the Text and Video tabs of one module is not a new page
  const sameModule = route.page === "module" && lastRoute.page === "module" && route.parts[1] === lastRoute.parts[1];
  currentHash = route.hash;
  lastRoute = route;

  closeMenu();
  closeConfirm(false);
  const wide = route.page === "home" || route.page === "quizzes" || route.page === "simulation";
  appEl.dataset.width = wide ? "wide" : "narrow";
  readProgressEl.hidden = route.page !== "module";

  if (route.page === "home") renderHome();
  else if (route.page === "modules") renderModulesList();
  else if (route.page === "module") renderModule(Number(route.parts[1]), route.parts[2], sameModule);
  else if (route.page === "glossary") renderGlossary();
  else if (route.page === "quizzes") renderQuizzesHub();
  else if (route.page === "quiz") renderQuiz(route.parts[1]);
  else if (route.page === "simulation") renderSimulation();
  else if (route.page === "reset") renderReset();
  else renderHome();

  highlightNav(route.page);
  window.scrollTo(0, 0);
  if (!sameModule) playPageEnter();
  updateReadProgress();
}

// Sets the text in the browser tab
function setTitle(pageName) {
  document.title = pageName ? pageName + " | Mid Cap Analyst" : "Mid Cap Analyst";
}

// Highlights the current page in the top bar
function highlightNav(page) {
  const navName = { module: "modules", quiz: "quizzes" }[page] || page;
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    const active = link.dataset.nav === navName;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  moveNavIndicator();
}

// Opens and closes the phone menu
function toggleMenu() {
  const nav = document.getElementById("main-nav");
  const button = document.querySelector(".menu-btn");
  const open = !nav.classList.contains("is-open");
  nav.classList.toggle("is-open", open);
  button.setAttribute("aria-expanded", String(open));
  button.querySelector(".menu-word").textContent = open ? "Close" : "Menu";
}

function closeMenu() {
  const nav = document.getElementById("main-nav");
  const button = document.querySelector(".menu-btn");
  nav.classList.remove("is-open");
  button.setAttribute("aria-expanded", "false");
  button.querySelector(".menu-word").textContent = "Menu";
}


/* =============================================================
   7. HOME PAGE
   ============================================================= */

// The drawing on the home page: a jumpy "hype" price line that
// spikes and crashes, and a steady "numbers" line that keeps rising.
function hypeChartHtml() {
  return '<figure class="hype-chart" aria-hidden="true">' +
    '<svg viewBox="0 0 480 270">' +
      '<g class="chart-grid"><line x1="0" y1="64" x2="480" y2="64"/><line x1="0" y1="128" x2="480" y2="128"/><line x1="0" y1="192" x2="480" y2="192"/><line x1="0" y1="256" x2="480" y2="256"/></g>' +
      '<path class="line-hype" pathLength="1" d="M8 214 L40 206 L62 188 L82 197 L104 150 L122 166 L142 96 L160 122 L178 58 L196 84 L212 38 L232 150 L250 128 L270 196 L292 180 L318 214 L344 204 L372 226 L404 214 L436 232 L472 224"/>' +
      '<path class="chart-crash" pathLength="1" d="M212 38 L232 150 L250 128 L270 196"/>' +
      '<path class="line-numbers" pathLength="1" d="M8 232 C110 222 170 202 240 172 S380 104 464 70"/>' +
      '<circle class="chart-halo" cx="464" cy="70" r="15"/>' +
      '<circle class="chart-dot" cx="464" cy="70" r="7"/>' +
      '<text class="chart-label is-hype" x="200" y="30" text-anchor="end">the hype</text>' +
      '<text class="chart-label is-numbers" x="464" y="42" text-anchor="end">the numbers</text>' +
    "</svg>" +
  "</figure>";
}

function renderHome() {
  setTitle("");
  const pre = loadData(STORAGE_KEYS.pre);
  const post = loadData(STORAGE_KEYS.post);
  const sim = loadSimulation();

  // Which step is highlighted as the one to do next
  let next = "pre";
  if (pre) next = "modules";
  if (post) next = "simulation";
  if (sim.locked) next = "";

  let simStatus = "";
  if (sim.locked) simStatus = "Picks locked";
  else if (sim.started) simStatus = "In progress";

  function step(index, key, href, label, status, after) {
    return '<li class="journey-step' + (next === key ? " is-next" : "") + '" style="--i:' + index + '">' +
      '<a class="journey-link" href="' + href + '">' +
        '<span class="journey-num">' + (index + 1) + "</span>" +
        '<span class="journey-body">' +
          '<span class="journey-title">' + escapeHtml(label) + "</span>" +
          (status ? '<span class="journey-status">' + icon("check", 16) + escapeHtml(status) + "</span>" : "") +
        "</span>" +
        icon("arrowRight", 22, "journey-arrow") +
      "</a>" +
      (after || "") +
    "</li>";
  }

  // The title is split into words so each word can rise into place
  const titleWords = PAGE_TEXT.homeTitle.split(" ").map(function (word, i) {
    return '<span class="word"><span style="--i:' + i + '">' + escapeHtml(word) + "</span></span>";
  }).join(" ");

  paint(
    '<section class="home-hero">' +
      "<div>" +
        '<h1 class="home-title">' + titleWords + "</h1>" +
        '<p class="tagline">' + escapeHtml(PAGE_TEXT.homeTagline) + "</p>" +
      "</div>" +
      hypeChartHtml() +
    "</section>" +
    '<ol class="journey">' +
      step(0, "pre", "#/quiz/pre", "Prior Knowledge Quiz (optional)",
        pre ? "Your score: " + pre.score + " / " + pre.outOf : "",
        '<p class="journey-note">' + escapeHtml(PAGE_TEXT.homeQuizNote) + "</p>") +
      step(1, "modules", "#/modules", "Learn: 5 Modules", "") +
      step(2, "post", "#/quiz/post", "Post Quiz", post ? "Your score: " + post.score + " / " + post.outOf : "") +
      step(3, "simulation", "#/simulation", "Simulation", simStatus) +
    "</ol>" +
    '<p class="home-glossary"><a href="#/glossary">' + icon("book", 20) + "Glossary</a></p>"
  );
}


/* =============================================================
   8. MODULES PAGES
   ============================================================= */

// The list of five modules, joined by a line like a path
function renderModulesList() {
  setTitle("Modules");
  const rows = MODULES.map(function (module, index) {
    return '<li data-reveal="rise" style="--i:' + index + '">' +
      '<a class="module-row" href="#/module/' + (index + 1) + '">' +
        '<span class="module-num" aria-hidden="true">' + (index + 1) + "</span>" +
        '<span class="module-row-title"><span class="visually-hidden">Module ' + (index + 1) + ": </span>" + escapeHtml(module.title) + "</span>" +
        icon("arrowRight", 22, "module-row-arrow") +
      "</a>" +
    "</li>";
  }).join("");
  paint(
    '<header class="page-head">' +
      "<h1>Modules</h1>" +
      '<p class="lead">Each module has a Text tab and a Video tab with the same content.</p>' +
    "</header>" +
    '<ol class="module-path">' + rows + "</ol>"
  );
}

// Remembers whether the user last chose Text or Video, so Next keeps the same tab
let preferredTab = "text";

// One module page, with Text and Video tabs.
// sameModule is true when only the tab changed, so the switch animates instead of the whole page.
function renderModule(number, tab, sameModule) {
  const total = MODULES.length;
  if (!(number >= 1 && number <= total)) {
    location.hash = "#/modules";
    return;
  }
  const previousTab = preferredTab;
  if (tab !== "text" && tab !== "video") tab = preferredTab;
  preferredTab = tab;
  const switching = sameModule && previousTab !== tab;

  const module = MODULES[number - 1];
  setTitle("Module " + number);

  // The video player (Video tab only).
  // "#t=0.1" makes phones show the first frame as a preview before Play is pressed.
  let videoHtml = "";
  if (tab === "video") {
    const videoSrc = module.videoFile ? module.videoFile + "#t=0.1" : "";
    videoHtml =
      '<div class="video-box">' +
        '<video class="module-video" controls playsinline preload="metadata" src="' + escapeHtml(videoSrc) + '"></video>' +
        '<p class="video-error" hidden>' + escapeHtml(PAGE_TEXT.videoError) + "</p>" +
      "</div>";
  }

  // Five little bars showing where this module sits (1 to 5)
  let position = "";
  for (let i = 1; i <= total; i++) {
    position += '<span class="' + (i < number ? "is-done" : i === number ? "is-current" : "") + '"></span>';
  }

  // Previous / Next buttons. A hidden spacer keeps "Module X of 5" centred.
  const previous = number > 1
    ? '<a class="btn btn-secondary" href="#/module/' + (number - 1) + "/" + tab + '">' + icon("arrowLeft", 18) + "Previous</a>"
    : '<span class="btn btn-secondary pager-spacer" aria-hidden="true">Previous</span>';
  const next = number < total
    ? '<a class="btn" href="#/module/' + (number + 1) + "/" + tab + '">Next' + icon("arrowRight", 18) + "</a>"
    : '<span class="btn pager-spacer" aria-hidden="true">Next</span>';
  const postQuizButton = number === total
    ? '<div class="after-modules"><a class="btn btn-big" href="#/quiz/post">Take the Post Quiz' + icon("arrowRight", 20) + "</a></div>"
    : "";

  // The navy pill starts under the old tab, then slides to the new one
  const pillStart = switching ? previousTab : tab;

  paint(
    '<header class="module-head">' +
      '<span class="module-head-num" aria-hidden="true">' + number + "</span>" +
      "<div>" +
        '<h1><span class="visually-hidden">Module ' + number + ": </span>" + escapeHtml(module.title) + "</h1>" +
        '<div class="module-steps" aria-hidden="true">' + position + "</div>" +
      "</div>" +
    "</header>" +
    '<nav class="tabs" data-active="' + pillStart + '" aria-label="Choose how to learn">' +
      '<span class="tab-indicator" aria-hidden="true"></span>' +
      '<a class="tab' + (tab === "text" ? " is-active" : "") + '" href="#/module/' + number + '/text"' + (tab === "text" ? ' aria-current="page"' : "") + ">" + icon("text", 18) + "Text</a>" +
      '<a class="tab' + (tab === "video" ? " is-active" : "") + '" href="#/module/' + number + '/video"' + (tab === "video" ? ' aria-current="page"' : "") + ">" + icon("play", 16) + "Video</a>" +
    "</nav>" +
    '<div class="tab-panel' + (switching ? " is-switching" : "") + '">' +
      videoHtml +
      '<article class="module-text">' + formatModuleText(module.text) + "</article>" +
    "</div>" +
    '<p class="glossary-prompt">' + icon("book", 22) + '<span>Confused by a term? <a href="#/glossary">Open the Glossary</a></span></p>' +
    '<nav class="pager" aria-label="Module navigation">' +
      previous +
      '<span class="pager-count">Module ' + number + " of " + total + "</span>" +
      next +
    "</nav>" +
    postQuizButton
  );

  // Slide the pill to the chosen tab
  if (switching) {
    const tabs = appEl.querySelector(".tabs");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { tabs.dataset.active = tab; });
    });
  }

  // If the video cannot load, hide the player and show the message instead
  const video = appEl.querySelector("video");
  if (video) {
    const showVideoError = function () {
      video.hidden = true;
      appEl.querySelector(".video-box").classList.add("has-error");
      appEl.querySelector(".video-error").hidden = false;
    };
    video.addEventListener("error", showVideoError);
    if (!module.videoFile || video.error) showVideoError();
  }
}

// Turns the module text into paragraphs, headings, bullet points and boxes.
// See the top of data/modules.js for what ##, -, +, > and ** do.
// It also marks the numbered steps, flag lists and boxes so they animate in.
function formatModuleText(text) {
  const lines = String(text).split("\n")
    .map(function (line) { return line.trim(); })
    .filter(function (line) { return line !== ""; });

  let html = "";
  let openList = "";     // "ul" or "ol" while a list is open
  let listKind = "";     // "flags" for the Green Flags / Red Flags lists
  let itemNumber = 0;    // position inside the current list, for the stagger
  let lastHeading = "";  // used to colour the Green Flags / Red Flags bullets

  // Makes **words** bold (after making the text safe)
  function inline(content) {
    return escapeHtml(content).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  lines.forEach(function (line) {
    let type = "p";
    let content = line;
    if (line.indexOf("## ") === 0) { type = "h"; content = line.slice(3); }
    else if (line.indexOf("- ") === 0) { type = "ul"; content = line.slice(2); }
    else if (line.indexOf("+ ") === 0) { type = "ol"; content = line.slice(2); }
    else if (line.indexOf("> ") === 0) { type = "box"; content = line.slice(2); }

    // Close a list when the next line is not part of it
    if (openList && openList !== type) {
      html += "</" + openList + ">";
      openList = "";
    }

    if (type === "h") {
      lastHeading = content;
      html += "<h2>" + inline(content) + "</h2>";
    } else if (type === "ul" || type === "ol") {
      if (!openList) {
        let listClass = "";
        listKind = "";
        if (lastHeading.indexOf("Green Flags") === 0) { listClass = ' class="flags-green"'; listKind = "flags"; }
        if (lastHeading.indexOf("Red Flags") === 0) { listClass = ' class="flags-red"'; listKind = "flags"; }
        html += "<" + type + listClass + ">";
        openList = type;
        itemNumber = 0;
      }
      let reveal = "";
      if (type === "ol") reveal = ' data-reveal="step" style="--i:' + itemNumber + '"';
      else if (listKind === "flags") reveal = ' data-reveal="rise" style="--i:' + itemNumber + '"';
      html += "<li" + reveal + ">" + inline(content) + "</li>";
      itemNumber++;
    } else if (type === "box") {
      lastHeading = "";
      html += '<div class="callout" data-reveal="wipe"><p>' + inline(content) + "</p></div>";
    } else {
      lastHeading = "";
      html += "<p>" + inline(content) + "</p>";
    }
  });

  if (openList) html += "</" + openList + ">";
  return html;
}


/* =============================================================
   9. GLOSSARY PAGE
   ============================================================= */
let glossarySorted = [];

function renderGlossary() {
  setTitle("Glossary");

  // Sort A to Z, ignoring capital letters
  glossarySorted = GLOSSARY.slice().sort(function (a, b) {
    return a.term.localeCompare(b.term, "en", { sensitivity: "base" });
  });

  // Group the terms under their first letter
  let groupsHtml = "";
  let currentLetter = "";
  glossarySorted.forEach(function (entry, index) {
    const letter = entry.term.charAt(0).toUpperCase();
    if (letter !== currentLetter) {
      if (currentLetter) groupsHtml += "</dl></section>";
      groupsHtml += '<section class="g-group"><h2 class="g-letter">' + escapeHtml(letter) + '</h2><dl class="g-list">';
      currentLetter = letter;
    }
    groupsHtml += '<div class="g-item" data-index="' + index + '">' +
      "<dt>" + escapeHtml(entry.term) + "</dt>" +
      "<dd>" + escapeHtml(entry.definition) + "</dd>" +
    "</div>";
  });
  if (currentLetter) groupsHtml += "</dl></section>";

  paint(
    '<div class="page-top"><button type="button" class="btn btn-secondary btn-small" data-action="glossary-back">' + icon("arrowLeft", 18) + "Back</button></div>" +
    "<h1>Glossary</h1>" +
    '<div class="search-wrap">' + icon("search", 20) +
      '<label class="visually-hidden" for="glossary-search">Search the glossary</label>' +
      '<input id="glossary-search" class="search-box" type="search" placeholder="Search, e.g. ROE" autocomplete="off">' +
    "</div>" +
    '<p class="glossary-count" id="glossary-count" aria-live="polite">' + glossarySorted.length + " terms</p>" +
    groupsHtml +
    '<p class="glossary-empty" hidden>No terms match your search.</p>'
  );
}

// Wraps every match of the search in a highlight
function highlightMatches(text, search) {
  if (!search) return escapeHtml(text);
  const lower = text.toLowerCase();
  let out = "";
  let from = 0;
  let at = lower.indexOf(search);
  while (at !== -1) {
    out += escapeHtml(text.slice(from, at)) + "<mark>" + escapeHtml(text.slice(at, at + search.length)) + "</mark>";
    from = at + search.length;
    at = lower.indexOf(search, from);
  }
  return out + escapeHtml(text.slice(from));
}

// Hides every term that does not contain what has been typed, and highlights matches
function filterGlossary(query) {
  const search = query.trim().toLowerCase();
  let shown = 0;
  appEl.querySelectorAll(".g-item").forEach(function (item) {
    const entry = glossarySorted[Number(item.dataset.index)];
    const match = search === "" || (entry.term + " " + entry.definition).toLowerCase().indexOf(search) !== -1;
    const wasHidden = item.hidden;
    item.hidden = !match;
    if (!match) return;
    shown++;
    item.querySelector("dt").innerHTML = highlightMatches(entry.term, search);
    item.querySelector("dd").innerHTML = highlightMatches(entry.definition, search);
    if (wasHidden) {
      item.classList.remove("is-appearing");
      void item.offsetWidth;
      item.classList.add("is-appearing");
    }
  });
  // Hide a letter heading when none of its terms match
  appEl.querySelectorAll(".g-group").forEach(function (group) {
    group.hidden = !group.querySelector(".g-item:not([hidden])");
  });
  document.getElementById("glossary-count").textContent = search === ""
    ? glossarySorted.length + " terms"
    : shown + (shown === 1 ? " term" : " terms") + " found";
  appEl.querySelector(".glossary-empty").hidden = shown > 0;
}


/* =============================================================
   10. QUIZZES
   ============================================================= */

// Progress through a quiz that is in the middle of being taken.
// null = not started. Kept in memory, so it survives a quick visit
// to another page but is forgotten if the page is refreshed.
const quizProgress = { pre: null, post: null };

const LETTERS = ["A", "B", "C", "D"];

// Mixes a list into a random order (the "Fisher-Yates shuffle")
function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

// Decides the order the four options are shown in, for one attempt at a quiz.
// The correct answers are spread evenly over A, B, C and D (5 of each in a
// 20 question quiz) in a random pattern, and the wrong options are mixed up
// randomly around them. The words are never changed, only their order.
// Returns one list per question: [2, 0, 3, 1] means the option written third
// in quiz.js is shown as A, the one written first is shown as B, and so on.
function makeOptionOrder(quiz) {
  const correctSpots = shuffle(quiz.questions.map(function (question, i) { return i % 4; }));
  return quiz.questions.map(function (question, i) {
    const correctIndex = LETTERS.indexOf(question.answer);
    if (correctIndex === -1) return shuffle([0, 1, 2, 3]);
    const order = shuffle([0, 1, 2, 3].filter(function (n) { return n !== correctIndex; }));
    order.splice(correctSpots[i], 0, correctIndex);
    return order;
  });
}

// For each question: true if answered correctly. Used by the coloured squares.
function rightOrWrong(quiz, answers) {
  return quiz.questions.map(function (question, i) { return answers[i] === question.answer; });
}

// The answers grouped by module, e.g. [[true, true, false, true], ...]
function groupByModule(quiz, list) {
  const groups = [];
  const index = {};
  quiz.questions.forEach(function (question, i) {
    if (!(question.module in index)) {
      index[question.module] = groups.length;
      groups.push({ module: question.module, items: [] });
    }
    groups[index[question.module]].items.push(list[i]);
  });
  return groups;
}

// Small row of squares (one per question) for the Quizzes page
function miniStripHtml(type, saved) {
  const groups = groupByModule(QUIZZES[type], rightOrWrong(QUIZZES[type], saved.answers));
  let n = 0;
  return '<div class="mini-strip" aria-hidden="true" style="grid-template-columns:repeat(' + groups.length + ',1fr)">' +
    groups.map(function (group) {
      return '<div class="mini-group">' + group.items.map(function (right) {
        return '<span class="mini-cell' + (right ? " is-right" : "") + '" style="--i:' + (n++) + '"></span>';
      }).join("") + "</div>";
    }).join("") +
  "</div>";
}

// Page listing both quizzes
function renderQuizzesHub() {
  setTitle("Quizzes");
  const pre = loadData(STORAGE_KEYS.pre);
  const post = loadData(STORAGE_KEYS.post);

  function card(type, heading, text, saved, index) {
    const name = QUIZZES[type].title;
    return '<div class="quiz-card" data-reveal="rise" style="--i:' + index + '">' +
      "<h2>" + escapeHtml(heading) + "</h2>" +
      "<p>" + escapeHtml(text) + "</p>" +
      (saved
        ? '<p class="saved-score">Your score: ' + saved.score + " / " + saved.outOf + " (" + formatDate(saved.date) + ")</p>" + miniStripHtml(type, saved)
        : '<p class="saved-score">Not taken yet</p>') +
      '<a class="btn" href="#/quiz/' + type + '">' + (saved ? "Open" : "Start") + " the " + escapeHtml(name) + icon("arrowRight", 18) + "</a>" +
    "</div>";
  }

  paint(
    '<header class="page-head"><h1>Quizzes</h1></header>' +
    '<div class="quiz-cards">' +
      card("pre", "Prior Knowledge Quiz (optional)", PAGE_TEXT.homeQuizNote, pre, 0) +
      card("post", "Post Quiz", "Take this after you have finished the five modules.", post, 1) +
    "</div>"
  );
}

// Decides which quiz screen to show: start, question or results
function renderQuiz(type) {
  if (!QUIZZES[type]) {
    location.hash = "#/quizzes";
    return;
  }
  setTitle(QUIZZES[type].title);
  const progress = quizProgress[type];
  if (!progress) renderQuizStart(type);
  else if (progress.showResults) renderQuizResults(type);
  else renderQuizQuestion(type, false);
}

// Start screen
function renderQuizStart(type) {
  const quiz = QUIZZES[type];
  const saved = loadData(STORAGE_KEYS[type]);
  const count = quiz.questions.length;
  const total = count * MARKS_PER_QUESTION;

  let savedHtml = "";
  if (saved) {
    savedHtml =
      '<div class="notice" data-reveal="rise" style="--i:4">' +
        "<p>You took this quiz on " + formatDate(saved.date) + " and scored <strong>" + saved.score + " / " + saved.outOf + "</strong>.</p>" +
        "<p>Taking it again will replace that score.</p>" +
        '<button type="button" class="btn btn-secondary" data-action="quiz-view-results" data-quiz="' + type + '">View my results</button>' +
      "</div>";
  }

  function rule(iconName, text, index) {
    return '<li class="rule" data-reveal="rise" style="--i:' + index + '"><span class="rule-icon">' + icon(iconName, 20) + "</span><span>" + text + "</span></li>";
  }

  paint(
    "<h1>" + escapeHtml(quiz.title) + (type === "pre" ? " (optional)" : "") + "</h1>" +
    (type === "pre" ? '<p class="lead">' + escapeHtml(PAGE_TEXT.homeQuizNote) + "</p>" : "") +
    '<ul class="rules">' +
      rule("list", count + " questions, " + MARKS_PER_QUESTION + " marks each (" + total + " in total).", 0) +
      rule("arrowRight", "One question at a time. Pick an answer, then press Next.", 1) +
      rule("lock", "You cannot go back to a question once you have moved on.", 2) +
      rule("chart", "You will see your score and the correct answers at the end.", 3) +
    "</ul>" +
    savedHtml +
    '<button type="button" class="btn btn-big" data-action="quiz-start" data-quiz="' + type + '">' + (saved ? "Retake the quiz" : "Start the quiz") + icon("arrowRight", 20) + "</button>"
  );
}

// One question with its four options.
// entering is true when it should slide in (after pressing Next).
function renderQuizQuestion(type, entering) {
  const quiz = QUIZZES[type];
  const progress = quizProgress[type];
  const index = progress.questionIndex;
  const question = quiz.questions[index];
  const count = quiz.questions.length;
  const isLast = index === count - 1;
  const order = progress.order ? progress.order[index] : [0, 1, 2, 3];

  // The progress bar: one segment per question, grouped by module
  let n = 0;
  const segments = groupByModule(quiz, quiz.questions).map(function (group) {
    return '<span class="seg-group">' + group.items.map(function () {
      const state = n < index ? " is-done" : n === index ? " is-current" : "";
      n++;
      return '<span class="seg' + state + '"></span>';
    }).join("") + "</span>";
  }).join("");

  // Show the options in their shuffled order. data-letter is the option's
  // letter in quiz.js (used for marking); the letter on screen is its position.
  const options = order.map(function (originalIndex, position) {
    const letter = LETTERS[originalIndex];
    const selected = progress.selected === letter;
    return '<button type="button" class="option' + (selected ? " is-selected" : "") + '" style="--i:' + position + '" role="radio" aria-checked="' + selected + '" data-action="quiz-pick" data-quiz="' + type + '" data-letter="' + letter + '">' +
      '<span class="option-letter">' + LETTERS[position] + "</span>" +
      '<span class="option-text">' + escapeHtml(question.options[originalIndex]) + "</span>" +
    "</button>";
  }).join("");

  paint(
    '<div class="quiz-top">' +
      '<p class="quiz-name">' + escapeHtml(quiz.title) + "</p>" +
      '<p class="progress-label">Question ' + (index + 1) + " of " + count + "</p>" +
    "</div>" +
    '<div class="segments" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="' + count + '" aria-valuenow="' + (index + 1) + '">' + segments + "</div>" +
    '<div class="question-stage' + (entering ? " is-entering" : "") + '">' +
      '<h1 class="question-text">' + escapeHtml(question.question) + "</h1>" +
      '<div class="options" role="radiogroup" aria-label="Answers">' + options + "</div>" +
      // The Next button only appears once an option has been picked
      '<div class="quiz-next"' + (progress.selected ? "" : " hidden") + ">" +
        '<button type="button" class="btn btn-big" data-action="quiz-next" data-quiz="' + type + '">' + (isLast ? "Finish quiz" : "Next") + icon("arrowRight", 20) + "</button>" +
      "</div>" +
    "</div>"
  );
}

// When an option is tapped: highlight it and show the Next button
function pickOption(type, letter) {
  const progress = quizProgress[type];
  if (!progress || progress.showResults || progress.busy) return;
  progress.selected = letter;
  appEl.querySelectorAll(".option").forEach(function (button) {
    const selected = button.dataset.letter === letter;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-checked", String(selected));
  });
  const next = appEl.querySelector(".quiz-next");
  if (next.hidden) {
    next.hidden = false;
    next.classList.add("is-showing");
  }
}

// When Next is pressed: lock in the answer and move on (no going back).
// The old question slides away to the left before the next one arrives.
function nextQuestion(type) {
  const progress = quizProgress[type];
  if (!progress || !progress.selected || progress.busy) return;
  progress.answers.push(progress.selected);
  progress.selected = null;
  progress.questionIndex++;

  // The last answer is marked and saved straight away
  const finished = progress.questionIndex >= QUIZZES[type].questions.length;
  if (finished) saveQuizResult(type);

  function showNext() {
    progress.busy = false;
    const route = readRoute();
    if (route.page !== "quiz" || route.parts[1] !== type) return; // the user went to another page
    if (finished) {
      renderQuizResults(type);
      playPageEnter();
    } else {
      renderQuizQuestion(type, true);
    }
    window.scrollTo(0, 0);
  }

  const stage = appEl.querySelector(".question-stage");
  if (motionOK() && stage) {
    progress.busy = true;
    stage.classList.add("is-leaving");
    setTimeout(showNext, 170);
  } else {
    showNext();
  }
}

// Marks the quiz. Returns the total, the score for each module and the wrong answers.
// answers is a list of letters, e.g. ["B", "A", "C", ...]
function scoreQuiz(quiz, answers) {
  const moduleScores = {};
  const moduleMax = {};
  const wrong = [];
  let score = 0;

  quiz.questions.forEach(function (question, i) {
    const m = question.module;
    moduleMax[m] = (moduleMax[m] || 0) + MARKS_PER_QUESTION;
    moduleScores[m] = moduleScores[m] || 0;
    if (answers[i] === question.answer) {
      score += MARKS_PER_QUESTION;
      moduleScores[m] += MARKS_PER_QUESTION;
    } else {
      wrong.push({ number: i + 1, question: question, given: answers[i] });
    }
  });

  return {
    score: score,
    outOf: quiz.questions.length * MARKS_PER_QUESTION,
    moduleScores: moduleScores,
    moduleMax: moduleMax,
    wrong: wrong
  };
}

// Percentage improvement = (post - pre) / pre x 100, rounded to 1 decimal place.
// Returns null when the pre score is 0 (you cannot divide by zero).
function percentImprovement(pre, post) {
  if (pre === 0) return null;
  return roundTo(((post - pre) / pre) * 100, 1);
}

// After the last question: score the quiz and save it with the date.
// The shuffled option order is saved too, so the review shows the same letters the user saw.
function saveQuizResult(type) {
  const answers = quizProgress[type].answers;
  const result = scoreQuiz(QUIZZES[type], answers);
  saveData(STORAGE_KEYS[type], {
    score: result.score,
    outOf: result.outOf,
    moduleScores: result.moduleScores,
    answers: answers,
    order: quizProgress[type].order,
    date: new Date().toISOString()
  });
  quizProgress[type] = { showResults: true };
}

// The text of an option with the letter it had on screen, e.g. "B. Balance sheet".
// letter is the option's letter in quiz.js; order is that question's shuffled order.
function optionText(question, letter, order) {
  const index = LETTERS.indexOf(letter);
  if (index === -1) return "No answer";
  const position = order ? order.indexOf(index) : index;
  return LETTERS[position] + ". " + question.options[index];
}

// "M1 15/20, M2 20/20, ..." for the Google Form
function moduleScoresText(result) {
  return Object.keys(result.moduleMax).map(function (m) {
    return "M" + m + " " + result.moduleScores[m] + "/" + result.moduleMax[m];
  }).join(", ");
}

// Results page: total, score per module, improvement (post only) and wrong answers
function renderQuizResults(type) {
  const quiz = QUIZZES[type];
  const saved = loadData(STORAGE_KEYS[type]);
  if (!saved) {
    quizProgress[type] = null;
    renderQuizStart(type);
    return;
  }
  const result = scoreQuiz(quiz, saved.answers);

  // 20 squares, one per question, grouped by module: teal = right, dark = wrong
  let n = 0;
  const strip = groupByModule(quiz, rightOrWrong(quiz, saved.answers)).map(function (group) {
    return '<div class="strip-group">' +
      '<div class="strip-cells">' + group.items.map(function (right) {
        return '<span class="strip-cell' + (right ? " is-right" : "") + '" style="--i:' + (n++) + '"></span>';
      }).join("") + "</div>" +
      '<span class="strip-label">M' + group.module + "</span>" +
    "</div>";
  }).join("");

  // Table of score per module, with bars that grow
  const moduleRows = Object.keys(result.moduleMax).map(function (m, i) {
    const title = MODULES[m - 1] ? MODULES[m - 1].title : "";
    const percent = Math.round((result.moduleScores[m] / result.moduleMax[m]) * 100);
    return "<tr>" +
      "<td>Module " + m + (title ? ": " + escapeHtml(title) : "") + "</td>" +
      '<td class="num">' + result.moduleScores[m] + " / " + result.moduleMax[m] +
        '<div class="mini-bar"><span class="grow" style="width:' + percent + "%;--i:" + i + '"></span></div></td>' +
    "</tr>";
  }).join("");

  // Pre vs post comparison (Post Quiz only, and only if a pre score exists)
  let compareHtml = "";
  if (type === "post") {
    const pre = loadData(STORAGE_KEYS.pre);
    if (pre) {
      const gain = result.score - pre.score;
      const improvement = percentImprovement(pre.score, result.score);
      const improvementHtml = improvement === null
        ? '<div class="stat stat-wide"><div class="stat-value is-small">Percentage improvement not available</div></div>'
        : '<div class="stat stat-wide"><div class="stat-label">Percentage improvement</div><div class="stat-value ' + gainClass(improvement) + '">' + countHtml(improvement, "percentOne", 300) + "</div></div>";
      const scoreRow = function (label, score, isPost, i) {
        return '<div class="improve-row' + (isPost ? " is-post" : "") + '">' +
          '<span class="improve-label">' + label + "</span>" +
          '<span class="improve-val">' + countHtml(score, "int", 150 + i * 110) + "</span>" +
          '<div class="improve-track"><span class="grow" style="width:' + Math.max(0, Math.min(100, score)) + "%;--i:" + i + '"></span></div>' +
        "</div>";
      };
      compareHtml =
        "<h2>Your improvement</h2>" +
        '<div class="improve-bars" data-reveal="bars">' +
          scoreRow("Pre quiz score", pre.score, false, 0) +
          scoreRow("Post quiz score", result.score, true, 1) +
        "</div>" +
        '<div class="stat-grid">' +
          '<div class="stat stat-wide"><div class="stat-label">Raw gain (post minus pre)</div><div class="stat-value ' + gainClass(gain) + '">' + countHtml(gain, "int", 300) + "</div></div>" +
          improvementHtml +
        "</div>";
    }
  }

  // Review of every wrong answer
  let reviewHtml;
  if (result.wrong.length === 0) {
    reviewHtml = '<p class="all-right" data-reveal="rise">' + icon("check", 22) + "You got every question right.</p>";
  } else {
    reviewHtml = '<ol class="review-list">' + result.wrong.map(function (item, k) {
      const order = saved.order ? saved.order[item.number - 1] : null;
      return '<li class="review-item" data-reveal="rise" style="--i:' + Math.min(k, 3) + '">' +
        '<p class="review-question"><span class="review-num">Question ' + item.number + "</span>" + escapeHtml(item.question.question) + "</p>" +
        '<p class="review-yours">' + icon("cross", 18) + "<span>Your answer: " + escapeHtml(optionText(item.question, item.given, order)) + "</span></p>" +
        '<p class="review-correct">' + icon("check", 18) + "<span>Correct answer: " + escapeHtml(optionText(item.question, item.question.answer, order)) + "</span></p>" +
      "</li>";
    }).join("") + "</ol>";
  }

  const nextStep = type === "pre"
    ? '<a class="btn" href="#/module/1">Start Module 1' + icon("arrowRight", 18) + "</a>"
    : '<a class="btn" href="#/simulation">Go to the Simulation' + icon("arrowRight", 18) + "</a>";

  paint(
    "<h1>Your results</h1>" +
    '<p class="result-sub">' + escapeHtml(quiz.title) + "</p>" +
    '<section class="score-hero">' +
      '<p class="score-caption">Total score</p>' +
      '<p class="score-figure"><span class="score-number">' + countHtml(result.score, "int", 200, 1500) + '</span><span class="score-out">/ ' + result.outOf + "</span></p>" +
      '<div class="answer-strip" data-reveal="cells" aria-hidden="true">' + strip + "</div>" +
      '<p class="strip-key" aria-hidden="true"><span><i class="is-right"></i>Correct</span><span><i></i>Wrong</span></p>' +
      '<p class="score-date">Taken on ' + formatDate(saved.date) + "</p>" +
    "</section>" +
    compareHtml +
    "<h2>Score per module</h2>" +
    '<table class="data-table score-table" data-reveal="bars"><thead><tr><th scope="col">Module</th><th scope="col" class="num">Score</th></tr></thead><tbody>' + moduleRows + "</tbody></table>" +
    "<h2>Questions you got wrong</h2>" +
    reviewHtml +
    '<div class="button-row">' +
      '<button type="button" class="btn" data-action="submit-quiz" data-quiz="' + type + '">' + icon("send", 18) + "Submit my results</button>" +
      nextStep +
      '<button type="button" class="btn btn-secondary" data-action="quiz-start" data-quiz="' + type + '">' + icon("retry", 18) + "Retake the quiz</button>" +
    "</div>" +
    '<div class="form-message" id="form-message" hidden></div>'
  );
}

// Values sent to the Google Form from a quiz results page
function quizFormValues(type) {
  const saved = loadData(STORAGE_KEYS[type]);
  const result = scoreQuiz(QUIZZES[type], saved.answers);
  const values = {
    quizName: QUIZZES[type].title,
    totalScore: result.score,
    moduleScores: moduleScoresText(result),
    dateTaken: formatDate(saved.date)
  };
  if (type === "pre") {
    values.preScore = result.score;
  } else {
    const pre = loadData(STORAGE_KEYS.pre);
    values.postScore = result.score;
    if (pre) {
      const improvement = percentImprovement(pre.score, result.score);
      values.preScore = pre.score;
      values.rawGain = result.score - pre.score;
      values.percentImprovement = improvement === null ? "Percentage improvement not available" : improvement.toFixed(1) + "%";
    } else {
      values.preScore = "Not taken";
    }
  }
  return values;
}


/* =============================================================
   11. SIMULATION
   -------------------------------------------------------------
   Saved picks look like this:
     { started: true, locked: false, lockedAt: null,
       picks: { HEROMOTOCO: { amount: 200000, reason: "..." } } }
   ============================================================= */

let simulationScreen = "results"; // after locking: "results" or "reveal"

function loadSimulation() {
  return loadData(STORAGE_KEYS.simulation) || { started: false, locked: false, lockedAt: null, picks: {} };
}

function saveSimulation(sim) {
  saveData(STORAGE_KEYS.simulation, sim);
}

// Only companies with inSimulation: true are shown
function simulationCompanies() {
  return COMPANIES.filter(function (company) { return company.inSimulation === true; });
}

function renderSimulation() {
  setTitle("Simulation");
  const sim = loadSimulation();
  if (sim.locked) {
    if (simulationScreen === "reveal") renderSimReveal(sim);
    else renderSimResults(sim);
  } else if (sim.started) {
    renderSimPicking(sim);
  } else {
    renderSimIntro();
  }
}

/* ---- Screen 1: introduction ---- */
function renderSimIntro() {
  paint(
    "<h1>Simulation</h1>" +
    '<p class="lead">' + escapeHtml(PAGE_TEXT.simulationIntro) + "</p>" +
    // A line from 1 June to 23 October that draws itself
    '<div class="period" data-reveal="period" aria-hidden="true">' +
      '<div class="period-end"><span class="period-dot"></span><span class="period-date">1 June 2026</span></div>' +
      '<div class="period-line"><span></span></div>' +
      '<div class="period-end is-end"><span class="period-dot"></span><span class="period-date">23 October 2026</span></div>' +
    "</div>" +
    '<button type="button" class="btn btn-big" data-action="sim-start">Start' + icon("arrowRight", 20) + "</button>"
  );
}

/* ---- Screen 2: company cards ---- */
function renderSimPicking(sim) {
  const cards = simulationCompanies().map(function (company, index) {
    return companyCardHtml(company, sim.picks[company.nseCode], index);
  }).join("");

  paint(
    "<h1>Simulation</h1>" +
    '<p class="lead">Enter an amount and one sentence for each company you want to invest in. Leave the amount empty to skip a company.</p>' +
    '<div class="budget-bar" id="budget-bar">' +
      '<div class="budget-main">Remaining budget: <strong id="budget-remaining"></strong></div>' +
      '<div class="budget-meter" aria-hidden="true"><span id="budget-meter-fill"></span></div>' +
      '<div class="budget-sub" id="budget-sub"></div>' +
    "</div>" +
    '<div class="company-grid">' + cards + "</div>" +
    /* Screen 3: lock in */
    '<div class="lock-box">' +
      '<button type="button" class="btn btn-big" data-action="sim-lock">' + icon("lockOpen", 22) + "Lock in my picks</button>" +
      '<p class="form-error" id="lock-error" hidden></p>' +
    "</div>"
  );

  updateBudgetBar(sim, true);
  simulationCompanies().forEach(function (company) {
    const pick = sim.picks[company.nseCode];
    updatePickHint(company.nseCode, pick ? pick.amount : 0, false);
  });
}

// One company card with its numbers and the two inputs underneath
function companyCardHtml(company, pick, index) {
  const code = company.nseCode;
  const price = PRICES[code] || {};
  const notes = company.notes || {};
  const amount = pick && pick.amount > 0 ? pick.amount : "";
  const reason = pick ? pick.reason || "" : "";

  // [label, value, optional note]
  const rows = [
    ["NSE code", showValue(company.nseCode)],
    ["Sector", showValue(company.sector)],
    ["Data as of (date)", showValue(company.dataAsOf)],
    ["Market cap (Rs crore)", showFigure(company.marketCap)],
    ["Share price on 1 June 2026 (Rs)", showFigure(price.startPrice)],
    ["PE", showFigure(company.pe)],
    ["Industry PE", showFigure(company.industryPE)],
    ["ROE %", showFigure(company.roe)],
    ["ROCE %", showFigure(company.roce)],
    ["Debt to equity", showFigure(company.debtToEquity), notes.debtToEquity],
    ["Sales FY25 / FY26 (Rs crore)", showFigure(company.salesFY25) + " / " + showFigure(company.salesFY26)],
    ["Net profit FY25 / FY26 (Rs crore)", showFigure(company.netProfitFY25) + " / " + showFigure(company.netProfitFY26), notes.netProfit],
    ["3 year sales growth %", showFigure(company.salesGrowth3Years)],
    ["3 year profit growth %", showFigure(company.profitGrowth3Years)],
    ["Operating profit margin %", showFigure(company.operatingProfitMargin)],
    ["Cash from operations FY26 (Rs crore)", showFigure(company.cashFromOperationsFY26), notes.cashFromOperations],
    ["Promoter holding % and pledge %", showFigure(company.promoterHolding) + " / " + showFigure(company.promoterPledge), notes.promoter],
    ["Dividend yield %", showFigure(company.dividendYield)]
  ];

  const facts = rows.map(function (row) {
    const note = row[2] ? '<span class="fact-note">(' + escapeHtml(row[2]) + ")</span>" : "";
    return '<div class="fact"><dt>' + row[0] + "</dt><dd>" + row[1] + note + "</dd></div>";
  }).join("");

  return '<article class="company-card' + (amount ? " is-picked" : "") + '" id="card-' + code + '" data-reveal="rise" style="--i:' + (index % 2) + '">' +
    '<dl class="facts"><div class="fact fact-head"><dt>Company</dt><dd><h2 class="company-name">' + escapeHtml(company.name) + "</h2></dd></div></dl>" +
    '<p class="consolidated">' + escapeHtml(PAGE_TEXT.consolidatedNote) + "</p>" +
    '<dl class="facts">' + facts + "</dl>" +
    '<div class="flags">' +
      '<div class="flag flag-green">' + icon("flag", 22) + '<span class="flag-text"><span class="flag-label">Green flags (count)</span><span class="flag-count">' + showValue(company.greenFlags) + "</span></span></div>" +
      '<div class="flag flag-red">' + icon("flag", 22) + '<span class="flag-text"><span class="flag-label">Red flags (count)</span><span class="flag-count">' + showValue(company.redFlags) + "</span></span></div>" +
    "</div>" +
    '<div class="pick" id="pick-' + code + '">' +
      '<label class="field-label" for="amount-' + code + '">Amount to invest (Rs)</label>' +
      '<div class="amount-wrap"><span class="amount-prefix" aria-hidden="true">Rs</span>' +
        '<input id="amount-' + code + '" class="amount-input" type="text" inputmode="numeric" autocomplete="off" placeholder="0" value="' + amount + '" data-input="amount" data-code="' + code + '">' +
      "</div>" +
      '<p class="pick-hint" id="hint-' + code + '"></p>' +
      '<label class="field-label" for="reason-' + code + '">Why? (one sentence)</label>' +
      '<textarea id="reason-' + code + '" class="reason-input" rows="2" data-input="reason" data-code="' + code + '">' + escapeHtml(reason) + "</textarea>" +
      '<p class="form-error" id="reason-error-' + code + '" hidden>Please write one sentence explaining why.</p>' +
    "</div>" +
  "</article>";
}

// Adds up the amounts typed in (each amount already includes its brokerage)
function totalInvested(picks) {
  return Object.keys(picks).reduce(function (sum, code) {
    return sum + (picks[code].amount || 0);
  }, 0);
}

// The sticky bar: Rs 10,00,000 minus everything typed in so far.
// The remaining number rolls to its new value and the teal bar fills up.
function updateBudgetBar(sim, instant) {
  const remainingEl = document.getElementById("budget-remaining");
  if (!remainingEl) return;
  const invested = totalInvested(sim.picks);
  const brokerage = Object.keys(sim.picks).reduce(function (sum, code) {
    return sum + Math.round((sim.picks[code].amount || 0) * 100 * BROKERAGE_RATE) / 100;
  }, 0);
  const remaining = STARTING_BUDGET - invested;

  if (instant || remainingEl.tweenValue === undefined) {
    remainingEl.textContent = formatRupees(remaining);
    remainingEl.tweenValue = remaining;
  } else {
    tweenNumber(remainingEl, remainingEl.tweenValue, remaining, "rupees", 450, 0);
  }
  document.getElementById("budget-meter-fill").style.transform = "scaleX(" + Math.min(1, invested / STARTING_BUDGET) + ")";
  document.getElementById("budget-sub").textContent = "Invested " + formatRupees(invested) + ", including " + formatRupees(brokerage) + " brokerage";
}

// The small line under an amount box: brokerage and how many shares it buys
function updatePickHint(code, amount, wasCapped) {
  const hint = document.getElementById("hint-" + code);
  if (!hint) return;
  hint.classList.toggle("is-capped", wasCapped);
  if (!(amount > 0)) {
    hint.textContent = "";
    return;
  }
  const brokerage = Math.round(amount * 100 * BROKERAGE_RATE) / 100;
  let text = (wasCapped ? "Capped at your remaining budget. " : "") +
    "Brokerage " + formatRupees(brokerage) + " is taken from this amount.";
  const startPrice = toNumber((PRICES[code] || {}).startPrice);
  if (startPrice && startPrice > 0) {
    const shares = Math.floor(Math.round((amount - brokerage) * 100) / Math.round(startPrice * 100));
    text += " It buys " + shares + " shares.";
  }
  hint.textContent = text;
}

// Runs every time a digit is typed into an amount box
function handleAmountInput(input) {
  const sim = loadSimulation();
  if (sim.locked) return;
  const code = input.dataset.code;
  const digits = input.value.replace(/[^0-9]/g, "");
  let amount = digits === "" ? 0 : parseInt(digits, 10);

  // Do not allow the total (including brokerage) to go above Rs 10,00,000
  const othersTotal = totalInvested(sim.picks) - ((sim.picks[code] && sim.picks[code].amount) || 0);
  const maxForThis = Math.max(0, STARTING_BUDGET - othersTotal);
  let wasCapped = false;
  if (amount > maxForThis) {
    amount = maxForThis;
    wasCapped = true;
  }
  input.value = amount > 0 ? String(amount) : "";

  sim.picks[code] = { amount: amount, reason: (sim.picks[code] && sim.picks[code].reason) || "" };
  saveSimulation(sim);
  updateBudgetBar(sim, false);
  updatePickHint(code, amount, wasCapped);
  document.getElementById("card-" + code).classList.toggle("is-picked", amount > 0);
}

// Runs every time a letter is typed into a "Why?" box
function handleReasonInput(textarea) {
  const sim = loadSimulation();
  if (sim.locked) return;
  const code = textarea.dataset.code;
  sim.picks[code] = { amount: (sim.picks[code] && sim.picks[code].amount) || 0, reason: textarea.value };
  saveSimulation(sim);
  if (textarea.value.trim() !== "") {
    document.getElementById("reason-error-" + code).hidden = true;
    document.getElementById("pick-" + code).classList.remove("has-error");
  }
}

/* ---- Screen 3: lock in ---- */
function tryLockPicks() {
  const sim = loadSimulation();
  const lockError = document.getElementById("lock-error");
  const inSimulation = simulationCompanies().map(function (c) { return c.nseCode; });
  const chosen = Object.keys(sim.picks).filter(function (code) {
    return sim.picks[code].amount > 0 && inSimulation.indexOf(code) !== -1;
  });

  // Clear old error messages
  lockError.hidden = true;
  appEl.querySelectorAll(".pick").forEach(function (box) { box.classList.remove("has-error"); });
  appEl.querySelectorAll("[id^='reason-error-']").forEach(function (msg) { msg.hidden = true; });

  if (chosen.length === 0) {
    lockError.textContent = "Enter an amount for at least one company before you lock in.";
    lockError.hidden = false;
    return;
  }

  // Every company with an amount above zero needs a sentence
  const missing = chosen.filter(function (code) { return !(sim.picks[code].reason || "").trim(); });
  if (missing.length > 0) {
    missing.forEach(function (code) {
      document.getElementById("reason-error-" + code).hidden = false;
      document.getElementById("pick-" + code).classList.add("has-error");
    });
    lockError.textContent = "Write one sentence for every company you have invested in.";
    lockError.hidden = false;
    const first = document.getElementById("reason-" + missing[0]);
    first.scrollIntoView({ behavior: motionOK() ? "smooth" : "auto", block: "center" });
    first.focus({ preventScroll: true });
    return;
  }

  if (totalInvested(sim.picks) > STARTING_BUDGET) {
    lockError.textContent = "Your total is above Rs 10,00,000. Lower an amount.";
    lockError.hidden = false;
    return;
  }

  openConfirm(PAGE_TEXT.lockConfirm, "Continue", lockPicks, "lock");
}

// Freezes and saves the picks
function lockPicks() {
  const sim = loadSimulation();
  const finalPicks = {};
  Object.keys(sim.picks).forEach(function (code) {
    const pick = sim.picks[code];
    if (pick.amount > 0 && findCompany(code) && findCompany(code).inSimulation) {
      finalPicks[code] = { amount: pick.amount, reason: pick.reason.trim() };
    }
  });
  sim.picks = finalPicks;
  sim.locked = true;
  sim.lockedAt = new Date().toISOString();
  saveSimulation(sim);
  simulationScreen = "results";
  renderSimulation();
  window.scrollTo(0, 0);
  playPageEnter();
}

/* ---- The simulation maths ----------------------------------
   For each company picked:
     Brokerage       = 0.5% of the amount invested
     After brokerage = amount invested - brokerage
     Shares bought   = after brokerage / 1 June price, rounded DOWN to a whole number
     Leftover        = after brokerage - (shares x 1 June price)  -> goes back to cash
     Value           = shares x 23 October price
     Profit or loss  = value + leftover - amount invested
   Totals:
     Cash left       = 10,00,000 - total invested + all leftovers
     Total value     = value of all shares + cash left
     Total profit    = total value - 10,00,000
     Total profit %  = total profit / total invested x 100
   Everything is worked out in paise (1 rupee = 100 paise) so
   there are no rounding errors.
   ------------------------------------------------------------ */
function calculateSimulation(picks) {
  const rows = [];
  let investedPaise = 0;
  let leftoverPaise = 0;
  let sharesValuePaise = 0;
  let allPricesReady = true;

  Object.keys(picks).forEach(function (code) {
    const amount = picks[code].amount;
    if (!(amount > 0)) return;
    const company = findCompany(code) || { name: code };
    const price = PRICES[code] || {};
    const startPrice = toNumber(price.startPrice);
    const endPrice = toNumber(price.endPrice);

    const amountPaise = Math.round(amount * 100);
    const brokeragePaise = Math.round(amountPaise * BROKERAGE_RATE);
    const afterBrokeragePaise = amountPaise - brokeragePaise;
    investedPaise += amountPaise;

    const row = {
      code: code,
      name: company.name,
      reason: picks[code].reason,
      redFlags: company.redFlags,
      revealText: company.revealText,
      amount: amount,
      brokerage: brokeragePaise / 100,
      ready: false
    };

    if (startPrice !== null && startPrice > 0 && endPrice !== null) {
      const startPaise = Math.round(startPrice * 100);
      const endPaise = Math.round(endPrice * 100);
      const shares = Math.floor(afterBrokeragePaise / startPaise);
      const rowLeftoverPaise = afterBrokeragePaise - shares * startPaise;
      const valuePaise = shares * endPaise;
      const profitPaise = valuePaise + rowLeftoverPaise - amountPaise;
      row.ready = true;
      row.shares = shares;
      row.leftover = rowLeftoverPaise / 100;
      row.value = valuePaise / 100;
      row.profit = profitPaise / 100;
      row.profitPercent = (profitPaise / amountPaise) * 100;
      leftoverPaise += rowLeftoverPaise;
      sharesValuePaise += valuePaise;
    } else {
      allPricesReady = false;
    }
    rows.push(row);
  });

  const budgetPaise = STARTING_BUDGET * 100;
  const cashLeftPaise = budgetPaise - investedPaise + leftoverPaise;
  const totalValuePaise = sharesValuePaise + cashLeftPaise;
  const profitPaise = totalValuePaise - budgetPaise;

  // Nifty Midcap 150 change over the same period
  const indexStart = toNumber(PRICES.niftyMidcap150Start);
  const indexEnd = toNumber(PRICES.niftyMidcap150End);
  const indexReady = indexStart !== null && indexStart > 0 && indexEnd !== null;
  const indexChange = indexReady ? ((indexEnd - indexStart) / indexStart) * 100 : null;

  const profitPercent = investedPaise > 0 ? (profitPaise / investedPaise) * 100 : 0;

  // Difference in percentage points, using the same rounded numbers shown on screen
  const difference = allPricesReady && indexReady
    ? roundTo(roundTo(profitPercent, 2) - roundTo(indexChange, 2), 2)
    : null;

  return {
    rows: rows,
    allPricesReady: allPricesReady,
    indexReady: indexReady,
    totalInvested: investedPaise / 100,
    cashLeft: cashLeftPaise / 100,
    totalValue: totalValuePaise / 100,
    totalProfit: profitPaise / 100,
    totalProfitPercent: profitPercent,
    indexChange: indexChange,
    difference: difference
  };
}

// Counts the picked companies with 3 or more red flags. Returns null if any count is still "TBD".
function countRedFlagPicks(rows) {
  let count = 0;
  for (let i = 0; i < rows.length; i++) {
    const flags = toNumber(rows[i].redFlags);
    if (flags === null) return null;
    if (flags >= RED_FLAG_LIMIT) count++;
  }
  return count;
}

// Two bars, "Your picks" and the index, growing from a zero line
function versusChartHtml(calc) {
  if (!(calc.allPricesReady && calc.indexReady)) return "";
  const you = roundTo(calc.totalProfitPercent, 2);
  const index = roundTo(calc.indexChange, 2);
  const hasLoss = you < 0 || index < 0;
  const hasGain = you > 0 || index > 0;
  // Where the zero line sits: left edge, middle, or right edge
  const axis = hasLoss && hasGain ? 50 : hasLoss ? 100 : 0;
  const room = hasLoss && hasGain ? 50 : 100;
  const biggest = Math.max(Math.abs(you), Math.abs(index)) || 1;

  function row(label, value, barClass, i) {
    const width = (Math.abs(value) / biggest) * room;
    const left = value >= 0 ? axis : axis - width;
    return '<div class="vs-row">' +
      '<span class="vs-label">' + label + "</span>" +
      '<div class="vs-track">' +
        '<span class="vs-bar grow ' + barClass + '" style="left:' + left + "%;width:" + width + "%;transform-origin:" + (value >= 0 ? "left" : "right") + ";--i:" + i + '"></span>' +
        '<span class="vs-axis" style="left:' + axis + '%"></span>' +
      "</div>" +
      '<span class="vs-val ' + gainClass(value) + '">' + countHtml(value, "percentSigned", 150 + i * 110) + "</span>" +
    "</div>";
  }

  return '<section class="vs-chart" data-reveal="bars">' +
    "<h2>Your picks against the index</h2>" +
    row("Your picks", you, "is-you", 0) +
    row("Nifty Midcap 150", index, "is-index", 1) +
  "</section>";
}

/* ---- Screen 4: results ---- */
function renderSimResults(sim) {
  const calc = calculateSimulation(sim.picks);
  const soon = '<span class="coming-soon">' + PAGE_TEXT.comingSoon + "</span>";

  const rows = calc.rows.map(function (row, i) {
    return '<tr data-reveal="rise" style="--i:' + i + '">' +
      '<td class="cell-company" data-label="Company">' + escapeHtml(row.name) + "</td>" +
      '<td class="num" data-label="Amount invested">' + formatRupees(row.amount) + "</td>" +
      '<td class="num" data-label="Brokerage (0.5%)">' + formatRupees(row.brokerage) + "</td>" +
      '<td class="num" data-label="Shares bought">' + (row.ready ? row.shares.toLocaleString("en-IN") : soon) + "</td>" +
      '<td class="num" data-label="Leftover returned to cash">' + (row.ready ? formatRupees(row.leftover) : soon) + "</td>" +
      '<td class="num" data-label="Value on 23 October 2026">' + (row.ready ? formatRupees(row.value) : soon) + "</td>" +
      '<td class="num ' + (row.ready ? gainClass(row.profit) : "") + '" data-label="Profit or loss (Rs)">' + (row.ready ? formatRupees(row.profit, true) : soon) + "</td>" +
      '<td class="num ' + (row.ready ? gainClass(row.profit) : "") + '" data-label="Profit or loss (%)">' + (row.ready ? formatPercent(row.profitPercent, true) : soon) + "</td>" +
    "</tr>";
  }).join("");

  function stat(label, valueHtml, extraClass, i) {
    return '<div class="stat" data-reveal="rise" style="--i:' + i + '"><div class="stat-label">' + label + '</div><div class="stat-value ' + (extraClass || "") + '">' + valueHtml + "</div></div>";
  }

  const ready = calc.allPricesReady;
  const totals =
    '<div class="totals">' +
      stat("Total invested", countHtml(calc.totalInvested, "rupees"), "", 0) +
      stat("Cash left", ready ? countHtml(calc.cashLeft, "rupees") : soon, "", 1) +
      stat("Total value on 23 October 2026", ready ? countHtml(calc.totalValue, "rupees") : soon, "", 2) +
      stat("Total profit or loss", ready ? countHtml(calc.totalProfit, "rupeesSigned") + " (" + countHtml(calc.totalProfitPercent, "percentSigned") + ")" : soon, ready ? gainClass(calc.totalProfit) : "", 3) +
      stat("Nifty Midcap 150 change, 1 June 2026 to 23 October 2026", calc.indexReady ? countHtml(calc.indexChange, "percentSigned") : soon, calc.indexReady ? gainClass(calc.indexChange) : "", 4) +
    "</div>" +
    '<p class="totals-note">Total value includes your cash left. The profit or loss % is worked out on the ' + formatRupees(calc.totalInvested) + " you invested.</p>";

  let verdict;
  if (calc.difference === null) {
    verdict = '<p class="verdict is-pending">' + PAGE_TEXT.comingSoon + "</p>";
  } else if (calc.difference > 0) {
    verdict = '<p class="verdict is-win" data-reveal="wipe">' + icon("trendUp", 28) + "<span>You beat the index by " + calc.difference.toFixed(2) + " percentage points.</span></p>";
  } else if (calc.difference < 0) {
    verdict = '<p class="verdict is-lose" data-reveal="wipe">' + icon("trendDown", 28) + "<span>The index beat you by " + Math.abs(calc.difference).toFixed(2) + " percentage points.</span></p>";
  } else {
    verdict = '<p class="verdict is-pending">You matched the index exactly (0.00 percentage points).</p>';
  }

  paint(
    '<header class="results-head">' +
      '<span class="lock-badge" aria-hidden="true">' + icon("lock", 28) + "</span>" +
      "<div><h1>Your results</h1><p>You locked in your picks on " + formatDate(sim.lockedAt) + ".</p></div>" +
    "</header>" +
    '<table class="data-table results-table responsive-table">' +
      "<thead><tr>" +
        '<th scope="col">Company</th>' +
        '<th scope="col" class="num">Amount invested</th>' +
        '<th scope="col" class="num">Brokerage (0.5%)</th>' +
        '<th scope="col" class="num">Shares bought</th>' +
        '<th scope="col" class="num">Leftover to cash</th>' +
        '<th scope="col" class="num">Value on 23 October 2026</th>' +
        '<th scope="col" class="num">Profit or loss (Rs)</th>' +
        '<th scope="col" class="num">Profit or loss (%)</th>' +
      "</tr></thead>" +
      "<tbody>" + rows + "</tbody>" +
    "</table>" +
    versusChartHtml(calc) +
    totals +
    verdict +
    '<div class="button-row">' +
      '<button type="button" class="btn" data-action="sim-reveal">See the reveal' + icon("arrowRight", 18) + "</button>" +
      '<button type="button" class="btn btn-secondary" data-action="submit-sim">' + icon("send", 18) + "Submit my simulation results</button>" +
    "</div>" +
    '<div class="form-message" id="form-message" hidden></div>'
  );
}

/* ---- Screen 5: reveal ---- */
function renderSimReveal(sim) {
  const calc = calculateSimulation(sim.picks);
  const redFlagPicks = countRedFlagPicks(calc.rows);

  // Each card is unveiled from the top, one after another
  const cards = calc.rows.map(function (row, i) {
    return '<article class="reveal-card" data-reveal="unveil" style="--i:' + Math.min(i, 3) + '">' +
      "<h2>" + escapeHtml(row.name) + "</h2>" +
      '<p class="reveal-label">Your sentence</p>' +
      '<p class="reveal-quote">' + escapeHtml(row.reason) + "</p>" +
      '<p class="reveal-label">What explains the price move</p>' +
      '<p class="reveal-text">' + showValue(row.revealText) + "</p>" +
      '<p class="reveal-flags">' + icon("flag", 18) + "Red flags: " + showValue(row.redFlags) + "</p>" +
    "</article>";
  }).join("");

  paint(
    "<h1>The reveal</h1>" +
    cards +
    '<p class="redflag-summary" data-reveal="rise">' + icon("flag", 22) + "Companies you picked with 3 or more red flags: " + (redFlagPicks === null ? PAGE_TEXT.comingSoon : redFlagPicks) + "</p>" +
    '<div class="button-row">' +
      '<button type="button" class="btn btn-secondary" data-action="sim-results">' + icon("arrowLeft", 18) + "Back to results</button>" +
      '<button type="button" class="btn" data-action="submit-sim">' + icon("send", 18) + "Submit my simulation results</button>" +
    "</div>" +
    '<div class="form-message" id="form-message" hidden></div>'
  );
}

// Values sent to the Google Form from the simulation
function simulationFormValues() {
  const sim = loadSimulation();
  const calc = calculateSimulation(sim.picks);
  const redFlagPicks = countRedFlagPicks(calc.rows);
  return {
    totalReturn: calc.allPricesReady ? formatPercent(calc.totalProfitPercent) : PAGE_TEXT.comingSoon,
    indexReturn: calc.indexReady ? formatPercent(calc.indexChange) : PAGE_TEXT.comingSoon,
    redFlagCompanies: redFlagPicks === null ? PAGE_TEXT.comingSoon : redFlagPicks,
    sentences: calc.rows.map(function (row) { return row.reason; }).join(" | ")
  };
}

/* ---- Hidden reset page (#/reset) for testing ---- */
function renderReset() {
  setTitle("Clear saved data");
  paint(
    "<h1>Clear saved data</h1>" +
    "<p>This removes the saved quiz scores and simulation picks from this device. It is meant for testing.</p>" +
    '<button type="button" class="btn" data-action="reset-all">Clear all saved data</button>' +
    '<p class="notice" id="reset-done" hidden>All saved data has been cleared.</p>'
  );
}

function resetAll() {
  deleteData(STORAGE_KEYS.pre);
  deleteData(STORAGE_KEYS.post);
  deleteData(STORAGE_KEYS.simulation);
  quizProgress.pre = null;
  quizProgress.post = null;
  simulationScreen = "results";
  document.getElementById("reset-done").hidden = false;
}


/* =============================================================
   12. GOOGLE FORM "SUBMIT" BUTTONS
   -------------------------------------------------------------
   Opens the Google Form in a new tab with the answers already
   filled in. If the form link has not been added yet, it shows
   what would have been sent instead.
   ============================================================= */
function submitToGoogleForm(link, fields, values) {
  const message = document.getElementById("form-message");
  const notConnected = !link || link.indexOf("GOOGLE_FORM_LINK_HERE") !== -1 || !/^https?:\/\//i.test(link);

  if (notConnected) {
    const list = Object.keys(values).map(function (key) {
      return "<dt>" + escapeHtml(FIELD_NAMES[key] || key) + "</dt><dd>" + escapeHtml(values[key]) + "</dd>";
    }).join("");
    message.innerHTML =
      "<p><strong>The Google Form is not connected yet.</strong> Add the form link at the top of app.js. These are the results that will be sent:</p>" +
      "<dl>" + list + "</dl>";
    message.hidden = false;
    message.scrollIntoView({ behavior: motionOK() ? "smooth" : "auto", block: "nearest" });
    return;
  }

  // Build the pre-filled link: form link + ?usp=pp_url&entry.123=answer&...
  const parts = ["usp=pp_url"];
  Object.keys(values).forEach(function (key) {
    if (fields[key] && values[key] !== undefined && values[key] !== "") {
      parts.push(encodeURIComponent(fields[key]) + "=" + encodeURIComponent(values[key]));
    }
  });
  const url = link.split("?")[0] + "?" + parts.join("&");
  window.open(url, "_blank", "noopener");
}


/* =============================================================
   13. POP-UP CONFIRM BOX
   ============================================================= */
let confirmAction = null;

function openConfirm(messageText, yesLabel, onYes, iconName) {
  confirmAction = onYes;
  document.getElementById("modal-root").innerHTML =
    '<div class="modal-backdrop" data-modal="cancel">' +
      '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-message">' +
        (iconName ? '<span class="modal-icon" aria-hidden="true">' + icon(iconName, 26) + "</span>" : "") +
        '<p id="modal-message">' + escapeHtml(messageText) + "</p>" +
        '<div class="modal-buttons">' +
          '<button type="button" class="btn btn-secondary" data-modal="cancel">Cancel</button>' +
          '<button type="button" class="btn" data-modal="yes">' + escapeHtml(yesLabel) + "</button>" +
        "</div>" +
      "</div>" +
    "</div>";
  document.querySelector('[data-modal="yes"]').focus();
}

// Closes the pop-up. animated = fade it out instead of removing it at once.
function closeConfirm(animated) {
  confirmAction = null;
  const backdrop = document.querySelector("#modal-root .modal-backdrop");
  if (!backdrop) return;
  if (animated && motionOK()) {
    backdrop.classList.add("is-closing");
    setTimeout(function () { backdrop.remove(); }, 170);
  } else {
    backdrop.remove();
  }
}


/* =============================================================
   14. CLICKS AND TYPING
   -------------------------------------------------------------
   Buttons have a data-action="..." name. This one listener
   works out which button was pressed and runs the right code.
   ============================================================= */
document.addEventListener("click", function (event) {
  // Pop-up box buttons
  const modalButton = event.target.closest("[data-modal]");
  if (modalButton) {
    // Clicking inside the white box (but not on a button) should not close it
    if (modalButton.classList.contains("modal-backdrop") && event.target !== modalButton) return;
    const action = modalButton.dataset.modal === "yes" ? confirmAction : null;
    closeConfirm(true);
    if (action) action();
    return;
  }

  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  const quizType = button.dataset.quiz;

  if (action === "toggle-menu") toggleMenu();

  else if (action === "glossary-back") location.hash = glossaryBackHash;

  else if (action === "quiz-start") {
    // A fresh shuffled option order for every attempt
    quizProgress[quizType] = { questionIndex: 0, answers: [], selected: null, order: makeOptionOrder(QUIZZES[quizType]) };
    renderQuizQuestion(quizType, false);
    window.scrollTo(0, 0);
    playPageEnter();
  }
  else if (action === "quiz-pick") pickOption(quizType, button.dataset.letter);
  else if (action === "quiz-next") nextQuestion(quizType);
  else if (action === "quiz-view-results") {
    quizProgress[quizType] = { showResults: true };
    renderQuizResults(quizType);
    window.scrollTo(0, 0);
    playPageEnter();
  }
  else if (action === "submit-quiz") {
    submitToGoogleForm(GOOGLE_FORM.quizFormLink, GOOGLE_FORM.quizFields, quizFormValues(quizType));
  }

  else if (action === "sim-start") {
    const sim = loadSimulation();
    sim.started = true;
    saveSimulation(sim);
    renderSimulation();
    window.scrollTo(0, 0);
    playPageEnter();
  }
  else if (action === "sim-lock") tryLockPicks();
  else if (action === "sim-reveal") {
    simulationScreen = "reveal";
    renderSimulation();
    window.scrollTo(0, 0);
    playPageEnter();
  }
  else if (action === "sim-results") {
    simulationScreen = "results";
    renderSimulation();
    window.scrollTo(0, 0);
    playPageEnter();
  }
  else if (action === "submit-sim") {
    submitToGoogleForm(GOOGLE_FORM.simulationFormLink, GOOGLE_FORM.simulationFields, simulationFormValues());
  }

  else if (action === "reset-all") {
    openConfirm("Clear all saved quiz scores and simulation picks on this device?", "Clear", resetAll);
  }
});

document.addEventListener("input", function (event) {
  const el = event.target;
  if (el.id === "glossary-search") filterGlossary(el.value);
  else if (el.dataset.input === "amount") handleAmountInput(el);
  else if (el.dataset.input === "reason") handleReasonInput(el);
});

// The Escape key closes the pop-up box and the phone menu
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeConfirm(true);
    closeMenu();
  }
});


/* =============================================================
   15. START-UP
   ============================================================= */
function startApp() {
  // If a data file has a typing mistake it will not load. Say which one.
  const missing = [];
  if (typeof MODULES === "undefined") missing.push("data/modules.js");
  if (typeof QUIZZES === "undefined") missing.push("data/quiz.js");
  if (typeof COMPANIES === "undefined") missing.push("data/companies.js");
  if (typeof PRICES === "undefined") missing.push("data/prices.js");
  if (typeof GLOSSARY === "undefined") missing.push("data/glossary.js");
  if (missing.length > 0) {
    appEl.innerHTML =
      "<h1>Something went wrong</h1>" +
      "<p>These files could not be loaded: <strong>" + missing.join(", ") + "</strong>.</p>" +
      "<p>This usually means a typing mistake (for example a missing comma or quote mark) was made while editing them.</p>";
    return;
  }

  // Switch animations on (unless the device asks for reduced motion), and
  // follow the setting if it changes while the site is open
  applyMotionSetting();
  if (reducedMotion) {
    if (reducedMotion.addEventListener) reducedMotion.addEventListener("change", applyMotionSetting);
    else if (reducedMotion.addListener) reducedMotion.addListener(applyMotionSetting);
  }

  // When the page-arrival animation ends, tidy up so it can play again next time
  appEl.addEventListener("animationend", function (event) {
    if (event.target === appEl) appEl.classList.remove("is-entering");
  });

  // Once the fonts have loaded, the menu links change width, so move the teal line
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveNavIndicator);

  window.addEventListener("hashchange", showPage);
  showPage();
}

startApp();
