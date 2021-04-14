const express = require('express');
const AgendamentoController = require('../controllers/agendamento.controller');
const Routes = express.Router();

// Apartir da rota '/agendamento' o index do Agendamentocontroller será executado
Routes.get('/agendamento',AgendamentoController.index); // Enviando o res e o req implicitamente

Routes.post('/agendamento',AgendamentoController.store);

module.exports= Routes;