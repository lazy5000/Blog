const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/model.js')
const router = require('./routes/route')
const methodOverride = require('method-override')
const app = express()
const bodyParser = require("body-parser")

mongoose.connect('mongodb://localhost/blog')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('view', { articles: articles })
})

app.use('/articles',router)

app.listen(3000,() => {
    console.log("server started")
})