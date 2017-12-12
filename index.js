var express = require("express")
const sqlite3 = require("sqlite3")
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))

var db = new sqlite3.Database('./nut.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the nut database.');
  });

app.post("/nut", function(req, res) {
    console.log(req)
    var id = body.user_id
    var nutCount = incrementNut(id)
    response = {
        "text": "It's 80 degrees right now.",
        "attachments": [
            {
                "text":"WOW, " + body.user_name + " has nutted " + str(nutCount) + " times!"
            }
        ]
    }
    res.setHeader("Content-Type","application/json")
    res.send(JSON.stringify(response))
})

function incrementNut(user) {
    db.get("FROM NUT SELECT * WHERE id=" + user, (err, row) => {
        print("Got user:", user)
        if (err != null) {
            if (row != undefined) {
                var nutCount = row.count
                db.run("UPDATE NUT SELECT count = " + str(nutCount + 1) + " WHERE id = " + user, () => {
                    return nutCount + 1
                })
            } else {
                db.run("INSERT INTO NUT (id, count) VALUES (" + user + ", 1)", () => {
                    return 1
                })
            }
        }
    })
}

app.listen(80, ()=> {console.log("Listening on port 80")})