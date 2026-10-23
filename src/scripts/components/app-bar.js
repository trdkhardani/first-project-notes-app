class AppBar extends HTMLElement {
  connectedCallback() {
    const appName = this.getAttribute('app-name') || 'Notes App';
    const tagline = this.getAttribute('tagline') || '';
    this.innerHTML = `<header class="app-bar"><a class="brand" href="/" aria-label="${appName}, kembali ke halaman utama"><span class="brand-mark" aria-hidden="true">✦</span><span><strong>${appName}</strong>${tagline ? `<small>${tagline}</small>` : ''}</span></a></header>`;
  }
}
customElements.define('app-bar', AppBar);
