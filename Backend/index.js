const express = require('express')
const app = express()
const cors = require('cors')


const adminRoute = require('./routes/adminRoutes')
const userRoute = require("./routes/userRoute")
const connectDB = require("./dbConfig/connectDB");
const featureRoute = require("./routes/featureRoute")
const attendanceRoute = require("./routes/attendance");
const authRoute=require("./routes/authRoute");
require("dotenv").config();

const cookieParser = require('cookie-parser')
const protectMiddleware = require('./middleware/protectMiddleware')

const testRoute = require("./routes/testRoute");
const taskRoute = require('./routes/taskRoute')


app.use(express.json())
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}))
app.use(cookieParser())


app.use('/v1/admin/', adminRoute)
app.use('/v1/user/', userRoute)
app.use('/v1/', featureRoute)
app.use("/v1/test", testRoute);
app.use("/v1/attendance", attendanceRoute);
app.use('/api/auth', authRoute)
app.use('/v1/assign-task', taskRoute)


const PORT = 3000;
const startServer = async () => {
  try {
    await connectDB(); // 👈 WAIT for DB

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (err) {
    console.log("Server failed to start", err);
  }
};

startServer();