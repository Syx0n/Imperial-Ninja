import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

let __filename = fileURLToPath(import.meta.url)
let __dirname = path.dirname(__filename)

let app = express()

app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.listen(3000,()=>{
    console.log("Working")
})
