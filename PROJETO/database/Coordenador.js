const { DataTypes } = require("sequelize");
const connection = require("./database");
const Usuarios = require("./Usuarios");

const Coordenador = connection.define(
    "coordenador",
    {
        id_coordenador: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuarios,
                key: 'usuario_id'
            }
        },
        nome: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        data_nascimento: {
            type: DataTypes.DATE
        },
        genero: {
            type: DataTypes.ENUM('masculino', 'feminino', 'Outro'),
            allowNull: false
        },
        endereco: {
            type: DataTypes.TEXT
        }
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
