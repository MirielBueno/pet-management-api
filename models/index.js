const Tutor = require("./Tutor")
const Pet=require("./Pet")
const CategoriaPet = require("./CategoriaPet")

Tutor.hasMany(Pet, {
    foreignKey: "id_tutor"
})
                            //um tutor pode ter vários pets, um pet tem um tutor
Pet.belongsTo(Tutor,{
    foreignKey:"id_tutor"
})

CategoriaPet.hasMany(Pet, {
    foreignKey: "id_categoria"
})
                            //uma categoria pode ter vários pets, um pet tem uma categoria
Pet.belongsTo(CategoriaPet,{
    foreignKey:"id_categoria"
})

module.exports = {Tutor, Pet, CategoriaPet}