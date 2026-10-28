class AppBar extends HTMLElement {
  constructor() {
    super();

    this._navMenus = this.getAttribute("nav-menus") || "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const splittedNavMenus = this._navMenus.split(",");
    this.innerHTML = `
    <header class="app-bar">
      <div id="brand">
        <a class="brand" href="#" aria-label="Notes App, scroll to top">
          <span>
            <strong>Notes App</strong>
          </span>
        </a>
      </div>
      <div id="nav-menus">
        <a href="#note-form"><span>${splittedNavMenus[0] /** Add New Note */}<span></a>
        <a href="#notes-list"><span>${splittedNavMenus[1] /** Note List */}<span></a>
        <a href="https://www.dicoding.com/users/tridiktyahp" target="_blank" rel="noopener noreferrer"><span>${splittedNavMenus[2] /** Profile */}<span></a>
      </div>
    </header>`;
  }
}
customElements.define("app-bar", AppBar);
