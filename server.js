const express = require('express');
const { connect } = require('./db');

const app = express();
app.use(express.json());

connect().then(db => {

  // test display in browser
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });


  // get all data elements questionnaires
  app.get('/api/elements', async (req, res) => {
    try {
      const elements = await db.collection('Elements').find({}).toArray();
      res.json(elements);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });


  // get a 10 random element questionnaire by symbol for example /api/element/random/10/Fe
  app.get('/api/element/random/:count/:symbol', async (req, res) => {
    try {
      const { count, symbol } = req.params;
      const elements = await db.collection('Elements').aggregate([
        { $match: { symbol: symbol } },
        { $unwind: '$questionnaire' },
        { $sample: { size: parseInt(count) } },
        { $group: { _id: '$_id', questionnaire: { $push: '$questionnaire' } } },
      ]).toArray();
      res.json(elements);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });

  // get all data elements questionnaires by symbol for example /api/element/Fe
  app.get('/api/element/:symbol', async (req, res) => {
    try {
      const { symbol } = req.params;
      const elements = await db.collection('Elements').find({ symbol: symbol }).toArray();
      res.json(elements);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });

  // insert data elements questionnaires
  app.post('/api/element', async (req, res) => {
    try {
      const elements = req.body;
      const result = await db.collection('Elements').insertMany(elements);
      res.json(result);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Failed to make database connection', err));
