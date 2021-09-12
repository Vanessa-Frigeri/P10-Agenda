const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Gui#19082017',
    database: 'agenda'
});

module.exports = con;