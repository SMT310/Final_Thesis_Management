require('dotenv').config();

const express = require('express');
const cors = require('cors');
const route = require('./routes');

const db = require('./configs/db');
const path = require('path');
const app = express();
const port = process.env.PORT || 8888;

db.connect();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use(express.json());


route(app);

app.listen(port, () => {
    console.log(`Listening to port: http://localhost:${port}`)
});