var express = require("express")

var app = express()

app.use(express.static(__dirname))

var messages = [
    {name: "Eli", message: "Hello World!"},
    {name: "David", message: "The Avenegers!"}
]

app.get("/messages", (req, res) => {
    res.send(messages)
})

var server = app.listen(3000, function(){
    console.log("listening on port", server.address().port)
})