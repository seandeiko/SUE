const Sequelize = require("sequelize");

//criando uma instancia do Sequelize
//esta instancia é uma conexão com o banco MYSQL
const connection = new Sequelize("sue2", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = connection;