const mongoose = require('mongoose'); 

const AgendamentoSchema = new mongoose.Schema({ 
    nome: String,
    dataNasc: Date,
    dataHoraAgend: Date
},{ 
    timestamps:true 
}
);

const AgendamentoModel = mongoose.model('agendamento',AgendamentoSchema); 

module.exports = AgendamentoModel;  
