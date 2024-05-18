// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Coordenador = connection.define(
    "coordenador",
    {
        id_coordenador: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            foreingKey: true,
        },
        nome: {
            type: DataTypes.TEXT,

        },
        data_nascimento: {
            type: DataTypes.INTEGER,
        },
        data_nascimento: {
            type: DataTypes.DATE,
        },
        genero: {
            type: DataTypes.ENUM('masculino', 'feminino', 'Outro'),
            allowNull: false,
        },
        endereco: {
            type: DataTypes.TEXT,
        },
    },
    {
        timestamps: false
    }
);


async function sincronizarCoordenador() {
    try {
      await Coordenador.sync({ force: false });
    } catch (error) {
      console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
      await connection.close();
      console.log("Conexão fechada.");
    }
  }

  Coordenador.sync({ force: false }).then(() => {});

  module.exports = Coordenador;