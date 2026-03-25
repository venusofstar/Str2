import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Direct stream links
const STREAMS = {
  tapsilog: "https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/playlist.m3u8?hdntl=exp=1774534907~acl=/*~id=da815416-94fb-4e05-9cf2-a5b0ef8d1f2f~data=hdntl,dWlkPW5VTkxWZnw3ZjAxZWMxNS1hMTQwLTRlZDMtODE2My1jOGQ1ZjMwZjg0Y2YmaXA9MTEyLjIwMS45Ny4yMjEmZXhwPTE3NzQ1MzQ5MzYmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=167c9be888486c849ee84acce5daacc36aea13bf186f89b0dd84c82a7ea0f757",
  tapsports: "https://dice-live-ap.akamaized.net/hls/live/2102504/220939-318306/playlist.m3u8?hdntl=exp=1774534907~acl=/*~id=da815416-94fb-4e05-9cf2-a5b0ef8d1f2f~data=hdntl,dWlkPW5VTkxWZnw3ZjAxZWMxNS1hMTQwLTRlZDMtODE2My1jOGQ1ZjMwZjg0Y2YmaXA9MTEyLjIwMS45Ny4yMjEmZXhwPTE3NzQ1MzQ5MzYmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=167c9be888486c849ee84acce5daacc36aea13bf186f89b0dd84c82a7ea0f757"
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
