const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const enquiryRoute = require('./routes/enquiry');
const stationRoute = require('./routes/station');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use('/api/v1', enquiryRoute);
app.use('/api/v1', stationRoute);

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
