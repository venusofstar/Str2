import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Direct stream links
const STREAMS = {
  tapsilog: "https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/playlist.m3u8?hdntl=exp=1774102063~acl=%2f*~id=94ddba5c-374b-45b1-8565-e23172fa4fab~data=hdntl,dWlkPVc5dVJhanxiYjFlZDQ2Ny1hODRhLTQ1Y2EtOGMyNS0wNGI1NmU1NGYzZWEmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzQxMDIwOTImZWlkPTIyMDkzOSZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=6df021647b26cbd87185e9da310868a31740e57d7131d1d922a3ebcd4b115bac",
  tapsports: "https://dice-live-ap.akamaized.net/hls/live/2102504/220939-318306/playlist.m3u8?hdntl=exp=1774102063~acl=%2f*~id=94ddba5c-374b-45b1-8565-e23172fa4fab~data=hdntl,dWlkPVc5dVJhanxiYjFlZDQ2Ny1hODRhLTQ1Y2EtOGMyNS0wNGI1NmU1NGYzZWEmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzQxMDIwOTImZWlkPTIyMDkzOSZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=6df021647b26cbd87185e9da310868a31740e57d7131d1d922a3ebcd4b115bac"
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
