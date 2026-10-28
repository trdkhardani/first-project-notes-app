class StatusDropdown extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="status-filter">
        <label class="status-filter__label" for="status-dropdown">Note signal</label>
        <div class="status-filter__control">
          <svg class="status-filter__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3.5v17M3.5 12h17M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
          </svg>
          <select name="status-dropdown" id="status-dropdown">
            <option value="active" selected>Active notes</option>
            <option value="archived">Archived notes</option>
          </select>
          <svg class="status-filter__chevron" viewBox="0 0 16 16" aria-hidden="true">
            <path d="m3 6 5 5 5-5" />
          </svg>
        </div>
      </div>`;
  }
}

customElements.define('status-dropdown', StatusDropdown);
