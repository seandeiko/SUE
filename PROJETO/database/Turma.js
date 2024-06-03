const { DataTypes } = require("sequelize");
const connection = require("../database");

const Turmas = connection.define(
    "turma",
    {
        id_turma: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nome_turma: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        turno: {
            type: DataTypes.ENUM('Manhã', 'Tarde', 'Noite'),
            allowNull: false,
        },
        ano: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false
    }
);

async function sincronizarTurma() {
    try {
        await Turmas.sync({ force: false });
    } catch (error) {
        console.error("Erro ao sincronizar a tabela Turmas: ", error);
    } finally {
        await connection.close();
        console.log("Conexão fechada.");
    }
}

module.exports = { Turmas, sincronizarTurma };
