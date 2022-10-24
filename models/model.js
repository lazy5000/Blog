const mongoose = require("mongoose")
const slugify = require("slugify")
const marked = require("marked")
const createDomPurify = require("dompurify")
const {JSDOM} = require("jsdom")
const dompurify = createDomPurify(new JSDOM().window)

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
       
    },
    markdown:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    santiziedHTML:{
        type:String,
        required:true
    }
})

schema.pre("validate",(next) => {
    if(this.title){
        this.slug = slugify(this.title,{
            lower:true,
            strict:true
        })
    }

    if(this.markdown){
        this.santiziedHTML = dompurify.sanitize(marked(this.markdown))
    }

    next()
})

const articles = mongoose.model("articles",schema)

module.exports = articles