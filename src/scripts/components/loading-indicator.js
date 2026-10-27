import { waapi, animate, stagger } from 'animejs';

class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this._animations = [];
  }

  connectedCallback() {
    this.render();
    this.startAnimation();
  }

  disconnectedCallback() {
    this._animations.forEach((animation) => animation.revert());
    this._animations = [];
  }

  render() {
    this.setAttribute('role', 'status');
    this.setAttribute('aria-label', 'Loading notes');
    this.innerHTML = `
      <div class="loading-orbit" aria-hidden="true">
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
      </div>`;
  }

  startAnimation() {
    const orbit = this.querySelector('.loading-orbit');
    const squares = this.querySelectorAll('.square');

    this._animations = [
      waapi.animate(orbit, {
        rotate: '1turn',
        duration: 6000,
        loop: true,
        ease: 'linear',
      }),
      animate(squares, {
        scale: [0.65, 1.2],
        backgroundColor: ['#5de4ff', '#a78bfa'],
        duration: 1200,
        delay: stagger(180),
        loop: true,
        alternate: true,
        ease: 'inOutSine',
      }),
    ];
  }
}

customElements.define('loading-indicator', LoadingIndicator);
