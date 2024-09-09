const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'your_database'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// API endpoint for signup
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'User signed up successfully!' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
