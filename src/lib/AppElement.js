/**
 * Base element class, with shared methods.
 */

import MyElement from 'https://nfreear.github.io/elements/src/MyElement.js';

export class AppElement extends MyElement {
  get _root () {
    return document.documentElement;
  }

  get _dimElement () {
    return document.querySelector('#dim');
  }

  _appendImage (imgElement) {
    const output = document.querySelector('#image'); // 'output'
    output.textContent = '';
    output.appendChild(imgElement);
  }

  _setImageSize (ev, IMG) {
    console.debug('Load - image size:', ev);
    console.debug('natural:', IMG.naturalWidth, IMG.naturalHeight);
    console.debug('width,height:', IMG.width, IMG.height);
    console.debug('offsetW,offsetH:', IMG.offsetWidth, IMG.offsetHeight);

    /* EXIF.enableXmp();
    EXIF.getData(IMG, function() {
      var allMetaData = EXIF.getAllTags(this);
      // var allMetaDataSpan = document.getElementById("allMetaDataSpan");
      META.innerHTML = JSON.stringify(allMetaData, null, "\t");
    }); */

    this._dimElement.textContent = `Image size: ${IMG.naturalWidth} × ${IMG.naturalHeight} pixels`;

    // output.style = `--img-width: ${IMG.naturalWidth}; --img-height: ${IMG.naturalHeight};`;
    this._root.style.setProperty('--img-width', IMG.naturalWidth);
    this._root.style.setProperty('--img-height', IMG.naturalHeight);
  }
}

export default AppElement;
