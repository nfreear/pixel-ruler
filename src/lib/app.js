/**
 *
 * @author Nick Freear, 30-March-2023.
 *
 * @see https://codepen.io/nfreear/pen/bGxyEdZ
 * @see https://www.onlinerulerfree.com/pixel/
 * @see https://mark-rolich.github.io/RulersGuides.js/
 * @see https://medium.com/@mignunez/how-to-upload-and-preview-an-image-with-javascript-749b92711b91
 * @see https://stackoverflow.com/questions/5633264/javascript-get-image-dimensions,
 */

const FILE = document.querySelector("input[ type = file ]");
const pasteBtn = document.querySelector('#paste-button');
const arrowBtn = document.querySelector('#arrow-button');
const output = document.querySelector("output");
const DIM = document.querySelector('#dim');
const META = document.querySelector('#meta');
const DEVICE = document.querySelector('#dev');

const ROOT = document.documentElement; // document.body;

const keyMulti = 10;

let imagesArray = [];

displayRuler();

FILE.addEventListener("change", (ev) => {
  const file = ev.target.files; // input.files
  imagesArray.push(file[0])
  displayImages();

  console.debug('File change:', ev);
});

pasteBtn.addEventListener('click', ev => pasteImage(ev));

DEVICE.addEventListener('input', ev => {
  const DEVICE_RE = /(.+) [-—\/] (\d{3}) [x×] (\d{3})/;
  const MATCHES = ev.target.value.match(DEVICE_RE);

  const deviceName = MATCHES ? MATCHES[1] : null;
  const WIDTH = MATCHES ? parseInt(MATCHES[2]) : null;
  const HEIGHT = MATCHES ? parseInt(MATCHES[3]) : null;

  ROOT.dataset.deviceName = deviceName;
  ROOT.style.setProperty('--dev-width', WIDTH + 'px');
  ROOT.style.setProperty('--dev-height', HEIGHT + 'px');

  // document.body.dataset.deviceName = deviceName;
  // document.body.style = `--dev-width: ${WIDTH}px; --dev-height: ${HEIGHT}px;`;
});

arrowBtn.addEventListener('click', ev => {
  alert('Use the arrow keys to move the rulers - when focussed on this button.\n\nTry ALT + arrow key to move in bigger increments!');
});

const KX = { Up: 0, Down: 0, Left: -1, Right: 1 };
const KY = { Up: -1, Down: 1, Left: 0, Right: 0 };

// const posEl = document.documentElement;

ROOT.dataset.xx = 0;
ROOT.dataset.yy = 0;

arrowBtn.addEventListener('keyup', ev => {
  const MATCH = ev.key.match(/Arrow(Up|Down|Left|Right)/);
  if (MATCH) {
    ev.preventDefault();
    // ev.stopPropagation();

    const FAC = ev.altKey ? keyMulti : 1;

    const DIR = MATCH[1];
    const DELTA = { x: FAC * KX[DIR], y: FAC * KY[DIR] };
    const COORD = {
      x: parseInt(ROOT.dataset.xx) + DELTA.x,
      y: parseInt(ROOT.dataset.yy) + DELTA.y
    };
    ROOT.dataset.xx = COORD.x;
    ROOT.dataset.yy = COORD.y;

    ROOT.style.setProperty('--xx', COORD.x + 'px');
    ROOT.style.setProperty('--yy', COORD.y + 'px');

    // posEl.style = `--xx: ${COORD.x}px; --yy: ${COORD.y}px;`;

    console.debug('Arrow keyup:', COORD, DIR, ev.key, ev);
  } else {
    console.debug('Keyup:', ev.key, ev);
  }
});

arrowBtn.addEventListener('keydown', (ev) => {
  if ([37,38,39,40].indexOf(ev.keyCode) > -1) {
    ev.preventDefault();
    // Do whatever else you want with the keydown event (i.e. your navigation).
  }
}, false);

function displayImages () {
  let images = "";
  imagesArray.forEach((image, index) => {
    const EL = document.createElement('img');
    EL.addEventListener('load', ev => setImageSize(ev, EL));
    EL.src = URL.createObjectURL(image);

    images += `<div class="image">
      <img src="${URL.createObjectURL(image)}" alt="Screenshot ${index}">
    </div>`;
    // <span X_onclick="deleteImage(${index})">&times;</span>
  })
  output.innerHTML = images
}

function setImageSize (ev, EL) {
  console.debug('Image load:', ev);
  console.log("natural:", EL.naturalWidth, EL.naturalHeight);
  console.log("width,height:", EL.width, EL.height);
  console.log("offsetW,offsetH:", EL.offsetWidth, EL.offsetHeight);

  /* EXIF.enableXmp();
  EXIF.getData(EL, function() {
    var allMetaData = EXIF.getAllTags(this);
    // var allMetaDataSpan = document.getElementById("allMetaDataSpan");
    META.innerHTML = JSON.stringify(allMetaData, null, "\t");
  }); */

  DIM.textContent = `Image dimensions: ${EL.naturalWidth} × ${EL.naturalHeight} pixels.`;

  // output.style = `--img-width: ${EL.naturalWidth}; --img-height: ${EL.naturalHeight};`;
  ROOT.style.setProperty('--img-width', EL.naturalWidth);
  ROOT.style.setProperty('--img-height', EL.naturalHeight);
}

async function pasteImage() {
  try {
    const permission = await navigator.permissions.query({
      name: "clipboard-read",
    });
    if (permission.state === "denied") {
      throw new Error("Not allowed to read clipboard.");
    }
    const clipboardContents = await navigator.clipboard.read();
    for (const item of clipboardContents) {
      if (!item.types.includes("image/png")) {
        throw new Error("Clipboard contains non-image data.");
      }
      const blob = await item.getType("image/png");
      const EL = document.createElement('img');
      EL.addEventListener('load', ev => setImageSize(ev, EL));

      EL.src = URL.createObjectURL(blob);
      EL.alt = 'Pasted screenshot';

      output.textContent = '';
      output.appendChild(EL);

      console.debug('Paste:', item);
    }
  } catch (error) {
    console.error(error.message);
  }
}

function displayRuler () {
  const evt = dummyEvent(); // new Event();
  const dragdrop = dummyDragDrop(evt); // new Dragdrop(evt);
  console.debug('dragdrop:', dragdrop);
  const rg = new RulersGuides(evt, dragdrop);
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
  }
}

/* End. */
