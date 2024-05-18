// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Presenca = connection.define(
    "presenca",
    {
        presenca_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        aluno_id: {
            type: DataTypes.INTEGER,
        },
        turma_id: {
            type: DataTypes.INTEGER,
        },
        data: {
            type: DataTypes.DATE,
        },
        presente: {
            type: DataTypes.BOOLEAN,
            allowNull: false
          },
    },
    {
        timestamps: false
    }
);

async function sincronizarPresenca() {
    try {
      await Presenca.sync({ force: false });
    } catch (error) {
      console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
      await connection.close();
      console.log("Conexão fechada.");
    }
  }

  Presenca.sync({ force: false }).then(() => {});

  module.exports = Presenca;