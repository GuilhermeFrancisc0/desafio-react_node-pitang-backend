const AgendamentoModel = require("../models/agendamento.model"); // AgendamentoModel, entidade de banco de dados
var getMinutes = require("date-fns/getMinutes");
var getHours = require("date-fns/getHours");
var differenceInYears = require("date-fns/differenceInYears");
class Agendamento {
  async index(req, res) { // Função que vai trazer todos os dados do agendamento(info gerais)

    const agendamentos = await AgendamentoModel.find(); // find trazendo todos os dados da entidade de agendamento

    res.send({ data: agendamentos });
  }

  async store(req, res) { // Função para armazenar agendamentos
   
    const body = req.body; // body do request (agendamento)
    const { dataHoraAgend, dataNasc, idoso } = req.body;

    const dataHoraAgendConverted = new Date(dataHoraAgend);
    const hora = getHours(dataHoraAgendConverted);
    const minuto = getMinutes(dataHoraAgendConverted);
    const currentDate = new Date();
    
    const idade = differenceInYears(Date.now(), new Date(dataNasc));
    try {
      if (idade > 0 && idade < 150){ // Impede idade negativa e idades muito elevadas
        if(currentDate.getTime() < dataHoraAgendConverted.getTime()){ // Impede a seleção de horários passados
          if (minuto == 30 || minuto == 0) { // Impede a utilização de minutos diferentes de 00 ou 30 
            if (hora >= 8 && hora <= 17 && minuto <= 30) { // Impede saida do range de horários válidos(8:00-17:30)
              
              // Obtendo, do banco de dados, o agendamento que tem a data e o horário feita no request
              const agendamentoBD = await AgendamentoModel.findOne({dataHoraAgend}).lean();
  
              if (!agendamentoBD) { // Se não houver o agendamento no banco de dados, cria instantaneamente
  
                const agendamentoCreate = await AgendamentoModel.create(body);
  
                res.send({ data: agendamentoCreate });
              } else { // Tem o agendamento no banco de dados
               
                if (idoso && !agendamentoBD.idoso) { // Idoso do request sobrescrevendo o jovem do banco
                  
                  const agendamentoIdoso = await AgendamentoModel.findOne({dataHoraAgend}).replaceOne(body);
  
                  return res.send({ data: agendamentoIdoso });
                }
                if (agendamentoBD.idoso) { // Idoso no horário, não pode ser removido em nenhuma hipotese
                  
                  throw new Error("Já tem um idoso na vaga!");
                }
                throw new Error("Vaga ocupada!"); // Jovem tentando acessar horário ocupado
              }
            } else {
              throw new Error("Horário do agendamento inválido!");
            }
          } else {
            throw new Error("Minuto do Horário do agendamento inválido!");
          }
        }else{
          throw new Error("Horário do agendamento anterior ao horário de agora!")
        }
      } else {
        throw new Error("Ano de nascimento inválido!");
      }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async update(req, res) { // Função para atualizar os dados da área do enfermeiro
    const {
      body,
      params: { id },
    } = req;

    const agendamento = await AgendamentoModel.findByIdAndUpdate(id, body, {new: true});

    res.send({ data: agendamento });
  }
}

module.exports = new Agendamento();
