const express = require('express')
const app = express()
const cors = require('cors')
const adminRoute = require('../routes/adminRoutes')
const userRoute = require('../routes/userRoute')
const connectDB = require('../dbConfig/connectDB')


app.use(express.json())
app.use(cors())

connectDB()



app.use('/v1/admin', adminRoute)
app.use('/v1/user/', userRoute)

// for testing the surver methods are working
// app.get('/test', (req, res)=> {
//         res.json({
//             message: "me endpoint is running"
//         })    
// })

app.listen((3000), ()=>{
    console.log('server is running at port 3000')
})
