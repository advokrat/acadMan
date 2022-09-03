const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

const DBConnection = require('./dao/database');

const notesRouter = require('./routers/notesRouter.js');
const credRouter = require('./routers/credRouter.js');
const courseRouter = require('./routers/courseRouter.js');
const calenderRouter = require('./routers/calenderRouter.js');
const coursePlannerRouter = require('./routers/coursePlannerRouter.js')
const { authorization } = require("./api/login.js");

const app = express();
const httpServer = http.createServer({maxHeaderSize: 16384}, app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

app.get("/hello", authorization, (req, res) => {
    res.send("Hello " + req.username);
});

app.use('/notes', notesRouter);
app.use('/', credRouter);
app.use('/course', courseRouter);
app.use('/calendar', calenderRouter);
app.use('/coursePlanner', coursePlannerRouter);

if(process.env.STATUS == "production") DBConnection.dial();


const serverInstance = httpServer.listen(PORT, () => {
    console.log(`server is listing on port ${PORT}`);
});

module.exports = { app, serverInstance };
