import toastr from 'toastr';
import customEvents from '../../custom-events.js';
import { deleteNote } from '../../api/notes-api.js';

class DeleteNoteButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML =
      '<button type="button" class="note-action-btn delete-note-btn">Delete</button>';
    this.querySelector('button').addEventListener('click', () =>
      this.deleteNote()
    );
  }

  async deleteNote() {
    try {
      toastr.info('Deleting note...');
      await deleteNote(this.getAttribute('note-id'));
      this.closest('note-item').remove();
      document.dispatchEvent(new CustomEvent(customEvents.NOTE_DELETE_EVENT));
    } catch (err) {
      toastr.clear();
      toastr.error(err);
    }
  }
}

customElements.define('delete-note-button', DeleteNoteButton);
