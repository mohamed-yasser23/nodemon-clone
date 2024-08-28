
//console.log("hello");

import express from "express"
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;
let app = express();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/myWebsite.html");
  });