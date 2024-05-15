const express = require('express');
const { DataTypes, Sequelize } = require("sequelize");
const app = express();
app.set("view engine", "ejs");

port = 4000;

const connection = require("./database/database");
const Disciplina = require("./database/Disciplina");
/*disciplina = Disciplina.sincronizarDisciplina();*/

connection
.authenticate()
.then(() => {
    console.log("conexão feita com o banco de dados!");
})
.catch((msgErro) => {
    console.log(msgErro);
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var pessoas = [
    {
        nome: "paulo francis",
        idade: 12,
    },
    {
        nome: "ananda",
        idade: 21,
    },
    {
        nome: "sean",
        idade: 19,
    }
];

//rota nova
app.get('/pessoas', (req, res) => {
    res.render("pessoas", { pessoas: pessoas });
});


app.get("/disciplinas", (req, res) => {
    Disciplina.findAll({
      raw: true,
      order: [
        ["id_disciplina", "DESC"], // ASC = Crescente || DESC = Decrescente
      ],
    }).then((disciplinas) => {
      res.render("cad_disciplinas", {
        disciplinas: disciplinas,
      });
    });
  });
  
  
  //Rota para inserir dados na tabela
  app.post("/editar_disciplina", async (req, res) => {
    const { nome_disciplina, carga_horaria, descricao_disciplina, action } =
      req.body;
    const id = req.params.id;
    /*console.log(
      "****Dados disciplina: => ESTOU EM /editar_disciplina",
      nome_disciplina,
      carga_horaria,
      descricao_disciplina,
      action,
      id
    );*/
    // ESTA INCLUSÃO ESTÁ FUNCIONANDO
    if (action === "incluir") {
      try {
        //const { nome_disciplina, carga_horaria, descricao_disciplina } = req.body;
        const id = req.params.id;
        await Disciplina.create({
          nome_disciplina,
          carga_horaria,
          descricao_disciplina,
        });
        //res.status(201).json(disciplina);
        res.status(201).redirect("/disciplinas");
      } catch (error) {
        console.error(
          "Erro ao inserir dados PARA A DISCIPLINA: /editardisciplina",
          error
        );
        res.status(500).json({
          error: "Erro ao inserir dados PARA A DISCIPLINA. /editardisciplina",
        });
      }
    }
    // A ALTERAÇÃO ESTÁ FUNCINANDO
    if (action === "alterar") {
      try {
        const {
          nome_disciplina,
          carga_horaria,
          descricao_disciplina,
          id_disciplina,
        } = req.body;
        const id = id_disciplina;
        //const id = req.params.id;
        const disciplina = await Disciplina.findByPk(id);
        if (!disciplina) {
          return res.status(404).json({
            error: `Disciplina NÃO FOI encontrada - NA TABELA DE DISCIPLINAS - ID: ${id}.`,
          });
        }
        disciplina.nome_disciplina = nome_disciplina;
        disciplina.carga_horaria = carga_horaria;
        disciplina.descricao_disciplina = descricao_disciplina;
        await disciplina.save();
        res.status(201).redirect("/disciplinas");
      } catch (error) {
        console.error(
          `Erro ao ALTERAR dados PARA A DISCIPLINA: /editardisciplina ${nome_disciplina}`,
          error
        );
        res.status(500).json({
          error: `Erro ao ALTERAR dados PARA A DISCIPLINA. /editardisciplina ${nome_disciplina}`,
        });
      }
    }
  });
  
  
  // Rota para excluir dados da tabela
  // ESTA FUNCIONA. iNCLUIR Mensagem de operação BEM SUCEDIDA.
  app.post("/excluir_disciplina/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const disciplina = await Disciplina.findByPk(id);
      if (!disciplina) {
        return res.status(404).json({ error: "Disciplina não encontrada." });
      }
      // PARA EXCLUIR A DISCIPLINA COM A CHAVE INFORMADA
      await Disciplina.destroy({
        where: {
          id_disciplina: id,
        },
      });
      res.redirect("/disciplinas");
    } catch (error) {
      console.error("Erro ao excluir dados:", error);
      res
        .status(500)
        .json({ error: "Erro ao excluir dados da tabela de disciplina." });
    }
  });
  
  
  















  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

