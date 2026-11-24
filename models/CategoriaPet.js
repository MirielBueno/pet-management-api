const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")
const Tutor = require("./Tutor")

const CategoriaPet = sequelize.define("CategoriaPet", {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    }
}, {
    tableName:"categoria_pet",
    timestamps: false
})

module.exports = CategoriaPet