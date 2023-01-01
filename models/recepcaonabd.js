var mysql = require('mysql');
var conn2 = mysql.createPool({
    host: "192.168.30.21",
    user: "server",
    password: "123456789",
    database : 'votenow',
    port: '3306'
});

/*
var mysql = require('mysql');
var conn = mysql.createPool({
    host: "192.168.30.11",
    user: "garcia",
    password: "garcia",
    database : 'tour4us',
    port: '3308'
});
*/


module.exports = conn2;


