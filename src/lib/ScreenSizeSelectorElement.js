/**
 * A widget to select the device and screen size.
 *
 * @author Nick Freear, 31-Mar-2023.
 */

import AppElement from './AppElement.js';
// import MyElement from 'https://nfreear.github.io/elements/src/MyElement.js';

const DEVICE_RE = /(.+) [-—\/] (\d{3}) [x×] (\d{3})/;
const TEMPLATE = `
<template>
  <label for="dev"><slot>Screen size</slot></label>
  <select id="dev" part="select">
    <option></option>
    <option>Samsung A52 — 412 x 915</option>
    <option>Samsung S22 Ultra — 385 x 824</option>
    <option>Pixel 4a — 393 x 851</option>
    <option>iPhone SE — 375 x 667</option>
    <option>iPhone XR — 414 x 896</option>
  </select>
</template>
`;

export class ScreenSizeSelectorElement extends AppElement {
  static getTag () {
    return 'screen-size-selector';
  }

  connectedCallback () {
    // this._ROOT = document.documentElement;

    this._attachLocalTemplate(TEMPLATE);

    const selectElem = this.shadowRoot.querySelector('#dev');

    selectElem.addEventListener('input', ev => this._inputHandler(ev));
  }

  _inputHandler (ev) {
    const MATCHES = ev.target.value.match(DEVICE_RE);

    const deviceName = MATCHES ? MATCHES[1] : null;
    const WIDTH = MATCHES ? parseInt(MATCHES[2]) : null;
    const HEIGHT = MATCHES ? parseInt(MATCHES[3]) : null;

    this._root.dataset.deviceName = deviceName;
    this._root.style.setProperty('--dev-width', WIDTH + 'px');
    this._root.style.setProperty('--dev-height', HEIGHT + 'px');

    // document.body.dataset.deviceName = deviceName;
    // document.body.style = `--dev-width: ${WIDTH}px; --dev-height: ${HEIGHT}px;`;
  }
}

ScreenSizeSelectorElement.define();
