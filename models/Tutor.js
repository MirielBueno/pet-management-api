const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Tutor = sequelize.define("Tutor",{
    id_tutor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cpf: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        unique: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull:false
    }
},
    {
        tableName:"tutor",
        timestamps: false
})

module.exports = Tutor;