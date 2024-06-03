const { DataTypes } = require("sequelize");
const connection = require("./database");
const Aluno = require("./Aluno"); // Assuming Aluno model is defined in "Aluno.js" file
const Turma = require("./Turma"); // Assuming Turma model is defined in "Turma.js" file

const Presenca = connection.define(
    "presenca",
    {
        presenca_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            allowNull: false,
            references: {
                model: Turma, // Reference the Turma model
                key: 'turma_id'
            }
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
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
