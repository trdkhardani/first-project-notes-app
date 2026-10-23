class NoteItem extends HTMLElement {
  set note(note) {
    this._note = note;
    this.render();
  }
  render() {
    if (!this._note) return;
    const { title, body, createdAt, archived } = this._note;
    const date = createdAt
      ? new Date(createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Tanggal belum tersedia";
    this.innerHTML = `<article class="note-card ${archived ? "is-archived" : ""}"><div class="note-card__meta"><span>${archived ? "Diarsipkan" : "Aktif"}</span><time datetime="${createdAt || ""}">${date}</time></div><h3>${title}</h3><p>${body}</p></article>`;
  }
}
customElements.define("note-item", NoteItem);
