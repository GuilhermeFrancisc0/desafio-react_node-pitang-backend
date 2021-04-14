const AgendamentoModel = require('../models/agendamento.model'); // AgendamentoModel, entidade de banco de dados

class Agendamento{

    async index(req,res){ // Função que vai trazer todos os dados do agendamento(info gerais)
        
        const agendamentos = await AgendamentoModel.find(); // find traz todos os dados da entidade de agendamento
        
        res.send({data: agendamentos});
    }

    async store(req,res){ // Função para armazenar valores
        
        const body = req.body;// dados que se passam durante a requisição
        
        const agendamento = await AgendamentoModel.create(body); //criando um novo agendamento com o create();

        res.send({data: agendamento}); // retornando para requisição um agendamento criado agora
    }
}

module.exports = new Agendamento();