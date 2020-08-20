const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Company = new Schema ({
  name: { type: String, unique: true, required: true},
  number: { type: String },
  location: { type: String },
  website: { type: String },
  industry: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Company', Company);
