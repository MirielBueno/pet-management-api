const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Pet = sequelize.define("Pet", {
    id_pet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_pet: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    raca_pet: {
        type: DataTypes.STRING(80),
        allowNull: true
    },
    sexo_pet: {
    type: DataTypes.CHAR(1),
    allowNull: false
    },
    altura_cm: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    id_tutor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: "pet",
    timestamps: false
})

module.exports=Pet;