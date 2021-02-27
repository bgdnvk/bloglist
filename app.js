const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')



// const http = require('http')
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')

// const blogSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number
// })

// const Blog = mongoose.model('Blog', blogSchema)
//const mongoUrl = 'mongodb://localhost/bloglist'
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true, 
        useFindAndModify: false, useCreateIndex: true })
        .then(() => logger.info('connected to mongoDB'))
        .catch((error) => {
            logger.error('error connecting to mongodb', error.message)
        })

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

// const PORT = 3003
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })