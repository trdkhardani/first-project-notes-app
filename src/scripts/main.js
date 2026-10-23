import notesData from '../data/notes.js';
import customEvents from './custom-events.js';
import './components/app-bar.js';
import './components/note-form.js';
import './components/note-item.js';

const notesList = document.querySelector('#notes-list');
const notesCount = document.querySelector('#notes-count');

function renderNotes(noteData) {
  notesList.innerHTML = '';
  noteData.forEach((note) => {
    const noteItem = document.createElement('note-item');
    noteItem.note = note;
    notesList.append(noteItem);
  });
  notesCount.textContent = `${noteData.length} catatan`;
}

// TODO: Setelah data dummy dimasukkan, fungsi ini akan menampilkan seluruh catatan.
renderNotes(notesData);
document.addEventListener(customEvents.NOTE_SUBMIT_EVENT, () => {
  renderNotes(notesData);
  const submissionAlert = document.createElement('p');
  submissionAlert.style.color = 'green';
  submissionAlert.innerText = 'Note berhasil ditambahkan!';
  const noteForm = document.querySelector('form#note-form');
  noteForm.append(submissionAlert);

})
// TODO: Dengarkan CustomEvent dari <note-form>, lalu tambahkan catatan baru ke state.
