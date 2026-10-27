import $ from "jquery";
import toastr from "toastr";
import customEvents from '../custom-events';
import { deleteNote } from '../api/notes-api';

function deleteNoteButton(noteItem, noteId) {
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-note-btn";
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", async () => {
    try {
      toastr.info("Deleting note...");
      await deleteNote(noteId);
      noteItem.remove();
      document.dispatchEvent(new CustomEvent(customEvents.NOTE_DELETE_EVENT));
    } catch (err) {
      toastr.clear();
      toastr.error(err);
    }
  });

  return deleteButton;
}

export default deleteNoteButton;
