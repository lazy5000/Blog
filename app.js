const express = require("express")
const mongoose = require("mongoose")
const router = require(__dirname+"/routes/route.js")
const articles = require("./models/model")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const app = express()


app.set("view engine","ejs")
 
app.use(bodyParser.urlencoded({extended:true}))
app.use("/articles",router)
app.use(methodOverride("method"))

app.get("/", async (req,res) => {
    const article = await articles.find()
    console.log(article)
    res.render("view",{articles:article})
})

mongoose.connect("mongodb://localhost:27017/blog")


app.listen(3000,()=>{
    console.log("server started")
})