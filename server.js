import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Direct stream links
const STREAMS = {
  tapsilog: "https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/playlist.m3u8?hdntl=exp=1774617243~acl=%2f*~id=6a4fb39e-37fe-408d-b9cf-82f43ab30346~data=hdntl,dWlkPWc2eG1OSHwyNTNlMTAyNS0zNTkwLTQyY2MtYTU1NS03Nzc0ZDQ5NWU3OTMmaXA9MTEyLjIwMS45Ny4yMjEmZXhwPTE3NzQ2MTcyNzEmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=a895d5408d56b7e5c22c0df010d0ba3e0143c823b3c3a5a0fd39380b79997bc8",
  tapsports: "https://dice-live-ap.akamaized.net/hls/live/2102504/220939-318306/playlist.m3u8?hdntl=exp=1774617243~acl=%2f*~id=6a4fb39e-37fe-408d-b9cf-82f43ab30346~data=hdntl,dWlkPWc2eG1OSHwyNTNlMTAyNS0zNTkwLTQyY2MtYTU1NS03Nzc0ZDQ5NWU3OTMmaXA9MTEyLjIwMS45Ny4yMjEmZXhwPTE3NzQ2MTcyNzEmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=a895d5408d56b7e5c22c0df010d0ba3e0143c823b3c3a5a0fd39380b79997bc8"
};

// 🔥 Short URL redirect
app.get("/:id", (req, res) => {
  const stream = STREAMS[req.params.id];

  if (!stream) {
    return res.status(404).send("Stream not found");
  }

  // 302 redirect (best for streaming apps)
  res.redirect(stream);
});

// =========================
// HOME
// =========================
app.get("/", (_, res) => {
  res.send("Enjoy your life");
});


app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
