"use strict";
const express = require("express");
const { toFinite } = require("lodash");
const app = express();

app.use(express.json());
app.use(express.static("./"));

app.get("/sum/:numbers?", (req, res) => {
  if (!req.params.numbers)
    return res.send({
      code: 404,
      message: "error, params needed",
    });

  const splitParams = req.params.numbers.split(",");
  const result = sum(splitParams);
  const response = {
    code: 200,
    message: "success",
    sum: result,
    count: count,
  };
  return res.send(response);
});

app.get("/count", (req, res) => {
  const response = {
    code: 200,
    message: "success",
    count: count,
  };
  return res.send(response);
});

let count = 0;

const sum = (params) => {
  const regexIsNumber = /^[0-9]+([.][0-9]+)?/;
  let result = 0;
  params.map((param) => {
    if (regexIsNumber.test(param)) {
      if (Number.isInteger(param)) {
        param = parseInt(param);
      } else {
        param = parseFloat(param);
      }
      result += toFinite(param);
    }
  });
  return result;
};

module.exports = app;
