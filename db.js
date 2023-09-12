const mongoose= require('mongoose');
// require('dotenv').config()
//connection
var conn  = mongoose.createConnection('mongodb+srv://nil006:12345@cluster0.hlb33vz.mongodb.net/');
module.exports= {
conn: conn
}

