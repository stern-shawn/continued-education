const fs = require('fs');

const addNote = (title, body) => {
  let notes;
  const newNote = { title, body };

  try {
    const notesString = fs.readFileSync('notes-data.json');
    notes = JSON.parse(notesString);
  } catch (err) {
    notes = [];
  }

  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(newNote);
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
  } else {
    console.log(`There is already a note with the title: ${title}, please retry with a different title`);
  }
}

const getAll = () => {
  console.log('Listing all notes');
}

const getNote = (title) => {
  console.log(`Displaying note with title: ${title}`);
}

const removeNote = (title) => {
  console.log(`Removing note with title: ${title}`);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
};
