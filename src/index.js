const { response } = require('express');
const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send({ message: "Primeiro teste" });
  });

app.listen(3333,()=>{
    console.log("Servidor na porta 3333");
});