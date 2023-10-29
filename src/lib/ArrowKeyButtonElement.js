/**
 * A target for the use of the arrow keys to move the rulers.
 *
 * @author Nick Freear, 31-Mar-2023.
 */

import AppElement from './AppElement.js';

const { alert } = window;
const DEF_MOD_KEY = 'shiftKey';
const DEF_KEY_MULTI = 10;

export class ArrowButtonKeyElement extends AppElement {
  static getTag () {
    return 'arrow-key-button';
  }

  /** @see https://fsymbols.com/signs/arrow/ */
  get template () {
    return `
    <template>
      <button part="button"><i part="sr-only"><slot>Move the ruler with the arrow keys</slot></i>⤭</button>
    </template>`;
  }

  get _howtoText () {
    return `Use the arrow keys to move the rulers — when focussed on this button.
\nTry Shift + arrow key to move in bigger increments!`;
  }

  get keyMultiplier () {
    return parseInt(this.getAttribute('key-multiplier')) || DEF_KEY_MULTI;
  }

  get modifierKey () {
    const key = this.getAttribute('modifier-key');
    const MATCH = key ? key.match(/(alt|ctrl|meta|shift)/i) : null;
    if (key && !MATCH) throw new Error(`Unexpected value for modifier key: ${key}`);
    return MATCH ? `${MATCH[1].toLowerCase()}Key` : DEF_MOD_KEY;
  }

  set rulerPosition (COORD) {
    this._coord = COORD;

    this._root.dataset.rgX = COORD.x;
    this._root.dataset.rgY = COORD.y;

    this._root.style.setProperty('--rg-x', COORD.x + 'px');
    this._root.style.setProperty('--rg-y', COORD.y + 'px');
  }

  get rulerPosition () { return this._coord; }

  get events () {
    return [
      { sel: 'button', name: 'keyup', fn: '_keyUpHandler' },
      { sel: 'button', name: 'keydown', fn: '_noScrolling' }, // Was: '_keyDownHandler'
      { sel: 'button', name: 'click', fn: '_clickMessage' } // '_clickHandler'
    ];
  }

  connectedCallback () {
    this.rulerPosition = { x: 0, y: 0 };

    this._attachLocalTemplate(this.template);
    this._addEventHandlers();

    console.debug('arrow-key-button:', this.modifierKey, this.keyMultiplier, this);
  }

  get _keyMoves () {
    return {
      x: { Up: 0, Down: 0, Left: -1, Right: 1 },
      y: { Up: -1, Down: 1, Left: 0, Right: 0 }
    };
  }

  _keyUpHandler (ev) {
    const MATCH = ev.key.match(/Arrow(Up|Down|Left|Right)/);

    if (MATCH) {
      ev.preventDefault();

      const FAC = ev[this.modifierKey] ? this.keyMultiplier : 1;

      const DIR = MATCH[1];
      const KM = this._keyMoves;
      const DELTA = { x: FAC * KM.x[DIR], y: FAC * KM.y[DIR] };

      this.rulerPosition = {
        x: this.rulerPosition.x + DELTA.x,
        y: this.rulerPosition.y + DELTA.y
      };

      console.debug('Arrow keyup:', this.rulerPosition, DIR, ev.key, ev);
    } else {
      console.debug('Keyup:', ev.key, ev);
    }
  }

  /** Prevent the browser window scrolling - just when focussed on this button.
   */
  _noScrolling (ev) {
    if ([37, 38, 39, 40].indexOf(ev.keyCode) > -1) {
      ev.preventDefault();
      // Accessibility: do everything else on "keyup"!
    }
  }

  _clickMessage (ev) { alert(this._howtoText); }
}

ArrowButtonKeyElement.define();

export default ArrowButtonKeyElement;
