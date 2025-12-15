import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Preloaded M3U8 streams
 * id => m3u8 url
 */
const streams = {
  kapamilya: "https://manifest.googlevideo.com/api/manifest/hls_variant/expire/1765826181/ei/JQpAaYenG67H0-kP37Ct-Ag/ip/126.209.53.186/id/rc4KfaBrGIc.1/source/yt_live_broadcast/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/hfr/1/ctier/SPL/playlist_duration/30/manifest_duration/30/maudio/1/gcr/ph/bui/AYUSA3An_wqMun2j44R6e0HxI1iy-0Pb73yGfaBObEumttvdjxitMDQRa8kTPKYiOE6UhEJKi7QF6G7s/spc/wH4Qq0qzSxH4ON31x-_MLWtLYNKOTOK3T0sEqyvVD1gJfGB-lRhp_9Nc7cA/vprv/1/go/1/rqh/5/pacing/0/nvgoi/1/ncsapi/1/keepalive/yes/fexp/51331020%2C51552689%2C51565115%2C51565681%2C51580968/dover/11/itag/0/playlist_type/DVR/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Chfr%2Cctier%2Cplaylist_duration%2Cmanifest_duration%2Cmaudio%2Cgcr%2Cbui%2Cspc%2Cvprv%2Cgo%2Crqh%2Citag%2Cplaylist_type/sig/AJfQdSswRAIgRmZa2-6kehzu3jQuy2EY4taLS5rESKoqPKbtWQrB2YsCIB8k0he0r38wupv0ph2UqYra3WvIrNzJqDi0NonWI9zU/file/index.m3u8",

  gma: "https://manifest.googlevideo.com/api/manifest/hls_variant/expire/1765809651/ei/k8k_abjZJYaq2roPkpPvuQ0/ip/180.190.223.161/id/n0q7qAEljA8.1~45720748/source/yt_live_broadcast/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/tx/51539830/txs/51539830%2C51539831/hfr/1/playlist_duration/30/manifest_duration/30/maudio/1/gcr/ph/bui/AYUSA3BvUkAVZPObjXy1KQ3TmglnFhn--p1XjFe8x14f5u0JvcVF2T9NjLLHI8DJL5QPDCZvGpkTXkPt/spc/wH4Qq3j2pZglopdZe4KBd5vdYdx321QpqxUY82RsFeTwax9sAcbU9VcC_ZCj31rZuK4YQg/vprv/1/go/1/ns/hgKfPibZkbbrTwdjQ1EbPTER/rqh/5/pacing/0/nvgoi/1/ncsapi/1/keepalive/yes/fexp/51331020%2C51552689%2C51565115%2C51565681%2C51580968/dover/11/n/0bYXXPAtd5XNK-1/itag/0/playlist_type/DVR/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Ctx%2Ctxs%2Chfr%2Cplaylist_duration%2Cmanifest_duration%2Cmaudio%2Cgcr%2Cbui%2Cspc%2Cvprv%2Cgo%2Cns%2Crqh%2Citag%2Cplaylist_type/sig/AJfQdSswRQIgN6Qs9NIslYvBHfKEHGf2824ogvmu63sZ3chziHj7AJICIQDZwjuz8mYmnsAysbRJ2NwmnhN4Yi4LoQDOQN3xcaInDg%3D%3D/file/index.m3u8"
};

/**
 * Serve M3U8
 * /kapamilya/index.m3u8
 * /gma/index.m3u8
 */
app.get("/:id/index.m3u8", (req, res) => {
  const stream = streams[req.params.id];
  if (!stream) return res.status(404).send("Stream not found");

  res.redirect(stream);
});

/**
 * Health
 */
app.get("/", (req, res) => {
  res.send("M3U8 Short URL Service Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
