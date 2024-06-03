const { DataTypes } = require("sequelize");
const connection = require("./database");
const Usuarios = require("./Usuarios");

const Alunos = connection.define(
    "aluno",
    {
        id_aluno: {
            type: DataTypes.INTEGER,
            allowNull: false,
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

async function sincronizarAluno() {
    try {
        await Alunos.sync({ force: false });
    } catch (error) {
        console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
        await connection.close();
        console.log("Conexão fechada.");
    }
}

Alunos.sync({ force: false }).then(() => {});

module.exports = Alunos;
