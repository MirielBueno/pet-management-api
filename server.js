const express = require("express")
const cors = require("cors")

const app = express()   //varival q recebe o servidor
const PORT = 3000   //porta q o servidor usa

app.use(cors()) //habilita CORS como middleware
app.use(express.json()) //habilita requisições no formato de json     

app.get("/", (req, res) => {    //rota para GET
    res.json({mensagem: "API OK"}) //resposta teste no formato json
})

app.listen(PORT, () => {    //inicia o servidor e espera conexão
    console.log(`server running in ${PORT}`)
})