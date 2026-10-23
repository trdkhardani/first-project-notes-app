class NoteForm extends HTMLElement {
  connectedCallback() {
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
  }
}
customElements.define('note-form', NoteForm);
