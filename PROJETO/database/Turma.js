// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Turma = connection.define(
  "Turma", // Changed the table name from "coordenador" to "Turma"
  {
      turma_id: {
          type: DataTypes.INTEGER, 
          primaryKey: true,
      },
      ano_letivo: {
          type: DataTypes.INTEGER,
      },
      semestre: {
          type: DataTypes.ENUM('1', '2'),
      },
  },
  {
      timestamps: false
  }
);


async function sincronizarTurma() {
    try {
      await Turma.sync({ force: false });
    } catch (error) {
      console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
      await connection.close();
      console.log("Conexão fechada.");
    }
  }

  Turma.sync({ force: false }).then(() => {});

  module.exports = Turma;
