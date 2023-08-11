const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    database: 'saboroso',
    password: 'password',
    multipleStatements: true
  });

// retornar para o arquivo que fez o require dessa db 
  module.exports = connection;
