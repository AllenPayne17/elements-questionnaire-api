const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a question option
const OptionSchema = new Schema({
  optionText: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

// Define the schema for a question
const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [OptionSchema],
});

// Define the schema for an element in the periodic table with embedded questionnaire
const ElementSchema = new Schema({
  symbol: { type: String, required: true },
  questionnaire: [QuestionSchema],
});

// Create the model from the schema
const Element = mongoose.model('Element', ElementSchema);

module.exports = { Element };