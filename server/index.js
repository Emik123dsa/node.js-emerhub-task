const Database = require( "./vendor");

const DB = new Database();

if (DB instanceof Database) {
  DB.initDB();
}

const path = require( "path");

const express = require( "express");

const { createBundleRenderer } = require( "vue-server-renderer");

const cookieParser = require( "cookie-parser");
const bodyParser = require( "body-parser");

const fs = require( "fs");

const template = fs.readFileSync(
  path.resolve("build/static/index.html"),
  "utf-8"
);

const serverBundle = require( "../build/vue-ssr-server-bundle.json");
const clientManifest = require( "../build/vue-ssr-client-manifest.json");

const server = express();

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
  inject: false,
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(cookieParser());

server.use("/", express.static(path.resolve("build")));

server.use("/api/", require("./vendor/Routes"));

server.get("*", (req, res) => {
  const context = { url: req.url, req: req, res: res };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (+err.message === 404) {
        res.status(404).end("Page not found");
      } else {
        console.log(err);
        res.status(500).end("Internal Server Error");
      }
    }

    res.end(html);
  });
});

const PORT = process.env.PORT || 5000;


server.listen(PORT, console.log(`Server is listening port: ${PORT}`));
