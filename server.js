const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000
const app = express()


mongoose.connect('mongodb://localhost/blog', { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(connection => {
    console.log('Connected to MongoDB DB')
  })
  .catch(error => {
  console.log(error.message)
  })

mongoose.set('bufferCommands', false);

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('./articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port)

