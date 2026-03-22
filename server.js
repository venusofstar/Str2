import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Direct stream links
const STREAMS = {
  tapsilog: "https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/playlist.m3u8?hdntl=exp=1774260832~acl=%2f*~id=b0d76823-36c4-4bc2-837c-3c1a667767d6~data=hdntl,dWlkPWc2eG1OSHwyNTNlMTAyNS0zNTkwLTQyY2MtYTU1NS03Nzc0ZDQ5NWU3OTMmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzQyNjA4NjAmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=eba131e635f17b76f6cd0ea32222f235ced89fdd3045cd1de5028a05e01d3085",
  tapsports: "https://dice-live-ap.akamaized.net/hls/live/2102504/220939-318306/playlist.m3u8?hdntl=exp=1774260832~acl=%2f*~id=b0d76823-36c4-4bc2-837c-3c1a667767d6~data=hdntl,dWlkPWc2eG1OSHwyNTNlMTAyNS0zNTkwLTQyY2MtYTU1NS03Nzc0ZDQ5NWU3OTMmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzQyNjA4NjAmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=eba131e635f17b76f6cd0ea32222f235ced89fdd3045cd1de5028a05e01d3085"
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
