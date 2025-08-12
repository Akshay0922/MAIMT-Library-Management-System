const express=require("express")
const app=express()
const connectDb=require("./config/db")
const dotenv=require("dotenv")
const cors=require("cors")
const authRoutes=require("./routes/authRoutes")
const adminRoutes=require("./routes/adminRoutes")
const bookRoutes=require("./routes/addBookRoutes")
const searchBooks = require("./routes/opacRoutes")
const issueRoutes = require("./routes/issueRoutes")


//load env var
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectDb()
app.use("/auth",authRoutes)
app.use("/admin",adminRoutes)
app.use("/library",bookRoutes)
app.use("/opac",searchBooks)
app.use("/issue",issueRoutes)

const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})