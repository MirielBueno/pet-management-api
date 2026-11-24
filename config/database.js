
require("dotenv").config() //carrega as config do .env

const { Sequelize } = require("sequelize") //importa o sequelize

const sequelize = new Sequelize(  //configura nova conexão com o banco
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mariadb",
        logging: false
    }
)

module.exports = sequelize
