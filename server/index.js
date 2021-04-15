const express = require('express');
const fs = require('fs');
const writer = require('./utils/writer.js');
const cart = require('./services/cart.js');

const server = express();
server.use(express.json());

server.get('/catalog', (req, res) => {
  fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
    if (!err) {
      res.json(JSON.parse(data));
    }
  });
});

server.get('/cart', (req, res) => {
  fs.readFile('./server/db/cart.json', 'utf-8', (err, data) => {
    if (!err) {
      res.json(JSON.parse(data));
    }
  });
});

server.post('/cart', (req, res) => {
  fs.readFile('./server/db/cart.json', 'utf-8', (err, data) => {
    if (!err) {
      let newCart = cart.add(JSON.parse(data), req.body);
      writer('./server/db/cart.json', newCart)
        .then(status => {
          if (status) {
            res.json({status});
          } else {
            res.sendStatus(500);
          }
        })
    }
  });
});

server.put('/cart/:id', (req, res) => {
  fs.readFile('./server/db/cart.json', 'utf-8', (err, data) => {
    if (!err) {
      console.log(req.body.value, req.params.id);
      let newCart = cart.change(JSON.parse(data), req.params.id, req.body.value);
      writer('./server/db/cart.json', newCart)
        .then(status => {
          if (status) {
            res.json({status});
          } else {
            res.sendStatus(500);
          }
        })
    }
  });
});

server.listen(3000, () => {
  console.log('SERVER AT PORT 3000');
});