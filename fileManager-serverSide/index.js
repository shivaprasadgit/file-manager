import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import folderRoutes from './routes/folder.js'
import dotenv from 'dotenv'
const app = express()
dotenv.config()

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use('/folders',folderRoutes)
app.get('/',(req,res)=>{
  res.send('hello to file Manager api')
})
// const CONNECTION_URL = 'mongodb+srv://admin:admin@cluster0.gdgtm.mongodb.net/memoriesPosts?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true})
.then(()=> app.listen(PORT,()=> console.log( `Server running on port : ${PORT}`)))
.catch((error)=>console.log(error.message))

mongoose.set('useFindAndModify',false)