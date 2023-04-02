/**
 * A target for the use of the arrow keys to move the rulers.
 *
 * @author Nick Freear, 31-Mar-2023.
 */

import AppElement from './AppElement.js';

const { alert } = window;
const KEY_MULTI = 10;
const KX = { Up: 0, Down: 0, Left: -1, Right: 1 };
const KY = { Up: -1, Down: 1, Left: 0, Right: 0 };

const HOWTO_TEXT = `Use the arrow keys to move the rulers — when focussed on this button.

Try ALT + arrow key to move in bigger increments!`;
const TEMPLATE = `
<template>
  <button part="button" aria-label="Move the ruler with the arrow keys">⤭</button>
</template>
`;

export class ArrowButtonKeyElement extends AppElement {
  static getTag () {
    return 'arrow-key-button';
  }

  get keyMultiplier () {
    return parseInt(this.getAttribute('key-multiplier')) || KEY_MULTI;
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
    const ROOT = this._root;
    const MATCH = ev.key.match(/Arrow(Up|Down|Left|Right)/);

    if (MATCH) {
      ev.preventDefault();

      const FAC = ev.altKey ? this.keyMultiplier : 1;

      const DIR = MATCH[1];
      const DELTA = { x: FAC * KX[DIR], y: FAC * KY[DIR] };
      const COORD = {
        x: parseInt(ROOT.dataset.xx) + DELTA.x,
        y: parseInt(ROOT.dataset.yy) + DELTA.y
      };
      ROOT.dataset.xx = COORD.x;
      ROOT.dataset.yy = COORD.y;

      ROOT.style.setProperty('--xx', COORD.x + 'px');
      ROOT.style.setProperty('--yy', COORD.y + 'px');

      console.debug('Arrow keyup:', COORD, DIR, ev.key, ev);
    } else {
      console.debug('Keyup:', ev.key, ev);
    }
  }

  /** Prevent the browser window scrolling - just when focussed on this button.
   */
  _keyDownHandler (ev) {
    if ([37, 38, 39, 40].indexOf(ev.keyCode) > -1) {
      ev.preventDefault();
      // Accessibility: do everything else on "keyup"!
    }
  }
}

ArrowButtonKeyElement.define();
