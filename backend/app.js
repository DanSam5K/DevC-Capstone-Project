const express = require('express');
const bodyParser = require('body-Parser');
const User = require('./models/user');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post('/api/auth/signIn', (req, res, next) => {
  const user = new User({
    email​ :​ req.body.email,    
    password :​req.body.password, 
  });
  user.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.post('/api/auth/create-user', (req, res, next) => {
  const user = new User({
    firstName​ :req.body.firstName, ​ 
    lastName​ : req.body.lastName,​ 
    email​ :​ req.body.email,    
    password :​req.body.password, 
    gender​ :​req.body.gender,   ​ 
    jobRole​ : ​req.body.jobRole,
    department​ : req.body.department,   ​ 
    address​ :req.body.address,
  });
  user.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});









module.exports = app; 