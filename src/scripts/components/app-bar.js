class AppBar extends HTMLElement {
  connectedCallback() {
    const appName = this.getAttribute("app-name") || "Notes App";
    const tagline = this.getAttribute("tagline") || "";
    const navMenus = this.getAttribute("nav-menus") || "";
    console.log(navMenus.split(','));
    this.innerHTML = `
    <header class="app-bar">
      <div id="brand">
        <a class="brand" href="/" aria-label="${appName}, kembali ke halaman utama">
          <span class="brand-mark" aria-hidden="true">✦</span>
          <span>
            <strong>${appName}</strong>${tagline ? `<small>${tagline}</small>` : ""}
          </span>
        </a>
      </div>
      <div id="nav-menus">
        <a href="#note-form"><span>${navMenus.split(',')[0]}<span></a>
        <a href="#notes-list"><span>${navMenus.split(',')[1]}<span></a>
        <a href="https://www.dicoding.com/users/tridiktyahp" target="_blank" rel="noopener noreferrer"><span>${navMenus.split(',')[2]}<span></a>
      </div>
    </header>`;
  }
}
customElements.define("app-bar", AppBar);
