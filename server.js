const express = require("express")
const cors = require("cors")
const tutoresRoutes = require("./routes/tutores")
const petsRoutes = require("./routes/pets")
const authRoutes = require("./routes/auth");

const app = express()   //varival q recebe o servidor
const PORT = 3000   //porta q o servidor usa

app.use(cors()) //habilita CORS como middleware
app.use(express.json()) //habilita requisições no formato de json     

app.use("/auth", authRoutes);

app.use("/tutores", tutoresRoutes) //chama rotas do CRUD tutores

app.use("/pets", petsRoutes) //chama rotas do CRUD pets

app.get("/", (req, res) => {    //rota para GET
    res.json({mensagem: "API OK"}) //resposta teste no formato json
})

app.listen(PORT, () => {    //inicia o servidor e espera conexão
    console.log(`server running in ${PORT}`)
})