const express = require('express')
const app = express()
const client = require('../models/connection')
const client_envio = require('../models/recepcaonabd')
const {compileTrust} = require("express/lib/utils");

//get all
const getutilizador = (req,res)=>{
  try {
  client.query('select * from utilizador ',(error,results)=>{
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


const login= (request, response) => {
  try {
  const users = request.body
  console.log("user:  "+JSON.stringify(users))
  client.query('select utilizador_nome,utilizador_email from utilizador ' +
      'where utilizador_email = \'' + users.email.toString() + '\' and utilizador_pass = \''+users.pass.toString()+'\'' , (error, results) => {
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

const createutilizador = (request, response) => {
  try {
  const users = request.body
  console.log(users)
  const query = "INSERT INTO utilizador (utilizador_nome,utilizador_email,utilizador_pass) VALUES ('" + users.nome.toString() + "','" + users.email.toString() + "','" + users.pass.toString() + "')";
  console.log(query)
  client_envio.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send("User added with ID: ")
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


const userdelete = (request, response) => {
  const users = request.body

  const query1 = "SELECT !ISNULL((SELECT ISNULL(utilizador_id) FROM votenow.utilizador where utilizador_email='" + users.email.toString() + "' and utilizador_pass = '" + users.pass.toString() + "'))as existe";
  const del = "DELETE FROM votenow.utilizador where utilizador_email= '" + users.email.toString() + "'";
  try {
    client.query(query1, (error, results) => {
      if (error) {throw error}
      if(!(results[0].existe==1))
      {
        client_envio.query(del, (error, results3) => {
          if (error) {throw error}
          response.status(200).json(results3)
        })
      }
      else
      {
        if((users.email==users.email)) {

          client_envio.query(del, (error, results3) => {
            if (error) {throw error }
            response.status(200).json(results3)
          })

        }
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

const updateuser = (request, response) => {
  try {
    const users = request.body
    console.log(users)
    const query1 = "SELECT !ISNULL((SELECT ISNULL(utilizador_id) FROM votenow.utilizador where utilizador_email='" + users.email.toString() + "' and utilizador_pass='" + users.pass.toString() + "'))as existe";
    const up = "UPDATE  votenow.utilizador SET utilizador_nome='" + users.novonome.toString() + "',utilizador_pass='" + users.novopass.toString() + "' where utilizador_email='" + users.email.toString() + "'";
    console.log(up)
    console.log(users)
    client.query(query1, (error, results) => {
      if (error) {throw error}
      if(!(results[0].existe==1))
      {
        client_envio.query(up, (error, results3) => {
          if (error) {
            throw error
          }
          response.status(200).json(results3)
        })
      }
      else
      {
        client_envio.query(up, (error, results3) => {
          if (error) {throw error
            throw new Error(error);}
          response.status(200).json(results3)
        })
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



//Fazer quantos votos uma resposta teve numa determinada pergunta


const resultvot = (request, response) => {
  try {
  const users = request.body
  const query = 'select utilizador.utilizador_id from utilizador ' +
      'inner join tipo_uti_rel on utilizador.utilizador_id = tipo_uti_rel.utilizador_id ' +
      'inner join tipo on tipo_uti_rel.utilizador_id = tipo.tipo_utilizador_id ' +
      'where tipo = "Admin" and utilizador_email = "' + users.email.toString() + '" and utilizador_pass = "' + users.pass.toString() + '"'
  client.query(query, (error, results) => {if (error) {throw error}
    const aa = JSON.stringify(results);
    const bb = JSON.parse(aa)


    if(aa.localeCompare("[]") != 0) {
      const id = parseInt(bb[0].utilizador_id);
      const query = 'select pergunta,respostas,COUNT(DISTINCT(respostas_utilizador_rel.utilizador_id)) AS quantidade_respostas,(SELECT COUNT(respostas_id) AS TotalItemsOrdered FROM respostas_utilizador_rel where respostas.perguntas_id) AS total from perguntas ' +
          'inner join respostas on perguntas.perguntas_id = respostas.perguntas_id ' +
          'left join respostas_utilizador_rel on respostas.respostas_id = respostas_utilizador_rel.respostas_id ' +
          'where perguntas.utilizador_id = ' + id + '  group by respostas.respostas_id '
      console.log(query)
      client.query(query, (error, results2) => {
        if (error) {
          throw error
        }
        response.status(200).json(results2)
      })
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
  getutilizador,
  login,
  createutilizador,
  userdelete,
  updateuser,
  resultvot
}