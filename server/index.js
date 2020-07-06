import Database from "./vendor";

const DB = new Database();

if (DB instanceof Database) {
  DB.initDB();
}

import path from "path";

import express from "express";

import { createBundleRenderer } from "vue-server-renderer";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import fs from "fs";

const template = fs.readFileSync(path.resolve("build/main.html"), "utf-8");

import serverBundle from "../build/vue-ssr-server-bundle.json";
import clientManifest from "../build/vue-ssr-client-manifest.json";

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
  const context = { url: req.url };

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

server.listen(process.env.PORT || 3000);
