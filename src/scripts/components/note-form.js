import notesData from "../../data/notes.js";
import { createNewNote } from '../api/notes-api.js';
import customEvents from "../custom-events.js";

class NoteForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this._onValidation();
    this._onSubmission();
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
          <p id="submission-alert" style="color: var(--success);" hidden>Note successfully added!</p>
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

  _onSubmission() {
    const noteTitle = document.getElementById("note-title");
    const noteBody = document.getElementById("note-body");

    const submissionAlert = document.getElementById("submission-alert");

    noteTitle.addEventListener("focus", () => {
      submissionAlert.hidden = true;
    });

    noteBody.addEventListener("focus", () => {
      submissionAlert.hidden = true;
    });
  }

  async _onFormSubmit(event) {
    event.preventDefault();

    const noteTitle = document.getElementById("note-title");
    const noteBody = document.getElementById("note-body");

    const createNote = await createNewNote(noteTitle.value, noteBody.value);
    console.log(createNote);

    noteTitle.value = "";
    noteBody.value = "";

    document.dispatchEvent(new CustomEvent(customEvents.NOTE_SUBMIT_EVENT));
  }
}

customElements.define("note-form", NoteForm);
