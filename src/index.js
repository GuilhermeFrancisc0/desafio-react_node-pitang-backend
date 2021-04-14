const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

require('dotenv').config();

const AgendamentoRouter = require('./routes/agendamento.route');

const {MONGO_URL,HTTP_PORT} = process.env;

mongoose.connect(MONGO_URL,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();

app.use(cors());

app.use(express.json()); // decifra os dados via json da aplicação (midler)

app.use('/api',AgendamentoRouter); // midler executado após o anterior

app.get("/", (req, res) => {
    res.send({ message: "Primeiro teste" });
  });

app.listen(HTTP_PORT,()=>{
    console.log(`Servidor na porta ${HTTP_PORT}`);
});