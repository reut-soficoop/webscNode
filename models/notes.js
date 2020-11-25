const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
    trim: true
  },
  body: {
    type: String,
    required: true,
    lowercase: true
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    min: 1,
    max: 10
  },
  flow: {
    type: String,
    enum: ['TODO', 'DOING', 'DONE'],
    default: 'TODO'
  },
  createdAt: {
    type: Date
  },
  ownerId: {
    type: String
  }
});


module.exports = mongoose.model('Note', NoteSchema);