const express = require('express')
const app = express()
const client = require('../models/connection')
const client_envio = require('../models/recepcaonabd')
const {compileTrust} = require("express/lib/utils");

//get all
const getpergunta = (req,res)=>{
  try {
  client.query('select * from perguntas ',(error,results)=>{
    if(error)
    {
      throw error
    }
    res.status(200).json(results)
  })
}
catch (e) {
  console.log(e);
  response.status(200).json("error")
}
finally {
  console.log("success");
}
}

//Fazer um get das perguntas com base no id
const getperguntabyid= (request, response) => {
  try {
  const id = parseInt(request.params.id)
  client.query('select * from perguntas ' +
  'inner join respostas on perguntas.perguntas_id = respostas.perguntas_id ' +
  'where perguntas.perguntas_id = ' +id , [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results)
  })
}
catch (e) {
  console.log(e);
  response.status(200).json("error")
}
finally {
  console.log("success");
}
}


//Fazer create para a votação e respostas possiveis
const createpergunta = (request, response) => {
  try {
  const perg = request.body
  console.log(perg)
  const query = 'select utilizador.utilizador_id from utilizador ' +
  'inner join tipo_uti_rel on utilizador.utilizador_id = tipo_uti_rel.utilizador_id ' +
  'inner join tipo on tipo_uti_rel.utilizador_id = tipo.tipo_utilizador_id ' +
  'where tipo = "Admin" and utilizador_email = "' + perg.email.toString() + '" and utilizador_pass = "' + perg.pass.toString() + '"'

  client.query(query, (error, results) => {if (error) {throw error}
  const aa = JSON.stringify(results);
  const bb = JSON.parse(aa)

    if(aa.localeCompare("[]") != 0){
      const id = parseInt(bb[0].utilizador_id);

      const query1 = "INSERT INTO perguntas (pergunta, utilizador_id) VALUES ('" + perg.pergunta.toString() + "'," + id + ")";
      const query2 = "select MAX(perguntas_id) from perguntas where pergunta = '" + perg.pergunta.toString() + "'";


      client_envio.query(query1, (error, results1) => {
      if (error) {
        throw error
      }
    client.query(query2, (error, results2) => {
      if (error) {
        throw error
      }
      console.log(results1)
      console.log(results)
      const bbb = JSON.parse(JSON.stringify(results))
      const id2 = parseInt(bbb[0].utilizador_id);
      const query3 = "INSERT INTO respostas (respostas, perguntas_id) VALUES ('" + perg.resposta1.toString() + "'," + id2  + ")";
      const query4 = "INSERT INTO respostas (respostas, perguntas_id) VALUES ('" + perg.resposta2.toString() + "'," + id2  + ")";
      const query5 = "INSERT INTO respostas (respostas, perguntas_id) VALUES ('" + perg.resposta3.toString() + "'," + id2  + ")";
      const query6 = "INSERT INTO respostas (respostas, perguntas_id) VALUES ('" + perg.resposta4.toString() + "'," + id2  + ")";
      client_envio.query(query3, (error, results3) => {if (error) {throw error}})
      client_envio.query(query4, (error, results4) => {if (error) {throw error}})
      client_envio.query(query5, (error, results5) => {if (error) {throw error}})
      client_envio.query(query6, (error, results6) => {if (error) {throw error}})

    })


    })


    response.status(201).send("User added with ID: ")
  }

  })
}
catch (e) {
  console.log(e);
  response.status(200).json("error")
}
finally {
  console.log("success");
}

}





module.exports = {
  getpergunta,
  getperguntabyid,
  createpergunta


}