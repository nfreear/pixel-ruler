/**
 * Four buttons to move the ruler in four directions.
 *
 * @author Nick Freear, 03-Apr-2023.
 */

import ArrowKeyButtonElement from './ArrowKeyButtonElement.js';

const { KeyboardEvent } = window;

/** @see https://symbl.cc/en/collections/arrow-symbols/
*/
const LARR = '&#11013;'; // '&#x2B05;' // '&larr;'
const UARR = '&#11014;';
const DARR = '&#11015;';
const RARR = '&#10152;'; // '&#10145;'

const TEMPLATE = `
<template>
  <span id="arrow-buttons">
    <button part="button" value="Left" ><i part="sr-only">Left</i>${LARR}</button>
    <button part="button" value="Up"   ><i part="sr-only">Up</i>  ${UARR}</button>
    <button part="button" value="Down" ><i part="sr-only">Down</i>${DARR}</button>
    <button part="button" value="Right"><i part="sr-only">Right</i>${RARR}</button>
  </span>
</template>
`;

export class ArrowButtonsElement extends ArrowKeyButtonElement {
  static getTag () {
    return 'arrow-buttons';
  }

  get events () {
    return [{ sel: '#arrow-buttons', name: 'click', fn: '_arrowButtonsHandler' }];
  }

  connectedCallback () {
    this.rulerPosition = { x: 0, y: 0 };

    this._attachLocalTemplate(TEMPLATE);
    this._addEventHandlers();
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
