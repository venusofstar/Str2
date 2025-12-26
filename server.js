const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// =========================
// ORIGIN ROTATION (FAST)
// =========================
const ORIGINS = [
  "http://136.239.158.18:6610",
  "http://136.239.159.20:6610"
];

let rotateIndex = 0;
function getOrigin() {
  const origin = ORIGINS[rotateIndex];
  rotateIndex = (rotateIndex + 1) % ORIGINS.length;
  return origin;
}

// =========================
// FAST PARAM ROTATION
// =========================
function rotateStartNumber() {
  const base = 46489952;
  const step = 6;
  return base + Math.floor(Math.random() * 100000) * step;
}

function rotateIAS() {
  return "RR" + Date.now() + Math.random().toString(36).slice(2, 10);
}

function rotateUserSession() {
  return Math.floor(Math.random() * 1e15).toString();
}

// =========================
// HOME
// =========================
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>AuthInfo Proxy</title></head>
      <body style="font-family:Arial;text-align:center;margin-top:50px;">
        <h1>WELCOME</h1>
        <p>ENJOY YOUR LIFE</p>
      </body>
    </html>
  `);
});

// =========================
// SHORT LINK (BROWSER vs OTT)
// =========================
app.get("/4/:channelId", (req, res) => {
  const { channelId } = req.params;
  const ua = req.headers["user-agent"] || "";

  const isOTT =
    ua.includes("OTT") ||
    ua.includes("ExoPlayer") ||
    ua.includes("VLC") ||
    ua.includes("Dalvik");

  // Browser: stay on short link
  if (!isOTT) {
    return res.send(`
      <html>
        <head><title>Live Channel ${channelId}</title></head>
        <body style="font-family:Arial;text-align:center;margin-top:50px;">
          <h2>Live Channel</h2>
          <p>This stream works in OTT apps only.</p>
          <p><b>OTT Navigator / OTT Player / OTT TV</b></p>
          <p>Channel ID: ${channelId}</p>
        </body>
      </html>
    `);
  }

  // OTT apps: redirect to MPD
  res.redirect(`/${channelId}/manifest.mpd`);
});

// =========================
// MPD REDIRECT (ALL FAST ROTATION)
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
