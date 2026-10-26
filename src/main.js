import './styles/main.css'

import $ from 'jquery';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

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
      toastr.info('Deleting note...')
      await deleteNote(note.id);
      document.dispatchEvent(new CustomEvent(customEvents.NOTE_DELETE_EVENT));
    });
    const noteItemArticle = noteItem.children[0];
    noteItemArticle.append(deleteButton);
  });
}

const fetchNotesApi = await getActiveNotes();
renderNotes(fetchNotesApi.data);

document.addEventListener(customEvents.NOTE_SUBMIT_EVENT, async () => {
  const fetchNotesApi = await getActiveNotes();
  renderNotes(fetchNotesApi.data);

  // toastr.clear();
  toastr.success('Note saved successfully!');
});

document.addEventListener(customEvents.NOTE_DELETE_EVENT, async () => {
  const fetchNotesApi = await getActiveNotes();
  renderNotes(fetchNotesApi.data);
  // toastr.clear();
  toastr.success('Note deleted successfully!');
});
