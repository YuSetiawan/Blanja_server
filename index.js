require('dotenv').config()
const express = require('express')
// const createError = require('http-errors')
const app = express()
const cors = require('cors')
// const morgan = require('morgan')
const mainRouter = require('./src/routers/index')
const port = 3000


app.use(express.json())
app.use(cors())
// app.use(morgan('dev'))
app.use('/', mainRouter)
app.use('/img', express.static('upload'));
// app.all('*', (req, res, next) => {
//   next(new createError.NotFound())
// })
// app.use((err,req,res,next)=>{
//   const messageError = err.message || "internal server error"
//   const statusCode = err.status || 500

//   res.status(statusCode).json({
//     message : messageError
//   })
// })

app.get("/", (req, res) => {  
  res.send("hello world")
})
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});