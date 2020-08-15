const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3307',
    password: 'root',
    database: 'productsdb'
})

db.connect((err) => {
    if (err) return err     
})

const app = express()

app.get('/', (req, res) => {
   res.send('Halooo')
})

app.get('/products', cors(), (req, res) => {
    const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products'
    db.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
        if (err) return res.send(err)
        else {
            return res.json({
                data: results
            })
        }
    })
})

app.get('/products/add', cors(), (req, res) => {
    const {id} = req.query;
    const PRODUCTS_ADD_QUERY = `INSERT INTO orders (order_product_id, order_total_unit, order_unit_val, order_export_date) VALUES (${id}, 10, 'kg', DATE("2017-06-15"))`

    db.query(PRODUCTS_ADD_QUERY, (err, results) => {
        if (err) return res.send(err)
        else return res.send(`successsfully added product with id ${id}`)
    })
})

app.listen('4000', () => {
    console.log('server listenong on port 4000')
})   