const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'password',
    database: 'database'
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

app.get('', (req, res) => {
    const query = 'SELECT * FROM transactions';
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
});
app.get('', (req, res) => {
    const query = 'SELECT category, SUM(amount) AS totalSpent FROM transactions GROUP BY category';
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
});

