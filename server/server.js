const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = 3000;

const db = require('./database/index');
const postRouter = require('./routes/post-router');
const userRouter = require('./routes/user-router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.use('/api', postRouter, userRouter);

app.listen(port, () => console.log(`App listening on port: ${port}`));