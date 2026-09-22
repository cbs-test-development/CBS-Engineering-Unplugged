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

// Parses strings like "September 23rd, 2026" + "3:00 PM EST" into a Date.
function parseSessionDateTime(dateStr, timeStr) {
  const cleanDate = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
  const zoneOffsets = { EST: "-05:00", EDT: "-04:00", CST: "-06:00", CDT: "-05:00" };
  let offset = "-05:00";
  let timePart = timeStr || "12:00 PM EST";
  Object.keys(zoneOffsets).forEach(zone => {
    if (timePart.includes(zone)) {
      offset = zoneOffsets[zone];
      timePart = timePart.replace(zone, "").trim();
    }
  });
  const combined = `${cleanDate} ${timePart} GMT${offset.replace(":", "")}`;
  const parsed = new Date(combined);
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
