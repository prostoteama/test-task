const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const conf = require('./conf')

const db = mysql.createConnection(conf)

db.connect((err) => {
    if (err) return err     
})

const app = express(cors())

app.get('/', (req, res) => {
   res.send('Halooo')
})

//----ADD PRODUCTS---// example http://localhost:4000/products
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

//----ADD ORDER---// example http://localhost:4000/orders/add?id=3
app.get('/orders/add', cors(), (req, res) => {
    const {id} = req.query;
    const ORDERS_ADD_QUERY = `INSERT INTO orders (order_product_id, order_total_unit, order_unit_val, order_export_date) VALUES (${id}, 10, 'kg', DATE("2019-03-12"))`;

    db.query(ORDERS_ADD_QUERY, (err, results) => {
        if (err) return res.send(err)
        else return res.send(`successsfully added product with id ${id}`)
    })
})

//----GET ORDERS----// example http://localhost:4000/orders?date=%222017-06-15%22
app.get('/orders', cors(), (req, res) => {
    const {date} = req.query;
    const ORDERS_GET_QUERY = `SELECT * FROM orders WHERE order_export_date = DATE(${date})`;

    db.query(ORDERS_GET_QUERY, (err, results) => {
        if (err) return res.send(err)
        else return res.json({
            data: results
        })
    })
})

//----CHANGE VALUES----// example http://localhost:4000/change?table=products&id=2&value=15
app.get('/change', cors(), (req, res) => {
    const {table, id, value} = req.query;
    const CAHNGE_GET_QUERY = `UPDATE ${table} SET product_price=product_price*(1+${value}/100) WHERE id=${id}`;

    db.query(CAHNGE_GET_QUERY, (err, results) => {
        if (err) return res.send(err)
        else return res.send(`price changed to UP ${value} %`)
    })
})

//----GET VALUES ORDERS----// example http://localhost:4000/orders/values
app.get('/orders/values', cors(), (req, res) => {
    const ORDERS_VALUES_QUERY = `SELECT products.product_name, orders.order_total_unit * products.product_price AS total_price, (orders.order_total_unit * products.product_price) * 1.2 AS to_pay FROM products INNER JOIN orders ON orders.order_product_id = products.id`;

    db.query(ORDERS_VALUES_QUERY, (err, results) => {
        if (err) return res.send(err)
        else return res.send(results)
    })
})

//----GET ORDERS FOR DATE & MANUFAC----// example http://localhost:4000/orders/total-for-date?date=%272017-06-15%27
app.get('/orders/total-for-date', cors(), (req, res) => {
    const {date} = req.query
    const ORDERS_MANUF_DATE_QUERY = `SELECT manufacturer.manufacturer_name, COUNT(orders.order_product_id) as total_count , orders.order_export_date FROM products INNER JOIN manufacturer ON manufacturer.id = products.product_manufacturer_id INNER JOIN orders ON orders.order_product_id = products.id GROUP BY manufacturer.manufacturer_name, orders.order_export_date HAVING orders.order_export_date = DATE(${date})`;

    db.query(ORDERS_MANUF_DATE_QUERY, (err, results) => {
        if (err) return res.send(err)
        else return res.send(results)
    })
})
 
//----GET (EMPTY ORDERS) PRODUCTS----// example
app.get('/orders/empty', cors(), (req, res) => {
    const ORDERS_EMPTY_QUERY = `SELECT products.product_name, COUNT(orders.order_product_id) AS total FROM products LEFT JOIN orders ON orders.order_product_id = products.id GROUP BY products.product_name HAVING total = 0`;

    db.query(ORDERS_EMPTY_QUERY, (err, results) => {
        if (err) return res.send(err)
        else return res.send(results)
    })
})
 
//---REPORTS---// example 
app.get('/orders/report', cors(), (req, res) => {
    const ORDERS_REPORT_QUERY = `SELECT products.product_name, COUNT(orders.order_product_id) AS total_count_orders, SUM((orders.order_total_unit * products.product_price) * 1.2 ) AS total_price FROM products INNER JOIN orders ON orders.order_product_id = products.id GROUP BY products.product_name`;

    db.query(ORDERS_REPORT_QUERY, (err, results) => {
        if (err) return res.send(err)
        else return res.send(results)
    })
})

app.listen('4000', () => {
    console.log('server listenong on port 4000')
})   