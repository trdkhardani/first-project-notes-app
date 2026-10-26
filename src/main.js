import './styles/main.css'

import './scripts/components/app-bar.js';
import './scripts/components/note-form.js';
import './scripts/components/note-item.js';

import notesData from './data/notes.js';
import customEvents from './scripts/custom-events.js';

const notesList = document.querySelector('#notes-list');

function renderNotes(noteData) {
  notesList.innerHTML = '';
  noteData.forEach((note) => {
    const noteItem = document.createElement('note-item');
    noteItem.note = note;
    notesList.append(noteItem);
  });
}

renderNotes(notesData);

document.addEventListener(customEvents.NOTE_SUBMIT_EVENT, () => {
  renderNotes(notesData);

  const submissionAlert = document.getElementById("submission-alert");
  submissionAlert.hidden = false
});
