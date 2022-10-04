const app = require('./app')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')

//Handling uncaught exception
process.on('uncaughtException', (err)=> {
    console.log("Exception :"+err.message)
    console.log("Shutting server due to uncaught exception")
    process.exit(1)
})


//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//Database connect
connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server=app.listen(process.env.PORT, ()=>    {
    console.log('App is working on Port:'+process.env.PORT)
})

//Unhandled promise rejections
process.on('unhandledRejection',(err)=>{
    console.log("Error :"+err.message)
    console.log("Shutting down server due to unhandled promise rejection")
    server.close(()=>{
        process.exit(1)
    })
})





