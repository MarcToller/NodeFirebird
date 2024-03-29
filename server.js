import express from "express"
import cors from "cors"

const app = express()

// middleware json
app.use(express.json())

// middleware cors (para que a aplicação possa ser acesada de fora)
app.use(cors())