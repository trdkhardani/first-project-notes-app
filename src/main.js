import "./styles/main.css";

import $ from "jquery";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./scripts/components/app-bar.js";
import "./scripts/components/buttons/archive-toggle-note-button.js";
import "./scripts/components/buttons/delete-note-button.js";
import "./scripts/components/loading-indicator.js";
import "./scripts/components/note-form.js";
import "./scripts/components/note-item.js";
import "./scripts/components/status-dropdown.js";

import { getActiveNotes, getArchivedNotes } from "./scripts/api/notes-api.js";
import customEvents from "./scripts/custom-events.js";

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

  // delete the current note items (active/archived) first
  const noteItems = document.querySelectorAll("note-item");
  if (noteItems.length > 0) {
    noteItems.forEach((noteItem) => {
      noteItem.remove();
    });
  }

  noteData.forEach((note) => {
    const noteItem = document.createElement("note-item");
    noteItem.note = note;
    notesList.append(noteItem);

    const deleteButton = document.createElement("delete-note-button");
    deleteButton.setAttribute("note-id", note.id);
    const archiveToggleButton = document.createElement(
      "archive-toggle-note-button",
    );
    archiveToggleButton.setAttribute("note-id", note.id);
    archiveToggleButton.setAttribute("archived", note.archived);

    const noteItemArticle = noteItem.children[0];
    const noteActionButtons = document.createElement("div");
    noteActionButtons.className = "note-action-button-group";
    noteActionButtons.append(deleteButton, archiveToggleButton);
    noteItemArticle.append(noteActionButtons);
  });

  loadingElm.remove();
}

const statusDropdown = document.getElementById("status-dropdown");
statusDropdown.addEventListener("change", async (event) => {
  try {
    const selectedOption = event.target.value;
    console.log("selectedOption");
    console.log(selectedOption);

    const notesHeading = document.getElementById("notes-heading");

    notesList.append(loadingElm);
    if (selectedOption === "active") {
      const fetchActiveNotes = await getActiveNotes();
      renderNotes(fetchActiveNotes.data);
      notesHeading.innerText = "Active Notes";
    } else {
      const fetchArchivedNotes = await getArchivedNotes();
      renderNotes(fetchArchivedNotes.data);
      notesHeading.innerText = "Archived Notes";
    }
  } catch (err) {
    toastr.error(`Error fetching notes: ${err}`);
  } finally {
    loadingElm.remove();
  }
});

try {
  const fetchActiveNotes = await getActiveNotes();
  renderNotes(fetchActiveNotes.data);
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
