const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
const command = argv._[0];
console.log(`Command: ${command}`);

switch (command) {
  case 'add':
    const result = notes.addNote(argv.title, argv.body);
    if (result) {
      console.log('Successfully added new note');
      console.log('--');
      console.log(`Title: ${result.title}`);
      return console.log(`Body: ${result.body}`);
    } else {
      return console.log(`A note with the title: ${argv.title} already exists, try again with a unique title`);
    }
  case 'list':
    return notes.getAll();
  case 'read':
    return notes.getNote(argv.title);
  case 'remove':
    const success = notes.removeNote(argv.title);
    const message = success ? `Note ${argv.title} removed` : `Note ${argv.title} not found`;
    return console.log(message);
  default:
    return console.log('Command not recognized');
}

