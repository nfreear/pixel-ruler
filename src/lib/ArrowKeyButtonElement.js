/**
 * A target for the use of the arrow keys to move the rulers.
 *
 * @author Nick Freear, 31-Mar-2023.
 */

import AppElement from './AppElement.js';
// import MyElement from 'https://nfreear.github.io/elements/src/MyElement.js';

const { alert } = window;
const keyMulti = 10;
const KX = { Up: 0, Down: 0, Left: -1, Right: 1 };
const KY = { Up: -1, Down: 1, Left: 0, Right: 0 };

const HOWTO_TEXT = `Use the arrow keys to move the rulers — when focussed on this button.

Try ALT + arrow key to move in bigger increments!`;
const TEMPLATE = `
<template>
  <button part="button" aria-label="Use arrow keys">⤭</button>
</template>
`;

export class ArrowButtonKeyElement extends AppElement {
  static getTag () {
    return 'arrow-key-button';
  }

  connectedCallback () {
    // this._ROOT = document.documentElement;
    this._root.dataset.xx = 0;
    this._root.dataset.yy = 0;

    this._attachLocalTemplate(TEMPLATE);

    const BUTTON = this.shadowRoot.querySelector('button');

    BUTTON.addEventListener('keyup', (ev) => this._keyUpHandler(ev));
    BUTTON.addEventListener('keydown', (ev) => this._keyDownHandler(ev), false);
    BUTTON.addEventListener('click', ev => alert(HOWTO_TEXT));
  }

  _keyUpHandler (ev) {
    const MATCH = ev.key.match(/Arrow(Up|Down|Left|Right)/);
    if (MATCH) {
      ev.preventDefault();
      // ev.stopPropagation();

      const FAC = ev.altKey ? keyMulti : 1;

      const DIR = MATCH[1];
      const DELTA = { x: FAC * KX[DIR], y: FAC * KY[DIR] };
      const COORD = {
        x: parseInt(this._ROOT.dataset.xx) + DELTA.x,
        y: parseInt(this._ROOT.dataset.yy) + DELTA.y
      };
      this._root.dataset.xx = COORD.x;
      this._root.dataset.yy = COORD.y;

      this._root.style.setProperty('--xx', COORD.x + 'px');
      this._root.style.setProperty('--yy', COORD.y + 'px');

      // posEl.style = `--xx: ${COORD.x}px; --yy: ${COORD.y}px;`;

      console.debug('Arrow keyup:', COORD, DIR, ev.key, ev);
    } else {
      console.debug('Keyup:', ev.key, ev);
    }
  }

  /** Prevent the browser window scrolling - when focussed on this button.
   */
  _keyDownHandler (ev) {
    if ([37,38,39,40].indexOf(ev.keyCode) > -1) {
      ev.preventDefault();
      // Accessibility: do everything else on "keyup"!
    }
  }
}

ArrowButtonKeyElement.define();
