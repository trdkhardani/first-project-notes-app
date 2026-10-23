import notesData from "../../data/notes.js";
import customEvents from "../custom-events.js";

class NoteForm extends HTMLElement {
  connectedCallback() {
    console.log(document.getElementById("intro-title").innerText);
    this.innerHTML = `
      <section class="form-card" aria-labelledby="form-title">
        <div><p class="eyebrow">Catatan baru</p><h2 id="form-title">Tuangkan ide Anda</h2></div>
        <form id="note-form" novalidate>
          <div class="field-group"><label for="note-title">Judul</label><input id="note-title" name="title" type="text" placeholder="Contoh: Rencana akhir pekan" required minlength="3" /><small class="field-message" id="title-message"></small></div>
          <div class="field-group"><label for="note-body">Isi catatan</label><textarea id="note-body" name="body" rows="5" placeholder="Tulis catatan Anda di sini..." required minlength="10"></textarea><small class="field-message" id="body-message"></small></div>
          <button type="submit">Simpan catatan <span aria-hidden="true">→</span></button>
        </form>
      </section>`;
    // TODO: Tambahkan realtime validation pada input dan textarea.
    // TODO: Tangani submit lalu kirim data catatan melalui CustomEvent.

    this.addEventListener("submit", (event) => this._onFormSubmit(event));
    this.addEventListener("change", (event) => this._onFieldChange(event));
    // this
  }

  _onFieldChange(event) {
    const noteTitle = document.getElementById("note-title");
    const noteBody = document.getElementById("note-body");

    // if (noteTitle ||)
  }

  _onFormSubmit(event) {
    event.preventDefault();

    const noteTitle = document.getElementById("note-title");
    const noteBody = document.getElementById("note-body");
    console.log(noteTitle.value);
    console.log(noteBody.value);

    notesData.push({
      id: `notes-${+new Date()}`,
      title: noteTitle.value,
      body: noteBody.value,
      createdAt: new Date().toISOString(),
      archived: false,
    });

    console.log("notesData.length");
    console.log(notesData.length);
    console.log("notesData");
    console.log(notesData);

    noteTitle.value = "";
    noteBody.value = "";

    document.dispatchEvent(new CustomEvent(customEvents.NOTE_SUBMIT_EVENT));
  }
}
customElements.define("note-form", NoteForm);
