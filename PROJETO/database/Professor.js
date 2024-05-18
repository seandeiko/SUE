// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Professores = connection.define(
    "Professores", 
    {
        professor_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuarios', 
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
          await Professor.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
    
      Professores.sync({ force: false }).then(() => {});
    
      module.exports = Professores;
