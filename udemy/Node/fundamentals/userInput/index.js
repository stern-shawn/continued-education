const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
const command = argv._[0];
console.log(`Command: ${command}`);

switch (command) {
  case 'add':
    const newNote = notes.addNote(argv.title, argv.body);
    if (newNote) {
      console.log('Successfully added new note');
      return notes.logNote(newNote);
    } else {
      return console.log(`A note with the title: ${argv.title} already exists, try again with a unique title`);
    }
  case 'list':
    const notesList = notes.getAll();
    return notesList.forEach((note) => notes.logNote(note))
  case 'read':
    const note = notes.getNote(argv.title);
    if (note) {
      console.log('Note found');
      return notes.logNote(note);
    } else {
      return console.log('No note found with that title');
    }
  case 'remove':
    const success = notes.removeNote(argv.title);
    const message = success ? `Note ${argv.title} removed` : `Note ${argv.title} not found`;
    return console.log(message);
  default:
    return console.log('Command not recognized');
}

