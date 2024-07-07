const express = require('express');
const { connect } = require('./db');

const app = express();
app.use(express.json());

connect().then(db => {
  // Example: Define a GET route that fetches data from a collection
  app.get('/api/data', async (req, res) => {
    try {
      const data = await db.collection('myCollection').find({}).toArray(); // Replace 'myCollection' with your collection name
      res.json(data);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });

  // get all elements
  app.get('/api/elements', async (req, res) => {
    try {
      const elements = await db.collection('Elements').find({}).toArray();
      res.json(elements);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });


  app.get('/api/element/:symbol', async (req, res) => {
    try {
      const symbol = req.params.symbol; // Corrected from req.params.element to req.params.symbol
      const element = await db.collection('Elements').findOne({ symbol: symbol }); // Assuming your elements are stored in 'myCollection'
      if (element) {
        res.json(element);
      } else {
        res.status(404).send('Element not found');
      }
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Failed to make database connection', err));
