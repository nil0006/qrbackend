const mongoose = require("mongoose");
const conn = require("./db").conn;
const Schema = new mongoose.Schema({
    "assetId": Number,
    "stickerId": String,
    
});
module.exports = conn.model("assets", Schema);
