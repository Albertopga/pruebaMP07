"use strict";
const app = require("./server");

const port = 80;
const host = "localhost";

app.listen(port, host, () => console.log(`ready at http://${host}:${port}.`));
