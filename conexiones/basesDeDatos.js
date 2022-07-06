var mysql = require('mysql2');

let velaisa = {
  host     : 'localhost',
  port     : '3307',
  user     : 'root',
  password : 'root',
  database:  'VELAISA',
  multipleStatements: true
};

var poolCluster = mysql.createPoolCluster();
poolCluster.add('velaisa', velaisa);


module.exports = poolCluster;