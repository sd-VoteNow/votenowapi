const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');





const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//utilizador
const utilizador = require('./routes/utilizador')
app.get('/utilizador',utilizador.getutilizador)
app.post('/login',utilizador.login)
app.post('/registar',utilizador.createutilizador)
app.post('/delete',utilizador.userdelete)
app.post('/updateuser',utilizador.updateuser)
app.post('/resultvot',utilizador.resultvot)

//perguntas
const pergunta = require('./routes/pergunta')
app.get('/perguntas',pergunta.getpergunta)
app.get('/pergunta/:id(\\d+)',pergunta.getperguntabyid)
app.post('/createperg',pergunta.createpergunta)








module.exports = app;

