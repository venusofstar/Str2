import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Direct stream links
const STREAMS = {
  tapsilog: "https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/playlist.m3u8?hdntl=exp=1774433578~acl=%2f*~id=0284c0c6-9186-4abe-83b2-fb617476c6e3~data=hdntl,dWlkPWc2eG1OSHwyNTNlMTAyNS0zNTkwLTQyY2MtYTU1NS03Nzc0ZDQ5NWU3OTMmaXA9MTEyLjIwMS45Ny4yMjEmZXhwPTE3NzQ0MzM2MDYmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=33ea3d6981227aeeb125557f45faf2e52cbe6c2125a13d1a757062b1cd9c0e85",
  tapsports: "https://dice-live-ap.akamaized.net/hls/live/2102504/220939-318306/playlist.m3u8?hdntl=exp=1774433578~acl=%2f*~id=0284c0c6-9186-4abe-83b2-fb617476c6e3~data=hdntl,dWlkPWc2eG1OSHwyNTNlMTAyNS0zNTkwLTQyY2MtYTU1NS03Nzc0ZDQ5NWU3OTMmaXA9MTEyLjIwMS45Ny4yMjEmZXhwPTE3NzQ0MzM2MDYmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=33ea3d6981227aeeb125557f45faf2e52cbe6c2125a13d1a757062b1cd9c0e85"
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
