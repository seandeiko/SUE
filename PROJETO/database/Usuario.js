const { DataTypes } = require("sequelize");
const connection = require("../database");

const Usuarios = connection.define(
    "usuario",
    {
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
      await Usuarios.sync({ force: false });
    } catch (error) {
      console.error("Erro ao sincronizar a tabela Usuarios: ", error);
    } finally {
      await connection.close();
      console.log("Conexão fechada.");
    }
}

module.exports = { Usuarios, sincronizarUsuario };
