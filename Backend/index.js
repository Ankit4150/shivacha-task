const express = require('express')
const app = express()
const cors = require('cors')

// const adminRoute = require('../routes/adminRoutes')
const userRoute = require('../Backend/routes/userRoute')
const connectDB = require('../Backend/dbConfig/connectDB')
const adminRoute = require('../Backend/routes/adminRoutes')
const featureRoute = require("../Backend/routes/featureRoute")
const cookieParser = require('cookie-parser')
const protectMiddleware = require('./middleware/protectMiddleware')


app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())

connectDB()

app.use('/v1/admin/', adminRoute)
app.use('/v1/user/', userRoute)
app.use('/v1/', featureRoute)



// for testing the surver methods are working
// app.get('/test', (req, res)=> {
//         res.json({
//             message: "me endpoint is running"
//         })    
// })

app.listen((3000), ()=>{
    console.log('server is running at port 3000')
})
