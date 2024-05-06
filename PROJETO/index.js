const express = require('express');
const app = express();
app.set("view engine", "ejs");

port = 4000;

const connection = require("./database/database");
const Disciplina = require("./database/Disciplina");
disciplina = Disciplina.sincronizarDisciplina();

connection
.authenticate()
.then(() => {
    console.log("conexão feita com o banco de dados!");
})
.catch((msgErro) => {
    console.log(msgErro);
});

const bodyParser = require("body-parser");

