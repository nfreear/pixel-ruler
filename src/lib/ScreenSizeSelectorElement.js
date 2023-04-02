/**
 * A widget to select the device and screen size.
 *
 * @author Nick Freear, 31-Mar-2023.
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
  static getTag () {
    return 'screen-size-selector';
  }

  /** Device regular expression.
   * @was /(.+) [-–—/] (\d{3}) [x×] (\d{3})/
   */
  get deviceRE () {
    const SP = `[ ${TS}]?`;
    return new RegExp(`(.+) [-${ND}${MD}/] (\\d{3})${SP}[x×]${SP}(\\d{3})`);
  }

  connectedCallback () {
    this._attachLocalTemplate(TEMPLATE);

    const selectElem = this.shadowRoot.querySelector('#dev');

    this._sortedSizes.forEach((it) => selectElem.appendChild(this.option(it)));

    selectElem.addEventListener('input', ev => this._inputHandler(ev));
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
    const MATCHES = ev.target.value.match(this.deviceRE); // DEVICE_RE;

    const deviceName = MATCHES ? MATCHES[1] : null;
    const WIDTH = MATCHES ? parseInt(MATCHES[2]) : null;
    const HEIGHT = MATCHES ? parseInt(MATCHES[3]) : null;

    if (!deviceName || !WIDTH || !HEIGHT) {
      throw new Error(`Device Regex failed: ${this.deviceRE} | ${JSON.stringify(MATCHES)}`);
    }

    this._root.dataset.deviceName = deviceName;
    this._root.style.setProperty('--dev-width', WIDTH + 'px');
    this._root.style.setProperty('--dev-height', HEIGHT + 'px');
  }
}

ScreenSizeSelectorElement.define();
