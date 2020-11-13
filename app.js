"use strict";
const toFinite = require('lodash')
const express = require("express");
const app = express();
const port = 80
const host = "localhost"


app.listen(port, host, () =>
  console.log(
    `ready at http://${host}:${port}.`
  )
)

app.use(express.static('./'))


app.get('/sum/:numeros', (req, res) => {
  console.log("dentro de get")
  console.log(req.params.numeros)
  const splitParams = req.params.numeros.split(",")
  console.log(sum(splitParams))


});

const sum= (params)=>{

  const regexIsNumber = /^\d+$/
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

