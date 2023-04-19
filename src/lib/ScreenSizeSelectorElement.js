/**
 * A widget to select the device and screen size.
 *
 * @author Nick Freear, 31-Mar-2023.
 *
 * @see https://web.dev/more-capable-form-controls/
 */

import AppElement from './AppElement.js';
import SCREEN_SIZE from './screen-size.js';

const { Option } = window;

const TS = String.fromCharCode(8201); // thin space.
const MD = String.fromCharCode(8212); // em dash.
const ND = String.fromCharCode(8211); // en dash.

const TEMPLATE = `
<template>
  <label for="dev"><slot>Screen size</slot></label>
  <select id="dev" part="input select">
    <option></option>
  </select>
  <a part="a" href="#screen-size">help</a>
</template>
`;

export class ScreenSizeSelectorElement extends AppElement {
  // Identify the element as a form-associated custom element
  static get formAssociated () { return true; }

  static getTag () {
    return 'screen-size-selector';
  }

  constructor () {
    super();
    // Get access to the internal form control APIs
    this._internals = this.attachInternals();
    this._selectEl = null;
  }

  get type () { return this._selectEl ? this._selectEl.type : null; }

  get value () { return this._selectEl ? this._selectEl.value : null; }

  set value (val) {
    if (this._selectEl) {
      this._selectEl.value = val;
      console.debug('Set value:', val);
      this._inputHandler(this._mockInputEvent()); // this._selectEl;
    } else {
      throw new Error('Set value failed');
    }
  }

  /** Device regular expression.
   * @was /(.+) [-–—/] (\d{3}) [x×] (\d{3})/
   */
  get deviceRE () {
    const SP = `[ ${TS}]?`;
    return new RegExp(`(.+) [-${ND}${MD}/] (\\d{3})${SP}[x×]${SP}(\\d{3})`);
  }

  get events () {
    return [{ sel: '#dev', name: 'input', fn: '_inputHandler' }];
  }

  connectedCallback () {
    this._attachLocalTemplate(TEMPLATE);
    this._addEventHandlers();

    const selectElem = this._selectEl = this.shadowRoot.querySelector('#dev');

    this._sortedSizes.forEach((it) => selectElem.appendChild(this.option(it)));

    console.debug('screen-size-selector:', selectElem.type);
  }

  /** Copy, then sort alphabetically in place.
   */
  get _sortedSizes () {
    const SIZES = [...SCREEN_SIZE];
    return SIZES.sort((A, B) => A.name.toLowerCase() < B.name.toLowerCase() ? -1 : 1);
  }

  option (IT) {
    // const { name, width, height } = IT;
    return new Option(`${IT.name} ${ND} ${IT.width} × ${IT.height}`); // document.createElement('option');
  }

  _inputHandler (ev) {
    const VAL = ev.target.value; // || null;
    const MATCHES = VAL ? VAL.match(this.deviceRE) : null; // DEVICE_RE;

    const deviceName = MATCHES ? MATCHES[1] : null;
    const WIDTH = MATCHES ? parseInt(MATCHES[2]) : null;
    const HEIGHT = MATCHES ? parseInt(MATCHES[3]) : null;

    if (VAL && (!deviceName || !WIDTH || !HEIGHT)) {
      throw new Error(`Device Regex failed: ${this.deviceRE} | ${JSON.stringify(MATCHES)} "${VAL}"`);
    }

    if (WIDTH) {
      this._root.dataset.deviceName = deviceName;
      this._root.style.setProperty('--dev-width', WIDTH + 'px');
      this._root.style.setProperty('--dev-height', HEIGHT + 'px');
    }

    console.debug('screen-size - Input:', MATCHES, ev);

    // No need to RE-dispatch the original event - it bubbles!
  }

  _mockInputEvent () {
    return { type: 'input', target: this, mock: true }; // new Event('input', { target: });
  }
}

ScreenSizeSelectorElement.define();
