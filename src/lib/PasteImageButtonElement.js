/**
 * A button to paste an image from the clipboard.
 *
 * @author Nick Freear, 31-Mar-2023.
 */

import AppElement from './AppElement.js';

const TEMPLATE = `
<template>
  <button part="button"><slot>Paste image</slot></button>
</template>
`;

export class PasteImageButtonElement extends AppElement {
  static getTag () {
    return 'paste-image-button';
  }

  connectedCallback () {
    this._attachLocalTemplate(TEMPLATE);

    const BUTTON = this.shadowRoot.querySelector('button');

    BUTTON.addEventListener('click', ev => this._pasteImage(ev));
  }

  async _pasteImage (ev) {
    ev.preventDefault();

    try {
      const permission = await navigator.permissions.query({
        name: 'clipboard-read'
      });
      if (permission.state === 'denied') {
        throw new Error('Not allowed to read clipboard.');
      }
      const clipboardContents = await navigator.clipboard.read();
      for (const item of clipboardContents) {
        if (!item.types.includes('image/png')) {
          throw new Error('Clipboard contains non-image data.');
        }
        const blob = await item.getType('image/png');
        const IMG = document.createElement('img');
        IMG.addEventListener('load', (ev) => this._setImageSize(ev, IMG));

        IMG.src = URL.createObjectURL(blob);
        IMG.alt = 'Pasted screenshot';

        this._appendImage(IMG);

        console.debug('Paste:', item, ev);
      }
    } catch (error) {
      console.error(error.name, error.message);
    }
  }
}

PasteImageButtonElement.define();
