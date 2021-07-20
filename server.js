const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const dotenv = require('dotenv')
const port = process.env.PORT || 3000
const app = express()

dotenv.config()

const connectDB = async () => {try {await mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.Password}@my-blog.wwm1y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
    useFindAndModify: false 
})
    console.log('MongoDB connected!!');
} catch (err) {
    console.log('Failed to connect to MongoDB', err);
}}

mongoose.set('bufferCommands', false);

connectDB()

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

