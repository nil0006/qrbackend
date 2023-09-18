const mongoose = require("mongoose");
const conn = require("./db").conn;
const Schema = new mongoose.Schema({
    "assetId": Number,
    "stickerId": String,
    "isActive": Boolean,
    "allocatedRoomId": String,
    "currentRoomId": String,
    "allocatedUserId": String,
    "assetModelName": String,
    "assetModelId": String,
    "buildingId": String,
    "allocated": Boolean,
});
module.exports = conn.model("assets", Schema);
