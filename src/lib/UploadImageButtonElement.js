/**
 * Widget to upload an image file.
 *
 * @author Nick Freear, 31-Mar-2023.
 */

import AppElement from './AppElement.js';

const { PointerEvent } = window;

const TEMPLATE = `
<template>
  <button part="button"><slot>Upload image</slot></button>
  <input type="file" accept="image/jpeg, image/png, image/jpg" hidden>
</template>
`;

export class UploadImageButtonElement extends AppElement {
  static getTag () {
    return 'upload-image-button';
  }

  get events () {
    return [
      { sel: 'button', name: 'click', fn: '_clickDispatch' },
      { sel: 'input[type = file]', name: 'change', fn: '_changeHandler' }
    ];
  }

  connectedCallback () {
    this._attachLocalTemplate(TEMPLATE);
    this._addEventHandlers();

    this._fileElem = this.shadowRoot.querySelector('input[ type = file ]');
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

  _clickDispatch (ev) {
    const { bubbles, pointerId, pointerType } = ev;
    const EVENT = new PointerEvent('click', { bubbles, pointerId, pointerType });
    EVENT._origEvent = ev;
    this._fileElem.dispatchEvent(EVENT);
    console.debug('upload-image-button - Click:', EVENT, this._fileElem);
  }
}

UploadImageButtonElement.define();
