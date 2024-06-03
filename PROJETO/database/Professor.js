const { DataTypes } = require("sequelize");
const connection = require("./database");
const Usuarios = require("./Usuarios"); // Assuming Usuarios model is defined in "Usuarios.js" file

const Professores = connection.define(
    "Professores", 
    {
        professor_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Assuming this should be auto-incremented
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuarios, // Reference the Usuarios model
                key: 'usuario_id' 
            },
            onDelete: 'CASCADE'
        },
        nome: {
            type: DataTypes.STRING(100)
        },
        data_nascimento: {
            type: DataTypes.DATE,
        },
        genero: {
            type: DataTypes.ENUM('Masculino', 'Feminino', 'Outro'),
        },
        endereco: {
            type: DataTypes.STRING(255)
        },
    },
    {
        timestamps: false
    }
);

async function sincronizarProfessor() {
    try {
        await Professores.sync({ force: false });
    } catch (error) {
        console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
        await connection.close();
        console.log("Conexão fechada.");
    }
}

Professores.sync({ force: false }).then(() => {});

module.exports = Professores;
