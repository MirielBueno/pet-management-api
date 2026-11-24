const expresse = require("express")
const { Pet, Tutor, CategoriaPet } = require("../models")
const verificarToken = require("../middlewares/verificarToken");

const router = expresse.Router()

//método para consultar todos pets - GET
router.get('/', async (req, res) => {
    try {
        const pets = await Pet.findAll({    //busca pets e suas relações
            include: [Tutor, CategoriaPet]
        })
        res.json(pets)   

    }catch (erro) {
        res.status(500).json({ erro: "erro ao buscar pets"})
    }
})

//método para consultar um pet por id - GET
router.get('/:id', verificarToken, async (req,res) => {
    try {
        const pet = await Pet.findByPk(req.params.id, { //busca pela PK
            include: [Tutor, CategoriaPet]
        })

        if (!pet) 

            return res.status(404).json({
                erro: "Pet não encontrado"        
            })
            res.json(pet)

        }catch (erro) {
            res.status(500).json({ erro: "Erro ao buscar pet"})
        }
})

// cadastrar um nobo pet - POST
router.post("/", async (req,res) =>{
    // constante que recebe os dados de um novo pet
    const {nome_pet, raca_pet, sexo_pet, altura_cm, id_tutor} = req.body

    //confere se campos obrigatórios foram preenchidos
    if (!nome_pet || !sexo_pet || altura_cm == null || !id_tutor ) {
        return res.status(400).json ({
        erro: "Informe nome, sexo, altura e tutor"
        })
    }
    //valida sexo e altura
    if (!["M", "F"].includes(sexo_pet) ||
    !Number.isFinite(Number(altura_cm)) ||
    Number(altura_cm) < 0 ) {
        return res.status(400).json({
            erro: "Sexo ou altura inválios"
        })
    } 

    try {
        // cadastra pet no banco
        const pet = await Pet.create({
            nome_pet, raca_pet, sexo_pet, altura_cm, id_tutor
        })

        // atualiza dados inseridos pelo trigger classificaAltura
        await pet.reload({
            include: [Tutor,CategoriaPet]
        })

        res.status(201).json(pet)

    } catch (erro) {

        if (erro.name === "SequelizeForeignKeyConstraintError") {
            return res.status(400).json({
                erro: "Tutor inválido"
            })
        }
        res.status(500).json({erro: "Erro ao cadastrar pet"})
    }
})

// atualizar dados pet - PUT
router.put("/:id", async(req,res) =>{
    const {nome_pet, raca_pet, sexo_pet, altura_cm, id_tutor} = req.body

    // valida campos obrigatórios
    if (!nome_pet || !sexo_pet || altura_cm == null || !id_tutor) {
        return res.status(400).json({
            erro: "Informe nome, sexo, altura e tutor"
        })
    }
    //valida sexo e altura
    if (!["M", "F"].includes(sexo_pet) || !Number.isFinite(Number(altura_cm)) ||
        Number(altura_cm) < 0) {
            return res.status(400).json({
                erro: "serxo ou altura inválidos"
            })
        }

        try {
            const pet = await Pet.findByPk(req.params.id)

            if(!pet) {
                return res.status(404).json({
                    erro: "Pet não encontrado"
                })
            }
                //atuliza dados 
            await pet.update({
                nome_pet, raca_pet, sexo_pet, altura_cm, id_tutor
            })

            //carrega dados após trigger de atulizar categoria
            await pet.reload({
                include: [Tutor, CategoriaPet]
            })
            res.json(pet)

        }catch (erro) {
            if (erro.name === "SequelizeForeignKeyConstraintError") {
                return res.status(400).json({
                    erro: "Tutor inválido"
                })
            }

            res.status(500).json({ erro: "Erro ao atulizar pet"})
        }
})

//excluir pet por id - DELETE
router.delete("/:id", async(req, res) =>{
    try{
        //busca pet pelo id / pk
        const pet = await Pet.findByPk(req.params.id)

        if(!pet){
            return res.status(404).json({
                erro: "Pet não encontrado"
            })
        }

        // exclui o registro no banco
        await pet.destroy()

        //confirma exclusão
        res.status(204).send()

    }catch (erro) {
        res.status(500).json({ erro: "Erro ao excluir pet"})
    }
})


 // consulta pets por tutor - GET
router.get("/tutor/:id", async (req, res) => {
    try {
        const pets = await Pet.findAll({
            where: { id_tutor: req.params.id },
            include: [CategoriaPet]
        });

        res.json(pets);
    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao buscar pets do tutor"
        });
    }
});


 // consulta pets por altura - GET
router.get("/altura/:altura", async (req, res) => {
    const altura = Number(req.params.altura);

    if (!Number.isFinite(altura) || altura < 0) {
        return res.status(400).json({
            erro: "Altura inválida"
        });
    }

    try {
        const pets = await Pet.findAll({
            where: { altura_cm: altura },
            include: [Tutor, CategoriaPet]
        });

        res.json(pets);
    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao buscar pets por altura"
        });
    }
});


module.exports = router