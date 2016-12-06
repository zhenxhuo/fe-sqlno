// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('publisher', ['publisher']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/publisher', function (req, res) {
  console.log('I received a GET request');

  db.publisher.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/publisher', function (req, res) {
  console.log(req.body);
  db.publisher.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/publisher/:name', function (req, res) {
  var id = req.params.name;
  console.log(id);
  db.publisher.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/publisher/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.publisher.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/publisher/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.publisher.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");