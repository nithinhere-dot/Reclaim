const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  wasteType: String,
  description: String,
  location: String,
  status: { type: String, default: 'open' }, // open, accepted, completed
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
