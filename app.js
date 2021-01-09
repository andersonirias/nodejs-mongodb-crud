const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;

const APP_PORT = 8080;
const APP_HOST = 'localhost';
const MONGO_HOST = 'mongodb://localhost:27017/';
const MONGO_DB = 'app';
const MONGO_COLLECTION = 'test';

const app = express();
app.use(bodyParser.json())

app.post('/create', (req, res) => {
  mongoClient.connect(MONGO_HOST, (err, client) => {
    if (err) throw err
    const database = client.db(MONGO_DB);
    database.collection(MONGO_COLLECTION).insertOne(req.body, (err) => {
      if (err) throw err
      res.status(201);
      res.send();
    });
  });
});

app.get('/read', (req, res) => {
  mongoClient.connect(MONGO_HOST, (err, client) => {
    if (err) throw err
    const database = client.db(MONGO_DB);
    database.collection(MONGO_COLLECTION).find({ cod: req.query.cod }).toArray((err, result) => {
      if (err) throw err
      res.send(result);
    });
  });
});

app.put('/update', (req, res) => {
  mongoClient.connect(MONGO_HOST, (err, client) => {
    if (err) throw err
    const database = client.db(MONGO_DB);
    database.collection(MONGO_COLLECTION).updateOne({ cod: req.query.cod }, { $set: req.query }, (err) => {
      if (err) throw err
      res.send();
    });
  });
});

app.delete('/delete', (req, res) => {
  mongoClient.connect(MONGO_HOST, (err, client) => {
    if (err) throw err
    const database = client.db(MONGO_DB);
    database.collection(MONGO_COLLECTION).deleteOne({ cod: req.query.cod }, (err) => {
      if (err) throw err
      res.send();
    });
  });
});

app.listen(APP_PORT, APP_HOST);
