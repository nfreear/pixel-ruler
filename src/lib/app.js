/**
 *
 * @author Nick Freear, 30-March-2023.
 *
 * @see https://codepen.io/nfreear/pen/bGxyEdZ
 *
 * @see https://www.onlinerulerfree.com/pixel/
 * @see https://mark-rolich.github.io/RulersGuides.js/
 * @see https://medium.com/@mignunez/how-to-upload-and-preview-an-image-with-javascript-749b92711b91
 * @see https://stackoverflow.com/questions/5633264/javascript-get-image-dimensions,
 */

import './ArrowKeyButtonElement.js';
import './ScreenSizeSelectorElement.js';
import './PasteImageButtonElement.js';
import './RulersGuides.V2.js';
import { showImageSize } from './showImageSize.js'; /** @DEPRECATED */

const FILE = document.querySelector('input[ type = file ]');
// const pasteBtn = document.querySelector('#paste-button');
const output = document.querySelector('#output'); // 'output'
// Was: const DIM = document.querySelector('#dim');

// const ROOT = document.documentElement; // document.body;

const imagesArray = [];

// Was: displayRuler();

FILE.addEventListener('change', (ev) => {
  const file = ev.target.files; // input.files
  imagesArray.push(file[0]);
  displayImages();

  console.debug('File change:', ev);
});

// Was: pasteBtn.addEventListener('click', ev => pasteImage(ev));

function displayImages () {
  let images = '';
  imagesArray.forEach((image, index) => {
    const EL = document.createElement('img');
    EL.addEventListener('load', ev => showImageSize(ev, EL));

    EL.src = URL.createObjectURL(image);

    images += `<div class="image">
      <img src="${URL.createObjectURL(image)}" alt="Screenshot ${index}">
    </div>`;
    // <span X_onclick="deleteImage(${index})">&times;</span>
  });
  output.innerHTML = images;
}

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
