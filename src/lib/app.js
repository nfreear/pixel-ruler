/**
 *
 * @author Nick Freear, 30-March-2023.
 *
 * @see https://codepen.io/nfreear/pen/bGxyEdZ
 */

import './ArrowKeyButtonElement.js';
import './ScreenSizeSelectorElement.js';
import './PasteImageButtonElement.js';
import './RulersGuides.V2.js';
import './UploadImageButtonElement.js';
// import { showImageSize } from './showImageSize.js'; /** @DEPRECATED */

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

/** @DEPRECATED */

const { RulersGuides } = window;

export function displayRuler () {
  const evt = dummyEvent(); // new Event();
  const dragdrop = dummyDragDrop(evt); // new Dragdrop(evt);
  const rg = new RulersGuides(evt, dragdrop);
  console.debug('dragdrop:', dragdrop, rg);
}

function dummyDragDrop () {
  return {
    set: () => {},
    start: () => {}
  };
}

function dummyEvent () {
  return {
    attach: () => {},
    detach: () => {},
    stop: () => {},
    prevent: () => {}
  };
}

/* End. */
