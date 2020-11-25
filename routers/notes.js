const express = require('express')
const router = express.Router()
const {getAllNotes, getNoteById, addNote, deleteNote, searchNote} = require('../controllers/notes')
const auth = require('../middlewares/auth')

/** gets all the notes */
router.get('/', auth, async (req, res) => {
  try {
    const notes = await getAllNotes()
    res.json(notes)
  } catch (error) {
    res.status(404)
  }
})
/** search notes */
router.get('/search', auth, (req, res) => {
  searchNote(req.query)
  .then(notes => res.json(notes))
  .catch(error => res.status(404))
})
/** gets note by id */
router.get('/:id', auth,(req, res) => {
  getNoteById(req.params.id)
    .then(note => res.json(note))
    .catch(error => res.status(404))
})
/** add new note */
router.post('/',auth, (req, res) => {
  addNote(req.body)
  .then(notes => res.json(notes))
  .catch(error => res.status(404).send(error))
})
/** update note by id */
router.put('/:id', auth, (req, res) => {
  const notes = updateNote(req.params.id, req.body)
  if (notes) {
    res.json(notes)
  } else {
    res.status(404).send(`note with id: ${req.params.id} not found`)
  }
})
/** delete note by id */
router.delete('/:id', auth, (req, res) => {
  deleteNote(req.params.id)
    .then(notes => res.json(notes))
    .catch(error => res.status(404))
})

module.exports = router