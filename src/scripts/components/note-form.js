import notesData from "../../data/notes.js";
import customEvents from "../custom-events.js";

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="form-card" aria-labelledby="form-title">
        <div><h2 id="form-title">Tambah Catatan Baru</h2></div>
        <form id="note-form">
          <div class="field-group"><label for="note-title">Judul</label><input id="note-title" name="title" type="text" placeholder="Contoh: Rencana akhir pekan" required minlength="3" /><small class="field-message" id="title-message"></small></div>
          <div class="field-group"><label for="note-body">Isi catatan</label><textarea id="note-body" name="body" rows="5" placeholder="Tulis catatan Anda di sini..." required minlength="10"></textarea><small class="field-message" id="body-message"></small></div>
          <button type="submit">Simpan catatan <span aria-hidden="true">→</span></button>
          <p id="submission-alert" style="color: green;" hidden>Note berhasil ditambahkan!</p>
        </form>
      </section>`;

    this._onValidation();
    this._onSubmission();
    this.addEventListener("submit", (event) => this._onFormSubmit(event));
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
          noteTitleValidationMsgField.innerText = "Judul catatan harus diisi.";

        if (event.target.validity.tooShort)
          noteTitleValidationMsgField.innerText =
            "Judul catatan minimal 3 karakter.";
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
          noteBodyValidationMsgField.innerText = "Isi catatan harus diisi.";

        if (event.target.validity.tooShort)
          noteBodyValidationMsgField.innerText =
            "Isi catatan minimal 10 karakter.";
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

  _onFormSubmit(event) {
    event.preventDefault();

    const noteTitle = document.getElementById("note-title");
    const noteBody = document.getElementById("note-body");

    notesData.push({
      id: `notes-${+new Date()}`,
      title: noteTitle.value,
      body: noteBody.value,
      createdAt: new Date().toISOString(),
      archived: false,
    });

    noteTitle.value = "";
    noteBody.value = "";

    document.dispatchEvent(new CustomEvent(customEvents.NOTE_SUBMIT_EVENT));
  }
}

customElements.define("note-form", NoteForm);
