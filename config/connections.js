const { connect, connection} = require ("mongoose");

//connects to database with mongoose

connect("mongodb://127.0.0.1:27017/challenge18");

module.exports = connection;