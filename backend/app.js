const express = require('express');
const bodyParser = require('body-Parser');
const User = require('./models/user');
const userRoutes = require('./routes/user');
const gifRoutes = require('./routes/gif');
const articleRoutes = require('./routes/article');
const gifRoutes = require('./routes/gif');
const userRoutes = require('./routes/user');

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

app.use('api/auth', userRoutes);
app.use('api/auth', gifRoutes);
app.use('api/auth/articles', articleRoutes);

module.exports = app; 