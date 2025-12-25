const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// =========================
// ROTATING ORIGINS
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

let index = 0;
const getNextOrigin = () => {
  const origin = ORIGINS[index];
  index = (index + 1) % ORIGINS.length;
  return origin;
};

// =========================
// HOME
// =========================
app.get("/", (req, res) => {
  res.send("✅ ROTATING MPD PROXY RUNNING");
});

// =========================
// MPD PROXY
// =========================
app.get("/:channelId/manifest.mpd", async (req, res) => {
  const { channelId } = req.params;
  const origin = getNextOrigin();

  const targetURL =
    `${origin}/001/2/ch0000009099000000${channelId}/manifest.mpd` +
    `?JITPDRMType=Widevine&virtualDomain=001.live_hls.zte.com&m4s_min=1`;

  console.log("➡️ Using origin:", origin);

  try {
    const response = await fetch(targetURL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
        "Origin": origin,
        "Referer": origin + "/"
      }
    });

    if (!response.ok) {
      return res.status(502).send("Origin fetch failed");
    }

    res.setHeader("Content-Type", "application/dash+xml");
    res.setHeader("Access-Control-Allow-Origin", "*");

    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
