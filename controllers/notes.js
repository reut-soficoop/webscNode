const noteModel = require('../models/notes')

async function getAllNotes() {
  try {
    return await noteModel.find()
  } catch (error) {
    console.log('cannot get notes', error)
    throw new Error('cannot get notes')
  }
}

async function getNoteById(noteId) {
  try {
    return await noteModel.findById(noteId)
  } catch (error) {
    console.log('cannot getNoteById', error)
    throw new Error('cannot getNoteById')
  }
}

async function addNote(newNote) {
  const note = new noteModel(newNote)
  try {
    await note.save()
    return await getAllNotes()
  } catch (error) {
    console.log('cannot add note', error)
    throw new Error('cannot add note')
  }
}

// function updateNote(noteId, note) {
//   const noteIndex = notes.findIndex(note => note.id == noteId)
//   if (noteIndex < 0) {
//     return null
//   }
//   notes[noteIndex] = {
//     id: noteId,
//     ...note
//   }
//   return notes
// }

function deleteNote(noteId) { 
  return noteModel.findByIdAndDelete(noteId)
  .then(result => getAllNotes())
  .catch(error => {
    console.log('could not bring note!', error)
    return error
  })
}

function searchNote(params) {
  const query = { $or: [
    {title: new RegExp(params.word + '+')}, {body: new RegExp(params.word + '+')}
  ], isArchived: params.isArchived === 'true' };
  return noteModel.find(query)
    .then(notes => notes)
    .catch(error => {
      console.log('could not bring all notes!', error)
      return error
    })
}

module.exports = {
  getAllNotes,
  getNoteById,
  addNote,
  // updateNote,
  deleteNote,
  searchNote
}