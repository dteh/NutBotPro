var express = require("express")
const sql = require("sqlite3")
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))

let db = new sqlite3.Database('./nut.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the nut database.');
  });

app.post("/nut", function(req, res) {
    console.log(req)
    var id = body.user_id
    var nutCount = incrementNut(id)
    res.send("WOW, " + body.user_name + " has nutted " + str(nutCount) + " times!")
})

function incrementNut(user) {
    db.get("FROM NUT SELECT * WHERE id=" + user, (err, row) => {
        if (err != null) {
            if (row != undefined) {
                var nutCount = row.count
                db.update("UPDATE NUT SELECT count = " + str(nutCount + 1) + " WHERE id = " + user, () => {
                    return nutCount + 1
                })
            } else {
                db.exec("INSERT INTO NUT (id, count) VALUES (" + user + ", 1)", () => {
                    return 1
                })
            }
        }
    })
}

app.listen()