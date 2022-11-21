const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const app = express()



app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))


app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'})
    res.render('articles/index', { articles: articles})
})

app.use('/articles', articleRouter)


app.listen(3000)

//Listen on port 3000

    mongoose.connect('mongodb+srv://DraganAdrian:Animal92@cluster0.jtunoft.mongodb.net/test')
    .then(() => console.log('DB connected'))
    .catch((error) => console.error('DB connection error!', error));