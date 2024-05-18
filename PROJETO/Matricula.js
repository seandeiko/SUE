// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Matricula = connection.define(
    "matricula",
    {
        id_Matricula: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        aluno_id: {
          type: DataTypes.INTEGER,
        },
        turma_id: {
          type: DataTypes.INTEGER,
        },
        periodo: {
          type: DataTypes.STRING
        },
    },
    {
        timestamps: false
    }
);

async function sincronizarMatricula() {
    try {
      await Aluno.sync({ force: false });
    } catch (error) {
      console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
      await connection.close();
      console.log("Conexão fechada.");
    }
  }

  Matricula.sync({ force: false }).then(() => {});

  module.exports = Matricula;