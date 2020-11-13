"use strict";
const toFinite = require('lodash')
const express = require("express");
const app = express();
const port = 80
const host = "localhost"
let cont = 0

app.listen(port, host, () =>
  console.log(
    `ready at http://${host}:${port}.`
  )
)

app.use(express.static('./'))

app.get('/sum/:numbers', (req, res) => {
  cont++
  const splitParams = req.params.numbers.split(",");
  const result=sum(splitParams);
  const response = {
    code: 200,
    message:"success",
    sum:result,
    cont: cont,
  }
   return res.send(response)
});

const sum = (params)=>{
  const regexIsNumber = /^[0-9]+([,][0-9]+)?/
  let result = 0
  params.map((param)=>{
    if(regexIsNumber.test(param)){
      if(Number.isInteger(param)){
        param = parseInt(param)
      } else{
        param = parseFloat(param)
      }
      result += toFinite(param)
    }
  })
  return result


}

