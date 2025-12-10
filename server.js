const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Home page with LIVE VIDEO STREAM
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>WELCOME</title>
      </head>
      <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">

        <h1>WELCOME</h1>
        <p>😀 ENJOY YOUR LIFE</p>

        <!-- Live Stream Player -->
        <video id="liveVideo" controls autoplay style="width: 90%; max-width: 700px; border-radius: 10px;">
          <source src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" type="application/x-mpegURL">
        </video>

        <p style="margin-top: 20px;">Loading Live Stream...</p>

        <script>
          // Auto-play fix for some browsers
          const video = document.getElementById('liveVideo');
          video.play().catch(() => {
            console.log("Autoplay blocked");
          });
        </script>

      </body>
    </html>
  `);
});

// Proxy route: /:channelId/manifest.mpd
app.get("/:channelId/manifest.mpd", (req, res) => {
  const { channelId } = req.params;

  // URL without AuthInfo
  const goToURL =
    \`http://143.44.136.67:6060/001/2/ch0000009099000000\${channelId}/manifest.mpd?JITPDRMType=Widevine&virtualDomain=001.live_hls.zte.com&m4s_min=1&nocache=1&ts=20251211\`;

  res.redirect(goToURL);
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
