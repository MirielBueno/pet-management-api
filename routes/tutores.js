const express = require("express")
const { Tutor }  = require("../models")
const { EagerLoadingError } = require("sequelize")

const router= express.Router() //cria "as rotas"

router.get("/", async (req, res) =>{    //defeine método HTTP GET  e habilita função asinc
    try {
        const tutores = await Tutor.findAll()   //aguarda a resposta do banco
        res.json(tutores)
    }catch (erro) {
        res.status(500).json({erro: "erro ao buscar tutores"})
    }
})

router.post("/", async (req,res) => {       //defeine método HTTP POST e habilita função asinc
    const {cpf, nome, email} = req.body


    if (!cpf || !nome || !email){
        return res.status(400).json({           //(400) faltando dados obrigatórios 
            erro: "insira CPF, nome e email"
        })
    }

    try {
        const tutor = await Tutor.create({cpf, nome, email})
        res.status(201).json(tutor)         //(201) registro criado

    }catch(erro) {
        if(erro.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({           
                erro: "CPF ja cadastrado"       
            })
        }

        res.status(500).json({
            erro: "Erro ao cadastrar tutor"
        })
    }
})

router.put("/:id", async (req,res) =>{      //define a rota de atualização pelo ID
    const {cpf, nome, email} = req.body

    if (!cpf || !nome || !email){
        return res.status(400).json({
            erro: "insira CPF, nome, email"
        })
    }
    try {
        const tutor = await Tutor.findByPk(req.params.id) //busca tutor por pk

        if(!tutor){
            return res.status(404).json({
                erro: "tutor não encontrado"
            })
        }
    
        await tutor.update({cpf, nome, email}) //atualiza tutor no banco de dados
        res.json(tutor)

    }catch (erro) {
        if (erro.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                erro: "CPF já cadastrado"
            })
        }
        res.status(500).json({
            erro: "Erro ao atualizar tutor"
        })
    }
    
})

router.delete("/:id", async (req, res) => {
    try {
        const tutor = await Tutor.findByPk(req.params.id)

        if(!tutor) {
            return res.status(404).json({
                erro:"Tutor não econtrado"
            })
        }

        await tutor.destroy()      //exclusão de tutor no banco
        res.status(204).send()

    }catch (erro) {
        if(erro.name === "SequelizeForeignKeyConstraintError") {
            return res.status(409).json({
                erro:"Tutor possui pet cadastrado"
            })
        }

        res.status(500).json({
            erro: "Erro ao ecluir tutor"
        })
    }
    
})

module.exports = router