const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Home page
app.get("/", (req, res) => {
  res.send("<h1>WELCOME 😀</h1>");
});

// Proxy function (no redirect)
async function proxyStream(url, res) {
  try {
    const response = await fetch(url);
    res.setHeader("Content-Type", response.headers.get("content-type"));
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("Stream Error");
  }
}

// First → HLS  
// Second → MPD
app.get("/:channelId/manifest.mpd", async (req, res) => {
  const { channelId } = req.params;

  // HLS first
  const hlsURL =
    "https://stream.mux.com/uv9jestcZfYGLeO49oJzRUMJIlLqGKPpzN01x7rN9hhk.m3u8";

  // MPD second
  const dashURL = `http://143.44.136.67:6060/001/2/ch0000009099000000${channelId}/manifest.mpd?JITPDRMType=Widevine&virtualDomain=001.live_hls.zte.com&m4s_min=1&nocache=1&ts=20251211`;

  try {
    // Check if HLS works
    const test = await fetch(hlsURL, { method: "HEAD" });
    if (test.ok) {
      return proxyStream(hlsURL, res); // send stream directly
    }
  } catch {}

  // If HLS fails → MPD
  proxyStream(dashURL, res);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
