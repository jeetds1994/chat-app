var express = require("express")

var bodyParser = require("body-parser")

var app = express()

var http = require("http").Server(app)

var io = require("socket.io")(http)

var mongoose = require("mongoose")

app.use(express.static(__dirname))

app.use(bodyParser.json())


app.use(bodyParser.urlencoded({extended: false}))

var dbURL = "mongodb://user:1234@ds129946.mlab.com:29946/learning-node"

var messages = [
    {name: "Eli", message: "Hello World!"},
    {name: "David", message: "The Avenegers!"}
]

app.get("/messages", (req, res) => {
    res.send(messages)
})


app.post("/messages", (req, res) => {
    messages.push(req.body)
    io.emit("message", req.body)
    res.sendStatus(200)
})

io.on("connection", function(socket){
  console.log("user connected")
})

mongoose.connect(dbURL, {useMongoClient: true}, (err) => {
  console.log("mongodb connection", err)
})

var server = http.listen(3000, function(){
    console.log("listening on port", server.address().port)
})
