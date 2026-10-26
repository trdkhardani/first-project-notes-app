import './styles/main.css'

import './scripts/components/app-bar.js';
import './scripts/components/note-form.js';
import './scripts/components/note-item.js';

// import notesData from './data/notes.js';
import { deleteNote, getActiveNotes } from './scripts/api/notes-api.js';
import customEvents from './scripts/custom-events.js';

const notesList = document.querySelector('#notes-list');

function renderNotes(noteData) {
  notesList.innerHTML = '';
  noteData.forEach((note) => {
    const noteItem = document.createElement('note-item');
    noteItem.note = note;
    notesList.append(noteItem);
    console.log(noteItem);
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-note-btn';
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', async () => {
      await deleteNote(note.id);
      document.dispatchEvent(new CustomEvent(customEvents.NOTE_DELETE_EVENT));
    });
    const noteItemArticle = noteItem.children[0];
    noteItemArticle.append(deleteButton);
  });
}
const fetchNotesApi = await getActiveNotes();
console.log(fetchNotesApi.data);
renderNotes(fetchNotesApi.data);

// const deleteNoteButtons = document.querySelectorAll(".delete-note-btn");

// // if ()
// deleteNoteButtons.forEach((deleteBtn) => {
//   deleteBtn.addEventListener('click', async () => {
//     await deleteNote(deleteBtn.getAttribute('data-note-id'));

//     const fetchNotesApi = await getActiveNotes();
//     renderNotes(fetchNotesApi.data);
//   });
// });

document.addEventListener(customEvents.NOTE_SUBMIT_EVENT, async () => {
  const fetchNotesApi = await getActiveNotes();
  renderNotes(fetchNotesApi.data);

  const submissionAlert = document.getElementById("submission-alert");
  submissionAlert.hidden = false
});

document.addEventListener(customEvents.NOTE_DELETE_EVENT, async () => {
  const fetchNotesApi = await getActiveNotes();
  renderNotes(fetchNotesApi.data);
});
