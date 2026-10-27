import $ from "jquery";
import toastr from "toastr";
import { createNewNote } from "../api/notes-api.js";
import customEvents from "../custom-events.js";
import deleteNoteButton from '../ui-elements/delete-button.js';

class NoteForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this._onValidation();
    this.addEventListener("submit", (event) => this._onFormSubmit(event));
  }

  render() {
    this.innerHTML = `
      <section class="form-card" aria-labelledby="form-title">
        <div><h2 id="form-title">Add New Note</h2></div>
        <form id="note-form">
          <div class="field-group"><label for="note-title">Title</label><input id="note-title" name="title" type="text" placeholder="Your title here..." required minlength="3" /><small class="field-message" id="title-message"></small></div>
          <div class="field-group"><label for="note-body">Note</label><textarea id="note-body" name="body" rows="5" placeholder="Your note here..." required minlength="10"></textarea><small class="field-message" id="body-message"></small></div>
          <button type="submit">Save note <span aria-hidden="true">→</span></button>
        </form>
      </section>`;
  }

  _onValidation() {
    const noteTitle = document.getElementById("note-title");
    const noteBody = document.getElementById("note-body");
    noteTitle.addEventListener("blur", (event) => {
      const isValid = event.target.validity.valid;
      const validationMsg = event.target.validationMessage;

      const noteTitleValidationMsgField =
        document.getElementById("title-message");
      if (!isValid && validationMsg) {
        if (event.target.validity.valueMissing)
          noteTitleValidationMsgField.innerText = "Title must be filled.";

        if (event.target.validity.tooShort)
          noteTitleValidationMsgField.innerText =
            "Title is 3 characters minimum.";
      } else {
        noteTitleValidationMsgField.innerText = "";
      }
    });

    noteBody.addEventListener("blur", (event) => {
      const isValid = event.target.validity.valid;
      const validationMsg = event.target.validationMessage;

      const noteBodyValidationMsgField =
        document.getElementById("body-message");
      if (!isValid && validationMsg) {
        if (event.target.validity.valueMissing)
          noteBodyValidationMsgField.innerText = "Note must be filled.";

        if (event.target.validity.tooShort)
          noteBodyValidationMsgField.innerText =
            "Note is 10 characters minimum.";
      } else {
        noteBodyValidationMsgField.innerText = "";
      }
    });

    return;
  }

  async _onFormSubmit(event) {
    try {
      event.preventDefault();

      const noteTitle = document.getElementById("note-title");
      const noteBody = document.getElementById("note-body");

      toastr.info("Saving note...");
      const newNote = await createNewNote(noteTitle.value, noteBody.value);

      const notesList = document.querySelector("#notes-list");
      const noteItem = document.createElement('note-item');
      noteItem.note = newNote.data;
      notesList.append(noteItem);

      const deleteButton = deleteNoteButton(noteItem, newNote.data.id);
      const noteItemArticle = noteItem.children[0];
      noteItemArticle.append(deleteButton);

      noteTitle.value = "";
      noteBody.value = "";

      document.dispatchEvent(new CustomEvent(customEvents.NOTE_SUBMIT_EVENT));
    } catch (err) {
      toastr.clear();
      toastr.error(err);
    }
  }
}

customElements.define("note-form", NoteForm);
