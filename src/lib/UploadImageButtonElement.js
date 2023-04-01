/**
 * Widget to upload an image file.
 *
 * @author Nick Freear, 31-Mar-2023.
 */

import AppElement from './AppElement.js';

const TEMPLATE = `
<template>
  <label for="file"><slot>Or upload a screenshot</slot></label>
  <input id="file" part="input" type="file" accept="image/jpeg, image/png, image/jpg">
</template>
`;

export class UploadImageButtonElement extends AppElement {
  static getTag () {
    return 'upload-image-button';
  }

  connectedCallback () {
    this._attachLocalTemplate(TEMPLATE);

    const FILE = this.shadowRoot.querySelector('input[ type = file ]');

    FILE.addEventListener('change', (ev) => this._changeHandler(ev));
  }

  /**
   * @see https://medium.com/@mignunez/how-to-upload-and-preview-an-image-with-javascript-749b92711b91
   */
  _changeHandler (ev) {
    const files = ev.target.files;
    const imageFile = files[0];

    const IMG = document.createElement('img');
    IMG.addEventListener('load', (ev2) => this._setImageSize(ev2, IMG));

    IMG.src = URL.createObjectURL(imageFile);
    IMG.alt = 'Screenshot 0';

    this._appendImage(IMG);

    console.debug('File change:', files, ev);
  }
}

UploadImageButtonElement.define();
