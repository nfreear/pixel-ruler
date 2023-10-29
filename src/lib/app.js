/**
 * Pixel Ruler.
 * @license MIT.
 * @author Nick Freear, 30-March-2023.
 *
 * @see https://codepen.io/nfreear/pen/bGxyEdZ
 * @see https://nfreear.github.io/elements/src/components/MyLocalStorageElement.js
 * @see https://github.com/nfreear/elements/blob/main/src/components/MyLocalStorageElement.js
 */

import './ArrowKeyButtonElement.js';
import './ArrowButtonsElement.js';
import './ScreenSizeSelectorElement.js';
import './PasteImageButtonElement.js';
import './RulersGuides.V2.js';
import './SettingsDialogButtonElement.js';
import './UploadImageButtonElement.js';
import '../../elements/src/components/MyLocalStorageElement.js';
import '../../elements/src/components/MySiteCounterElement.js';

const ROOT = document.documentElement;

ROOT.classList.remove('no-js');
ROOT.classList.add('js');

if (/experiment=/.test(window.location.search)) {
  ROOT.dataset.experiment = true;
}

if (/highlight=/.test(window.location.search)) {
  ROOT.dataset.highlight = true;
  document.querySelector('settings-dialog-button').focus();
}

/**
 * @DEPRECATED
 */

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
