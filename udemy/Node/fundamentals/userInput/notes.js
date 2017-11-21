const fs = require('fs');

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (err) {
    return [];
  }
}

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));  
}

// Add a new, non-duplicate titled note and return it. In the case of a duplicate, returns undefined
const addNote = (title, body) => {
  const notes = fetchNotes();
  const newNote = { title, body };

  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(newNote);
    saveNotes(notes);
    return newNote;
  }
}

const getAll = () => {
  console.log('Listing all notes');
}

const getNote = (title) => {
  console.log(`Displaying note with title: ${title}`);
}

// Remove a note with the given title and return if the operation resulted in a change to the notes
const removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
};
