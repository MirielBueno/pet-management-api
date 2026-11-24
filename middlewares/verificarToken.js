const jwt = require("jsonwebtoken");

// Verifica o token antes de permitir o acesso
function verificarToken(req, res, next) {
    const auth = req.headers.authorization;

    // Verifica se o token foi enviado
    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).json({
            erro: "Token não informado"
        });
    }

    const token = auth.split(" ")[1];

    try {
        // Verifica a assinatura e a validade do token
        jwt.verify(token, process.env.JWT_SECRET);

        next(); // Autoriza a continuação da requisição
    } catch (erro) {
        res.status(403).json({
            erro: "Token inválido ou expirado"
        });
    }
}

module.exports = verificarToken;
