const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// =========================
// ROTATION (ORIGINAL)
// =========================
const ORIGINS = [
  "http://136.239.158.18:6610",
  "http://136.239.158.20:6610",
  "http://136.239.158.30:6610",
  "http://136.239.173.3:6610",
  "http://136.158.97.2:6610",
  "http://136.239.173.10:6610",
  "http://136.239.158.10:6610",
  "http://136.239.159.20:6610"
];

let rotateIndex = 0;
function getOrigin() {
  const origin = ORIGINS[rotateIndex];
  rotateIndex = (rotateIndex + 1) % ORIGINS.length;
  return origin;
}

// =========================
// ONLY THIS IS NEW (PARAM ROTATION)
// =========================
let startNumber = 46489952;

function rotateStartNumber() {
  startNumber += 6; // filedura=6
  return startNumber;
}

function rotateIAS() {
  return "RR" + Date.now() + Math.floor(Math.random() * 10000);
}

function rotateUserSession() {
  return Math.floor(100000000 + Math.random() * 900000000);
}

// =========================
// HOME PAGE
// =========================
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>AuthInfo Proxy</title></head>
      <body style="font-family:Arial;text-align:center;margin-top:50px;">
        <h1>WELCOME</h1>
        <p>😀</p>
        <p>ENJOY YOUR LIFE</p>
      </body>
    </html>
  `);
});

// =========================
// ORIGINAL REDIRECT (ONLY PARAMS ROTATE)
// =========================
app.get("/:channelId/manifest.mpd", (req, res) => {
  const { channelId } = req.params;

  const origin = getOrigin();

  const goToURL =
    `${origin}/001/2/ch0000009099000000${channelId}/manifest.mpd` +
    `?JITPDRMType=Widevine` +
    `&virtualDomain=001.live_hls.zte.com` +
    `&m4s_min=1` +
    `&NeedJITP=1` +
    `&isjitp=0` +
    `&startNumber=${rotateStartNumber()}` +
    `&filedura=6` +
    `&ispcode=55` +
    `&IASHttpSessionId=${rotateIAS()}` +
    `&usersessionid=${rotateUserSession()}`;

  console.log("➡️ Redirecting to:", goToURL);
  res.redirect(goToURL);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
