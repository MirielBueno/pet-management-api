
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// POST - Gerar token de autenticação
router.post("/token", (req, res) => {
    const { senha } = req.body || {};

    // Verifica se as configurações existem
    if (!process.env.API_PASSWORD || !process.env.JWT_SECRET) {
        return res.status(500).json({
            erro: "Autenticação não configurada"
        });
    }

    // Verifica a senha informada
    if (senha !== process.env.API_PASSWORD) {
        return res.status(401).json({
            erro: "Senha inválida"
        });
    }

    // Gera um token válido por 1 hora
    const token = jwt.sign(
        { acesso: "api" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

module.exports = router;
