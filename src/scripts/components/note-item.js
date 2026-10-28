class NoteItem extends HTMLElement {
  constructor() {
    super();
  }

  set note(note) {
    this._note = note;
    this.render();
  }

  render() {
    if (!this._note) return;
    const { id, title, body, createdAt, archived } = this._note;
    const date = createdAt
      ? new Date(createdAt).toLocaleDateString("en-UK", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "No date set";

    this.innerHTML = `
      <article class="note-card ${archived ? "is-archived" : ""}">
        <div class="note-card__meta">
          <span>${archived ? "Archived" : "Active"}</span>
          <time datetime="${createdAt || ""}">${date}</time>
        </div>
        <h3>${title}</h3>
        <p>${body}</p>

      </article>`;
  }
}
customElements.define("note-item", NoteItem);
