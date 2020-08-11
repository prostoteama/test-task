const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'store_db'
})

db.connect((err) => {
    if (err) return err      
})

const app = express(cors())

app.get('/', (req, res) => {
   res.send('Halooo')
})

app.get('/products', (req, res) => {
    const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM `test-products`'
    db.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
        if (err) return res.send(err)
        else {
            return res.json({
                data: results
            })
        }
    })
})

app.get('/products/add', (req, res) => {
    const {name, price} = req.query;
    const PRODUCTS_ADD_QUERY = `INSERT INTO \`test-products\` (\`name\`, \`price\`) VALUES ('${name}', '${price}')`

    db.query(PRODUCTS_ADD_QUERY, (err, results) => {
        if (err) return res.send(err)
        else return res.send('successsfully added')
    })
})

app.listen('4000', () => {
    console.log('server listenong on port 4000')
})   