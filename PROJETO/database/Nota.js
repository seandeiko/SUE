// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Nota = connection.define(
    "nota",
    {
        nota_id: {
          type: DataTypes.INTEGER,
        },
        aluno_id:{
          type: DataTypes.INTEGER,
        },
        turma_id:{
          type: DataTypes.INTEGER,
        },
        disciplina_id:{
          type: DataTypes.INTEGER,
        },
        nota:{
          type: DataTypes.FLOAT,
        },

    },
    {
        timestamps: false
    }
);

async function sincronizarNota() {
    try {
      await Nota.sync({ force: false });
    } catch (error) {
      console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
      await connection.close();
      console.log("Conexão fechada.");
    }
  }

  Nota.sync({ force: false }).then(() => {});

  module.exports = Nota;
