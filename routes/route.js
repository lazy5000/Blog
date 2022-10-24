const express = require("express")
const router = express.Router()

const articles = require("/home/lazy_5000/Documents/backend/blog/models/model.js")

router.get("/new",(req,res) => {
    res.render("new")
})

router.get("/:slug", async (req,res) => {
    const article = await articles.findOne({slug:req.params.id})
    if(article === null) redirect("/")
    res.render("show",{article})
})

router.post("/", async (req,res) => {
    console.log(req.body)
    const article = new articles({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown,
        createdAt:new Date
    })
   try {
    await  article.save()
    res.redirect(`/articles/${article.slug}`)
   } catch (error) {
     res.render("article/new")
   }
 
})

router.delete("/:id", async (req,res) => {
    await articles.findByIdAndDelete(req.params.id)
    res.redirect("/")
})

router.put("/:id",(req,res) => {
    
})

module.exports = router