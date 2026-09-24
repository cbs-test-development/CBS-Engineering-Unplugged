/*
  ============================================================
  CBS ENGINEERING UNPLUGGED — CONTENT FILE
  ============================================================
  Edit the text and table rows below to update the website.
  No coding experience needed — just follow these rules:

  1. Keep all text inside quotes "like this".
  2. Every row/item needs a comma "," after it, EXCEPT the very
     last item in a list (the one right before a closing ] or }).
  3. To add a new row, copy an existing row (the part between
     the { and }), paste it above or below, then edit the text.
  4. To remove a row, delete it (the whole { ... } block,
     including its comma).
  5. If a link/file isn't ready yet, just leave the text as "".
  6. After editing, save the file and refresh the website —
     GitHub Pages will pick up changes automatically once pushed.
  ============================================================
*/

const SITE_DATA = {

  // ---- Header / About section text ----
  about: {
    title: "CBS Engineering Unplugged",
    tagline: "REAL ENGINEERING. REAL KNOWLEDGE. UNFILTERED.",
    paragraphs: [
      "CBS Engineering Unplugged is a biweekly forum designed to help us better understand the technologies, products, processes, and people that drive our business.",
      "These sessions are led by subject matter experts from across our extended engineering organization and are open to Product Line Managers and all other CBS team members interested in expanding their technical and business knowledge. Whether you're new to the team, building your technical foundation, or an experienced team member looking to deepen existing knowledge and gain exposure to areas outside your day-to-day role, these sessions are for you.",
      "We encourage everyone to participate, ask questions, share experiences, and suggest future topics. Feel free to invite other CBS team members who may benefit."
    ]
  },

  // ---- Cadence & Logistics list ----
  logistics: [
    { label: "Frequency", value: "Every other week (biweekly Wednesdays 3pm EST)" },
    { label: "Recording", value: "All sessions are recorded" },
    { label: "Materials", value: "Presentation slides are posted after each session (see archive below)" },
    { label: "Audio", value: "Please stay muted unless you're speaking" },
    { label: "Who can attend", value: "Open to all CBS team members — Forward this page/meeting invite to anyone who'd benefit." }
  ],

  // ---- Upcoming Session (single, most recent) ----
  // "date" and "time" are used to build the live countdown banner at the
  // top of the page. Keep "time" in the format "3:00 PM EST" (or EDT).
  // EST/EDT both mean Eastern Time; daylight saving is applied from the date.
  upcomingSession: {
    date: "October 7th, 2026",
    time: "3:00 PM EST",
    topic: "SI for 224G and emerging technologies",
    presenter: "JR Racines"
  },

  // ---- Session Archive (past sessions with recordings/slides) ----
  // recordingUrl / slidesUrl: paste a link, or leave as "" if none yet.
  sessionArchive: [
    {
      date: "August 26th, 2026",
      topic: "Intro to BERT Automation / BERT SI Data HTML Dashboard",
      presenter: "Joe Bongiorno & Quinn Gaumer",
      recordingLabel: "CBS Engineering Unplugged- 20260826_12037-Meeting Recording.mp4",
      recordingUrl: "https://amphenolfci.sharepoint.com/:v:/s/CBS-SharePoint-Site/IQBtxYxcCtGdTq08Uc2ZvkWpARkqkXSQs33HvEhsjgbWukY?e=QxQG5v",
      slidesLabel: "Intro to BERT Automation.pptx",
      slidesUrl: "https://amphenolfci.sharepoint.com/:p:/s/CBS-SharePoint-Site/IQDsV2lpp9XDQq76jJjHHs8DASENO-kMvKjbWRJNATlfquU?e=l6uCzn"
    },
    {
      date: "September 9th, 2026",
      topic: "Group Level Quality for CBS",
      presenter: "Kevin Johnson",
      recordingLabel: "CBS Engineering Unplugged- GroupLevelQuality.mp4",
      recordingUrl: "https://amphenolfci.sharepoint.com/:v:/s/CBS-SharePoint-Site/IQBBUamRhZPlTJxXQsb7VVIuAf5iYaELfF3wabwA672sBwE?e=F3Zz3f",
      slidesLabel: "Quality Strategy 2026-7 RevE- Kevin Johnson.pptx",
      slidesUrl: "https://amphenolfci.sharepoint.com/:p:/s/CBS-SharePoint-Site/IQBbWMYQZGEdQrFA6Olb0XJhAbmGswSXRBL2wFy1cNryo54?e=J7jcsC"
    },
    {
      date: "September 23rd, 2026",
      topic: "Product Engineering",
      presenter: "Aaron Pressley",
      recordingLabel: "CBS Engineering Unplugged- Product Engineering.mp4",
      recordingUrl: "https://amphenolfci.sharepoint.com/:v:/s/CBS-SharePoint-Site/IQC_tYldedjVSZrJihQOVOdLAVGAh3qcnzsm12WuZxkKUd4?e=2uUTDp",
      slidesLabel: "Product Engineering - Aaron Pressley.pptx",
      slidesUrl: "https://amphenolfci.sharepoint.com/:p:/s/CBS-SharePoint-Site/IQDqoXrjX5MpR7vigS7MbikhATXfliJ2uRgFy-L--1oPLp4?e=zAUqsf"
    }
  ],

  // ---- Proposed Upcoming Topics and Speakers ----
  // (may change based on speaker availability)
  proposedTopics: [
    { presenter: "JR Racines", topic: "SI for 224G and emerging technologies", date: "10/07/26" },
    { presenter: "Derrick Brickner", topic: "Manufacturing and Factory Fundamentals", date: "10/21/26" },
    { presenter: "Patrick Mathews", topic: "Customer applications and real-world challenges", date: "11/04/26" },
    { presenter: "Steve Blasko", topic: "Signal Integrity fundamentals and advanced applications", date: "11/18/26" },
    { presenter: "Kyle Klinger", topic: "Product portfolio updates and roadmaps (including Sentry HD and PHD3)", date: "12/02/26" },
    { presenter: "Janet Wazeter", topic: "Introduction to HR and key APH resources", date: "12/16/26" },
    { presenter: "David Bush", topic: "Introduction to Momentum", date: "01/13/27" },
    { presenter: "Mike Sykes", topic: "Mechanical component design", date: "01/27/27" },
    { presenter: "Merrick Moeller", topic: "SI and test Engineering", date: "02/10/27" },
    { presenter: "Michael Long", topic: "Introduction to Applications development Engineering", date: "02/24/27" },
    { presenter: "Chris Koviloski", topic: "Mechanical Engineering at Amphenol", date: "03/10/27" },
    { presenter: "Chris Young", topic: "What does CX mean for Amphenol", date: "03/24/27" },
    { presenter: "Peter Muller", topic: "NPI Quality", date: "04/07/27" },
    { presenter: "David Bush", topic: "Amphenol processes, tools, and organizational topics", date: "04/21/27" },
    { presenter: "Rich Gauthier", topic: "Finance Basics", date: "05/05/27" },
    { presenter: "Scott Coyle", topic: "Program Management at CBS", date: "05/19/27" },
    { presenter: "PLMs", topic: "Customer profiles (NVIDIA, AMD, Google, MSFT, AWS)", date: "06/02/27" },
    { presenter: "Neil Delaplane", topic: "What is Field Service", date: "06/16/27" },
    { presenter: "Kaitlyn Rosener", topic: "Introduction Mechanical Integrity", date: "06/30/27" },
    { presenter: "Bradley Schultz", topic: "What is Failure Analysis", date: "07/14/27" },
    { presenter: "Daid Theiss", topic: "CT technology at Amphenol", date: "07/28/27" },
    { presenter: "Ian Derstler", topic: "Floats", date: "08/11/27" },
    { presenter: "Michael Long", topic: "Lessons learned on CC", date: "08/25/27" }
  ]

};
