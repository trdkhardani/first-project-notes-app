import "./styles/main.css";

import $ from "jquery";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./scripts/components/app-bar.js";
import "./scripts/components/loading-indicator.js";
import "./scripts/components/note-form.js";
import "./scripts/components/note-item.js";

import { getActiveNotes } from "./scripts/api/notes-api.js";
import customEvents from "./scripts/custom-events.js";
import deleteNoteButton from './scripts/ui-elements/delete-button.js';
import archiveToggleNoteButton from './scripts/ui-elements/archive-toggle-button.js';

const notesList = document.querySelector("#notes-list");
const loadingElm = document.createElement("loading-indicator");

notesList.append(loadingElm);

function renderNotes(noteData) {
  const emptyNoteIndicator = document.getElementById("empty-note-indicator");

  if (noteData.length === 0) {
    emptyNoteIndicator.hidden = false;
    loadingElm.remove();
  }

  if (emptyNoteIndicator && noteData.length > 0) {
    emptyNoteIndicator.hidden = true;
  }
  // // delete elements first
  // const noteItems = document.querySelectorAll("note-item");
  // if (noteItems.length > 0) {
  //   noteItems.forEach((noteItem) => {
  //     noteItem.remove();
  //   });
  // }

  // // then render the elements again
  noteData.forEach((note) => {
    const noteItem = document.createElement("note-item");
    noteItem.note = note;
    notesList.append(noteItem);

    const deleteButton = deleteNoteButton(noteItem, note.id);
    const archiveToggleButton = archiveToggleNoteButton(noteItem, note.id, note.archived);

    const noteItemArticle = noteItem.children[0];
    const noteActionButtons = document.createElement('div');
    noteActionButtons.className = 'note-action-button-group';
    noteActionButtons.append(deleteButton, archiveToggleButton);
    noteItemArticle.append(noteActionButtons);
  });

  loadingElm.remove();
}

try {
  const fetchNotesApi = await getActiveNotes();
  renderNotes(fetchNotesApi.data);
} catch (err) {
  loadingElm.remove();
  toastr.clear();
  toastr.error(`Error fetching notes: ${err}`);
}

document.addEventListener(customEvents.NOTE_SUBMIT_EVENT, () => {
  const emptyNoteIndicator = document.getElementById("empty-note-indicator");
  emptyNoteIndicator.hidden = true;

  toastr.clear();
  toastr.success("Note saved successfully!");
});

document.addEventListener(customEvents.NOTE_ARCHIVE_EVENT, () => {
  const emptyNoteIndicator = document.getElementById("empty-note-indicator");
  if (document.querySelectorAll("note-item").length === 0)
    emptyNoteIndicator.hidden = false;

  toastr.clear();
  toastr.success("Note archived successfully!");
});

document.addEventListener(customEvents.NOTE_UNARCHIVE_EVENT, () => {
  const emptyNoteIndicator = document.getElementById("empty-note-indicator");
  if (document.querySelectorAll("note-item").length === 0)
    emptyNoteIndicator.hidden = false;

  toastr.clear();
  toastr.success("Note unarchived successfully!");
});

document.addEventListener(customEvents.NOTE_DELETE_EVENT, () => {
  const emptyNoteIndicator = document.getElementById("empty-note-indicator");
  if (document.querySelectorAll("note-item").length === 0)
    emptyNoteIndicator.hidden = false;

  toastr.clear();
  toastr.success("Note deleted successfully!");
});
