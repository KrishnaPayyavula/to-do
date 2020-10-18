const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Requiring an environmental variables
require("dotenv").config();


// Tasks Router and DAO configuration
const tasksRouter = require("./routes/tasksRouter");
const tasksDAO = require("./dao/tasksDAO");


const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

app.use("/api/tasks", tasksRouter);

const MongoClient = require("mongodb").MongoClient;

const PORT = process.env.PORT;

MongoClient.connect(
    process.env.URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
        if (err) {
            console.log("Server is running on " + PORT + " But Could'nt make connection with the DB");
            app.listen(PORT);
        } else {
            console.log("Connected successfully to server", PORT);
            console.log("Server is running on " + PORT + " && Made a connection with the DB");
            tasksDAO.injectDB(client);
            app.listen(PORT);
        }
    }
);
