const { DataTypes } = require("sequelize");
const connection = require("./database");
const Aluno = require("./Aluno"); // Assuming Aluno model is defined in "Aluno.js" file
const Turma = require("./Turma"); // Assuming Turma model is defined in "Turma.js" file
const Disciplina = require("./Disciplina"); // Assuming Disciplina model is defined in "Disciplina.js" file

const Nota = connection.define(
    "nota",
    {
        nota_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Assuming this should be auto-incremented
        },
        aluno_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Aluno, // Reference the Aluno model
                key: 'id_aluno'
            }
        },
        turma_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Turma, // Reference the Turma model
                key: 'turma_id'
            }
        },
        disciplina_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Disciplina, // Reference the Disciplina model
                key: 'disciplina_id'
            }
        },
        nota:{
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

async function sincronizarNota() {
    try {
      await Nota.sync({ force: false });
    } catch (error) {
      console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
      await connection.close();
      console.log("Conexão fechada.");
    }
}

Nota.sync({ force: false }).then(() => {});

module.exports = Nota;
