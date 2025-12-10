const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // npm install node-fetch@2
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Home page
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>AuthInfo Proxy</title>
      </head>
      <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>WELCOME</h1>
        <p>😀</p>
        <p>ENJOY YOUR LIFE</p>
      </body>
    </html>
  `);
});

// First load → HLS M3U8
// Second load → MPD (without extra parameters)
app.get("/:channelId/manifest.mpd", async (req, res) => {
  const { channelId } = req.params;

  // Fixed HLS URL for first redirect
  const hlsURL =
    "https://stream.mux.com/uv9jestcZfYGLeO49oJzRUMJIlLqGKPpzN01x7rN9hhk.m3u8";

  // DASH URL (direct, untouched)
  const dashURL = `http://143.44.136.67:6060/001/2/ch0000009099000000${channelId}/manifest.mpd?JITPDRMType=Widevine&virtualDomain=001.live_hls.zte.com&m4s_min=1&nocache=1&ts=20251211`;

  try {
    // Try HLS first
    const hlsCheck = await fetch(hlsURL, { method: "HEAD" });

    if (hlsCheck.ok) {
      // FIRST REDIRECT → M3U8
      return res.redirect(hlsURL);
    }
  } catch (e) {
    // If HLS fails → fallback to MPD
  }

  // SECOND LOAD → DIRECT MPD
  res.redirect(dashURL);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
