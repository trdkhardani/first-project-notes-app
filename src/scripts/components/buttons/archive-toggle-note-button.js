import toastr from 'toastr';
import customEvents from '../../custom-events.js';
import { archiveNote, unarchiveNote } from '../../api/notes-api.js';

class ArchiveToggleNoteButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const isArchived = this.getAttribute('archived') === 'true';
    this.innerHTML = `<button type="button" class="note-action-btn archive-toggle-note-btn">${isArchived ? 'Unarchive' : 'Archive'}</button>`;
    this.querySelector('button').addEventListener('click', () =>
      this.toggleArchive()
    );
  }

  async toggleArchive() {
    const isArchived = this.getAttribute('archived') === 'true';

    try {
      toastr.info(`${isArchived ? 'Unarchiving' : 'Archiving'} note...`);
      isArchived
        ? await unarchiveNote(this.getAttribute('note-id'))
        : await archiveNote(this.getAttribute('note-id'));

      this.closest('note-item').remove();
      document.dispatchEvent(
        new CustomEvent(
          isArchived
            ? customEvents.NOTE_UNARCHIVE_EVENT
            : customEvents.NOTE_ARCHIVE_EVENT
        )
      );
    } catch (err) {
      toastr.clear();
      toastr.error(err);
    }
  }
}

customElements.define('archive-toggle-note-button', ArchiveToggleNoteButton);
