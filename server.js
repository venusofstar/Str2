import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Direct stream links
const STREAMS = {
  tapsilog: "https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/playlist.m3u8?hdntl=exp=1774105625~acl=%2f*~id=e3d0ec19-5c64-48e0-9efb-404240cc6819~data=hdntl,dWlkPVc5dVJhanxiYjFlZDQ2Ny1hODRhLTQ1Y2EtOGMyNS0wNGI1NmU1NGYzZWEmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzQxMDU2NTQmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=934db3e2f174f462a350a0c4096f80a6a70c910e7184f46685dd052c99f80c00",
  tapsports: "https://dice-live-ap.akamaized.net/hls/live/2102504/220939-318306/playlist.m3u8?hdntl=exp=1774105625~acl=%2f*~id=e3d0ec19-5c64-48e0-9efb-404240cc6819~data=hdntl,dWlkPVc5dVJhanxiYjFlZDQ2Ny1hODRhLTQ1Y2EtOGMyNS0wNGI1NmU1NGYzZWEmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzQxMDU2NTQmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=934db3e2f174f462a350a0c4096f80a6a70c910e7184f46685dd052c99f80c00"
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
