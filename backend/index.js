import express from "express"
import dotenv from "dotenv"
import conn from "./db.js"
import bookRoute from "./routes/bookRoute.js"
import cors from "cors"

dotenv.config()
conn()

const app = express()
const port = process.env.PORT
//json ifadelerin okunması için yazdık
app.use(express.json())

app.use(cors())

// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ["GET","POST","PUT","DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// )

app.get("/", (req,res)=>{
   res.status(234).send("welcome my friend")
})

app.use("/books", bookRoute)

app.listen(port, ()=>{
    console.log(`App is listening to port: ${port}`);
})

