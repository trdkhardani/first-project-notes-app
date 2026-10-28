import $ from "jquery";
import toastr from "toastr";
import customEvents from '../custom-events';
import { archiveNote, unarchiveNote } from '../api/notes-api';

function archiveToggleNoteButton(noteItem, noteId, isNoteArchived) {
  const archiveToggleButton = document.createElement("button");
  archiveToggleButton.type = "button";
  archiveToggleButton.className = "archive-toggle-note-btn";
  archiveToggleButton.innerText = isNoteArchived ? "Unarchive" : "Archive";
  archiveToggleButton.addEventListener("click", async () => {
    try {
      toastr.info(`${isNoteArchived ? 'Unarchiving' : 'Archiving'} note...`);
      isNoteArchived ? await unarchiveNote(noteId) : await archiveNote(noteId);

      noteItem.remove();
      document.dispatchEvent(new CustomEvent(isNoteArchived ? customEvents.NOTE_UNARCHIVE_EVENT : customEvents.NOTE_ARCHIVE_EVENT));
    } catch (err) {
      toastr.clear();
      toastr.error(err);
    }
  });

  return archiveToggleButton;
}

export default archiveToggleNoteButton;
