const express = require('express');

const app = express();

//testing and ensuring express work unit test for endpoints

app.use((req, res, next) => {
    console.log('Request received!');
    next();
  });
  
  app.use((req, res, next) => {
    res.status(201);
    next();
  });
  
  app.use((req, res, next) => {
    res.json({ message: 'Your request was successful!' });
    next();
  });
  
  app.use((req, res, next) => {
    console.log('Response sent successfully!');
  });

module.exports = app;