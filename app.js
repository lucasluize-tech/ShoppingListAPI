const express = require('express');
const app = express();
const itemsRoute = require('./routes/itemsRoute')
const ExpressError = require('./error')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/items', itemsRoute)

// standard 404 handling
app.use((req, res, next) => {
    const e = new ExpressError("Page not Found", 404)
    next(e)
})

app.use((error, req, res, next) => { // error-handler has 4 params
    let status = error.status || 500
    let message = error.message

    res.status(status).send(message)
})

module.exports = app;