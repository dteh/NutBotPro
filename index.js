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
    // console.log(req)
    var id = req.body.user_id
    var nutResponder = returnNutResponse.bind(null, res, req.body.user_name)
    incrementNut(id, nutResponder)
})

function incrementNut(user, callback) {
    db.get("SELECT * FROM NUT WHERE id=\"" + user + "\"", (err, row) => {
        console.log("Got user:", user)
        console.log("row",row)
        console.log("err",err)
        if (err == null) {
            console.log(row)
            if (row != undefined) {
                var nutCount = row.count
                db.run("UPDATE NUT SET count = " + (nutCount + 1).toString() + " WHERE id = \"" + user + "\"", [], (err) => {
                    if (err != null) {
                        console.log(err)
                    } else { 
                        callback(nutCount + 1)
                    }
                })
            } else {
                db.run("INSERT INTO NUT (id, count) VALUES (\"" + user + "\", \"1\")", [], (err) => {
                    if (err != null) {
                        console.log(err)
                    } else {
                        callback(1)                        
                    }
                })
            }
        } else {
            console.log(err)
        }
    })
}

function returnNutResponse(res, username, nutCount) { 
    console.log("returning Nut Response!")
    var response = {
        "text": "NUT ALERT!!!",
        "response_type": "in_channel",
        "attachments": [
            {
                "text":"WOW, " + username + " has JUST nutted! That makes it " + nutCount.toString() + " time(s)!"
            }
        ]
    }
    res.setHeader("Content-Type","application/json")
    res.send(JSON.stringify(response))
}

app.listen(80, ()=> {console.log("Listening on port 80")})