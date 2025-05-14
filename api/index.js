const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/product.module.js')

app.use(express.json())

const cors = require('cors');
app.use(cors());


app.get('/' , (req, res) => {
    res.send('Hello from node api ehhehheghegh')
})

app.get('/api/products',async (req, res) => {
    try {
       const products = await Product.find({})
       res.status(200).json(products)
    } catch (error) {
       res.status(500).json({message: error.message});
    }
})


app.get('/api/products/:id',async (req, res) => {
    try {
       const {id} = req.params
       const product = await Product.findById(id)
       res.status(200).json(product)
    } catch (error) {
       res.status(500).json({message: error.message});
    }
})

app.post('/api/products',async (req, res) => {
     try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
     } catch (error) {
        res.status(500).json({message: error.message});
     }
})


mongoose.connect("mongodb+srv://ermilindakrasniqi:XLOfNztd2L4vUKbP@backenddb.fjoq2v1.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
console.log("connected to DATABASE")

app.listen(3000, () => {
    console.log('server is running in 3000')
})

})
.catch(() => {
    console.log("connection failed")
})