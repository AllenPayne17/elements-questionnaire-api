require('dotenv').config(); // Ensures environment variables are loaded

const { MongoClient } = require('mongodb');

// Use the environment variable for the MongoDB URL
const mongoUrl = process.env.MONGO_URL;

const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('periodicTableElements'); // Change the database name here
    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

module.exports = { connect };