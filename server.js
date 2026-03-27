import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Direct stream links
const STREAMS = {
  tapsilog: "https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/playlist.m3u8?hdntl=exp=1774617243~acl=%2f*~id=6a4fb39e-37fe-408d-b9cf-82f43ab30346~data=hdntl,dWlkPWc2eG1OSHwyNTNlMTAyNS0zNTkwLTQyY2MtYTU1NS03Nzc0ZDQ5NWU3OTMmaXA9MTEyLjIwMS45Ny4yMjEmZXhwPTE3NzQ2MTcyNzEmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=a895d5408d56b7e5c22c0df010d0ba3e0143c823b3c3a5a0fd39380b79997bc8",
  tapsports: "https://dice-live-ap.akamaized.net/hls/live/2102504/220939-318306/playlist.m3u8?hdntl=exp=1774617243~acl=%2f*~id=6a4fb39e-37fe-408d-b9cf-82f43ab30346~data=hdntl,dWlkPWc2eG1OSHwyNTNlMTAyNS0zNTkwLTQyY2MtYTU1NS03Nzc0ZDQ5NWU3OTMmaXA9MTEyLjIwMS45Ny4yMjEmZXhwPTE3NzQ2MTcyNzEmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=a895d5408d56b7e5c22c0df010d0ba3e0143c823b3c3a5a0fd39380b79997bc8",
nba1: "https://mainstreams.pro/hls/mlkijfezag65.m3u8",
nba2: "https://mainstreams.pro/hls/wfazgsqtrezu66.m3u8",
nba3: "https://mainstreams.pro/hls/hfsdqtaxvb67.m3u8",
nba4: "https://mainstreams.pro/hls/zayrtezafgvdv68.m3u8",
nba5: "https://mainstreams.pro/hls/zeafwqvhfe69.m3u8",
nba6: "https://mainstreams.pro/hls/bvnsqdfvgha70.m3u8",
nba7: "https://mainstreams.pro/hls/ztyarueaghj71.m3u8",
nba8: "https://mainstreams.pro/hls/pllmazjkdzajh72.m3u8",
nba9: "https://mainstreams.pro/hls/fdgsqdfawa73.m3u8",
nba10: "https://mainstreams.pro/hls/yjtzafghvjza74.m3u8",
nba11: "https://mainstreams.pro/hls/sqhdghzavbxu75.m3u8",
nba12: "https://mainstreams.pro/hls/xcsfadafgzfg76.m3u8"
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
