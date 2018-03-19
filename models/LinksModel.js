const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  link: String
});

mongoose.model('links', userSchema);
