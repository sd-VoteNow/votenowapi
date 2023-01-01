/*
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const https = require('https')
const fs = require('fs')




const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', (req,res,next) =>{
    res.send('Hello from SSL server')
})

const sslserver = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app)

sslserver.listen(3443, () => console.log('secure server on port 3443'))

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
app.get('/pergunta',pergunta.getpergunta)
app.get('/pergunta/:id(\\d+)',pergunta.getperguntabyid)
app.post('/createperg',pergunta.createpergunta)








module.exports = app;

*/