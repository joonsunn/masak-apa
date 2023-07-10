const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const axios = require('axios')
const middleware = require('./utils/middleware')
const foodRouter = require('./controllers/food')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)



app.get('/', async (request, response) => {
	return response.send('Hello')
})

app.use('/food', foodRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app