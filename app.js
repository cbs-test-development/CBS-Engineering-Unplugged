// Renders the page using the content defined in data.js
// You should not need to edit this file — edit data.js instead.

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function linkOrText(label, url) {
  if (!label) return "";
  if (url) return `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
  return `<span class="muted-text">${label}</span>`;
}

const IANA_ZONES = {
  EST: "America/New_York",
  EDT: "America/New_York",
  CST: "America/Chicago",
  CDT: "America/Chicago",
  MST: "America/Denver",
  MDT: "America/Denver",
  PST: "America/Los_Angeles",
  PDT: "America/Los_Angeles"
};

const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
};

// Offset of an IANA zone at a UTC instant, using the browser's TZ database
// so future DST rule changes are picked up automatically.
function timeZoneOffsetMs(utcMs, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).formatToParts(new Date(utcMs));

  const value = {};
  parts.forEach(part => {
    if (part.type !== "literal") value[part.type] = part.value;
  });

  const asUTC = Date.UTC(
    Number(value.year),
    Number(value.month) - 1,
    Number(value.day),
    Number(value.hour),
    Number(value.minute),
    Number(value.second)
  );
  return asUTC - utcMs;
}

// Converts a wall-clock time in a named zone (e.g. 3:00 PM Eastern) to a Date.
function zonedLocalDate(year, month, day, hour, minute, timeZone) {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const corrected = utcGuess - timeZoneOffsetMs(utcGuess, timeZone);
  return new Date(utcGuess - timeZoneOffsetMs(corrected, timeZone));
}

// Parses strings like "September 23rd, 2026" + "3:00 PM EST" into a Date.
// EST/EDT mean Eastern Time (America/New_York); DST is taken from the date,
// not from the abbreviation, so spring/fall switches stay correct.
function parseSessionDateTime(dateStr, timeStr) {
  const cleanDate = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
  let timePart = timeStr || "12:00 PM EST";
  let timeZone = "America/New_York";

  Object.keys(IANA_ZONES).forEach(abbr => {
    if (timePart.includes(abbr)) {
      timeZone = IANA_ZONES[abbr];
      timePart = timePart.replace(abbr, "").trim();
    }
  });

  const dateMatch = cleanDate.match(/^([A-Za-z]+)\s+(\d+),\s+(\d+)$/);
  const timeMatch = timePart.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!dateMatch || !timeMatch) return null;

  const month = MONTHS[dateMatch[1].toLowerCase()];
  const day = Number(dateMatch[2]);
  const year = Number(dateMatch[3]);
  let hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  const meridiem = timeMatch[3].toUpperCase();
  if (!month || hour < 1 || hour > 12) return null;

  if (meridiem === "AM") {
    if (hour === 12) hour = 0;
  } else if (hour !== 12) {
    hour += 12;
  }

  const parsed = zonedLocalDate(year, month, day, hour, minute, timeZone);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function startCountdown(session) {
  const target = parseSessionDateTime(session.date, session.time);
  const labelEl = document.getElementById("countdown-label");
  const timerEl = document.getElementById("countdown-timer");
  const subEl = document.getElementById("countdown-sub");

  if (!target) {
    document.getElementById("countdown-card").style.display = "none";
    return;
  }

  subEl.textContent = `${session.date} at ${session.time} — ${session.topic} (${session.presenter})`;

  function tick() {
    const now = new Date();
    let diff = target.getTime() - now.getTime();

    if (diff <= 0 && diff > -60 * 60 * 1000) {
      labelEl.textContent = "Happening Now";
      timerEl.innerHTML = "";
      return;
    }
    if (diff <= 0) {
      document.getElementById("countdown-card").style.display = "none";
      clearInterval(intervalId);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    labelEl.textContent = "Next Session Starts In";
    timerEl.innerHTML = [
      [days, "Days"],
      [hours, "Hrs"],
      [minutes, "Min"],
      [seconds, "Sec"]
    ].map(([num, unit]) => `
      <div class="segment">
        <div class="num">${String(num).padStart(2, "0")}</div>
        <div class="unit">${unit}</div>
      </div>
    `).join("");
  }

  tick();
  const intervalId = setInterval(tick, 1000);
}

function render() {
  const data = SITE_DATA;

  document.getElementById("about-title").textContent = data.about.title;
  document.getElementById("about-tagline").textContent = data.about.tagline;

  startCountdown(data.upcomingSession);

  const aboutSection = document.getElementById("about-paragraphs");
  data.about.paragraphs.forEach(p => {
    aboutSection.appendChild(el("p", null, p));
  });

  const logisticsList = document.getElementById("logistics-list");
  data.logistics.forEach(item => {
    logisticsList.appendChild(el("li", null, `<strong>${item.label}:</strong> ${item.value}`));
  });

  const upcomingCard = document.getElementById("upcoming-card");
  const upcoming = data.upcomingSession;
  const upcomingFields = [
    ["Date", upcoming.date],
    ["Topic(s)", upcoming.topic],
    ["Presenter(s)", upcoming.presenter]
  ];
  upcomingFields.forEach(([label, value]) => {
    const item = el("div", "upcoming-item");
    item.appendChild(el("div", "label", label));
    item.appendChild(el("div", "value", value));
    upcomingCard.appendChild(item);
  });

  const archiveBody = document.querySelector("#archive-table tbody");
  data.sessionArchive.forEach(row => {
    const tr = document.createElement("tr");
    tr.appendChild(el("td", null, row.date));
    tr.appendChild(el("td", null, row.topic));
    tr.appendChild(el("td", null, row.presenter));
    tr.appendChild(el("td", null, linkOrText(row.recordingLabel, row.recordingUrl)));
    tr.appendChild(el("td", null, linkOrText(row.slidesLabel, row.slidesUrl)));
    archiveBody.appendChild(tr);
  });

  const proposedBody = document.querySelector("#proposed-table tbody");
  data.proposedTopics.forEach(row => {
    const tr = document.createElement("tr");
    tr.appendChild(el("td", null, row.presenter));
    tr.appendChild(el("td", null, row.topic));
    tr.appendChild(el("td", null, row.date));
    proposedBody.appendChild(tr);
  });

  setupScrollReveal();
}

// Fades sections in as the visitor scrolls to them.
function setupScrollReveal() {
  const targets = document.querySelectorAll("main h2, main .card, main .table-wrap");
  targets.forEach(t => t.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    targets.forEach(t => t.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(t => observer.observe(t));
}

render();
