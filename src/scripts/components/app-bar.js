class AppBar extends HTMLElement {
  connectedCallback() {
    const navMenus = this.getAttribute("nav-menus") || "";
    const splittedNavMenus = navMenus.split(',');
    this.innerHTML = `
    <header class="app-bar">
      <div id="brand">
        <a class="brand" href="/" aria-label="Notes App, kembali ke halaman utama">
          <span>
            <strong>Notes App</strong>
          </span>
        </a>
      </div>
      <div id="nav-menus">
        <a href="#note-form"><span>${splittedNavMenus[0]}<span></a>
        <a href="#notes-list"><span>${splittedNavMenus[1]}<span></a>
        <a href="https://www.dicoding.com/users/tridiktyahp" target="_blank" rel="noopener noreferrer"><span>${splittedNavMenus[2]}<span></a>
      </div>
    </header>`;
  }
}
customElements.define("app-bar", AppBar);
