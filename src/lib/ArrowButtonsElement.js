/**
 * Four buttons to move the ruler in four directions.
 *
 * @author Nick Freear, 03-Apr-2023.
 */

import ArrowKeyButtonElement from './ArrowKeyButtonElement.js';

const { KeyboardEvent } = window;

const TEMPLATE = `
<template>
  <span id="arrow-buttons">
    <button part="button larr" value="Left"  aria-label="Left" >&larr;</button>
    <button part="button rarr" value="Right" aria-label="Right">&rarr;</button>
    <button part="button uarr" value="Up"    aria-label="Up"   >&uarr;</button>
    <button part="button darr" value="Down"  aria-label="Down" >&darr;</button>
  </span>
</template>
`;

export class ArrowButtonsElement extends ArrowKeyButtonElement {
  static getTag () {
    return 'arrow-buttons';
  }

  connectedCallback () {
    this.rulerPosition = { x: 0, y: 0 };

    this._attachLocalTemplate(TEMPLATE);

    const BUTTONS = this.shadowRoot.querySelector('#arrow-buttons');

    BUTTONS.addEventListener('click', (ev) => this._arrowButtonsHandler(ev));

    /* setTimeout(() => {
      this._otherButton = document.querySelector('arrow-key-button');
    },
    50); */
  }

  _arrowButtonsHandler (ev) {
    const DIR = this.shadowRoot.activeElement.value; // Was: ev.target.value; // Doesn't work - Why?

    console.debug('Arrow button, click:', DIR, this.shadowRoot.activeElement, ev);

    // this._otherButton
    this._keyUpHandler(this._mockKeyUpEvent(`Arrow${DIR}`, ev));
  }

  _mockKeyUpEvent (key, ev) {
    const { altKey, ctrlKey, metaKey, shiftKey } = ev;
    return new KeyboardEvent('keyup', { altKey, ctrlKey, metaKey, shiftKey, key });
  }
}

ArrowButtonsElement.define();
