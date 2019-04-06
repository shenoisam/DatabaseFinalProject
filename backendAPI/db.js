/*
 Description: This file creates a sql database object for export throughout the node app

 Class Descriptions borrowed from: https://itnext.io/how-to-share-a-single-database-connection-in-a-node-js-express-js-app-fcad4cbcb1e
*/

var mysql = require('mysql');
var assert = require('assert')



let _db; 

function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(_db);
    }
    var db = mysql.createConnection({
        host : 'databasefinal.cwhn9bu30dlm.us-east-2.rds.amazonaws.com',
        user : 'DatabaseFinal',
        password : 'SuwQRgS5Ua',
        database : 'DatabaseFinal'
     });
     db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
    
     _db = db 
    return callback(_db);
};

function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}

module.exports = {
    getDb, 
    initDb
}