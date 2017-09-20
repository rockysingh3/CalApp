const mongoose = require('mongoose');

// addAnEvent Schema
var addAnEventSchema = new mongoose.Schema({
	title: String,
	location: String,
	notes: String
});


module.exports = mongoose.model("AddAnEvent", addAnEventSchema);
