const express = require('express');
const router = express.Router();
const items = require('../fakeDb')
const ExpressError = require('../error')

router.get('/', function(req, res, next) {
    res.json({ items })
})

router.post('/', function (req, res, next) {
   const newItem = {
            name: req.body.name,
            price: req.body.price
        }
    items.push(newItem)
    res.status(201).json({added: newItem})
})

router.get('/:name', function (req, res, next) {
    const item = items.find(item => item.name === req.params.name)
    if (item === undefined) {
        throw new ExpressError('item not found', 404)
    }
    res.json({item})
})

router.patch('/:name', function (req, res, next) {
    const item = items.find(item => item.name === req.params.name)
    if (item === undefined) {
        throw new ExpressError('item not found', 404)
    }
    item.name = item.name ? req.body.name : item.name
    item.price = item.price ? req.body.price : item.price
    res.json({updated: item})
})

router.delete('/:name', function (req, res, next) {
    const item = items.find(item => item.name === req.params.name)
    if (item === undefined) {
        throw new ExpressError('item not found', 404)
    }
    items.splice(items.indexOf(item), 1)
    res.json({message: 'Item deleted'})
})

module.exports = router;