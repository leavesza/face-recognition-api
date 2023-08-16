const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'ubuntu',
    password: 'password',
    database: 'smartbrain'
  }
});

const app = express();

// CORS configuration to allow both HTTP and HTTPS origins
const corsOptions = {
  origin: [
    'http://facerecognitionapp-8cad9a071f9a.herokuapp.com',
    'https://facerecognitionapp-8cad9a071f9a.herokuapp.com',
    'http://localhost:3000'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('it is working');
});

app.post('/signin', signin.handleSignIn(db, bcrypt));

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
