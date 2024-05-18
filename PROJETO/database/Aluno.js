// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Alunos = connection.define(
    "aluno",
    {
        id_aluno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,

        },
        nome: {
            type: DataTypes.TEXT,

        },
        data_nascimento: {
            type: DataTypes.DATE,
        },
        genero: {
            type: DataTypes.ENUM('masculino', 'feminino', 'Outro'),
            allowNull: false,
        },
        endereco: {
            type: DataTypes.TEXT
        },
    },
    {
        timestamps: false
    }
);

async function sincronizarAluno() {
    try {
      await Aluno.sync({ force: false });
    } catch (error) {
      console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
      await connection.close();
      console.log("Conexão fechada.");
    }
  }

  Alunos.sync({ force: false }).then(() => {});

  module.exports = Alunos;
