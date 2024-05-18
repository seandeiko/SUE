// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Usuarios = connection.define(
    "usuario",
    {
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.TEXT,

        },
        tipo: {
            type: DataTypes.ENUM('masculino', 'feminino', 'Outro')
        },
    },
    {
        timestamps: false
    }
);

async function sincronizarUsuario() {
    try {
      await Usuario.sync({ force: false });
    } catch (error) {
      console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
      await connection.close();
      console.log("Conexão fechada.");
    }
  }

  Usuarios.sync({ force: false }).then(() => {});

  module.exports = Usuarios;
