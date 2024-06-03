const { DataTypes } = require("sequelize");
const connection = require("./database");
const Aluno = require("./Aluno"); // Assuming Aluno model is defined in "Aluno.js" file

const Matricula = connection.define(
    "matricula",
    {
        id_Matricula: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Assuming this should be auto-incremented
        },
        aluno_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Aluno, // Reference the Aluno model
                key: 'id_aluno'
            }
        },
        turma_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        periodo: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    }
);

async function sincronizarMatricula() {
    try {
        await Matricula.sync({ force: false });
    } catch (error) {
        console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
        await connection.close();
        console.log("Conexão fechada.");
    }
}

Matricula.sync({ force: false }).then(() => {});

module.exports = Matricula;
