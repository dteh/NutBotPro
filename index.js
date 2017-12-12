var express = require("express")
const sql = require("sqlite3")
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/nut", function(req, res) {
    console.log(req)
})
