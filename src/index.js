require("dotenv").config();

const path = require("path");
const request = require("request");
const Mux = require("@mux/mux-node");
const fs = require("fs");

async function upload() {
  // assuming process.env.MUX_TOKEN_ID and process.env.MUX_TOKEN_SECRET
  // contain your credentials
  const { Video } = new Mux();

  let upload = await Video.Uploads.create({
    new_asset_settings: {
      playback_policy: "public",
      passthrough: "LucasMovie",
    },
  });

  const filePath = path.resolve(__dirname, "..", "videos", "testeLucas.mp4");

  console.log("Video ID", upload.id);

  // The URL you get back from the upload API is resumable, and the file can be uploaded using a `PUT` request (or a series of them).
  await fs.createReadStream(filePath).pipe(request.put(upload.url));
}

upload();
