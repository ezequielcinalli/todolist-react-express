const express = require('express')
const router = express.Router()
const task = require('../models/task')

router.get('/', (req, res) => {
    task.getAll(res)
})
router.get('/:id', (req, res) => {
    task.get(req,res)
})
router.post('/add', (req, res) => {
    task.add(req,res)
})
router.put('/update/:id', (req, res) => {
    task.update(req,res)
})
router.delete('/delete/:id', (req, res) => {
    task.delete(req,res)
})

module.exports = router