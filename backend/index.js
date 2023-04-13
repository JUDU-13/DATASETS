const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const userRoute = require('./routes/user');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', userRoute);
app.get('/', (req, res) => {
  res.send("My MongoDB Server - ATN");
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message,
    data
  });
});

const uri = process.env.ATLAS_URI;
mongoose
  .connect(
    uri
  )
  .then(res => {
    app.listen(port);
    console.log('Connection established!');
	
  })
  .catch(err => console.log('Error in establishing connection!'));
