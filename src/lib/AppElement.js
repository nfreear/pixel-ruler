/**
 * Base HTML element class, with shared methods.
 *
 * @see 'https://nfreear.github.io/elements/src/MyElement.js
 */

import MyElement from '../../elements/src/MyElement.js';

export class AppElement extends MyElement {
  get _root () {
    return document.documentElement;
  }

  get _dimElement () {
    return document.querySelector('#dim');
  }

  _appendImage (imgElement) {
    const output = document.querySelector('#image-output');
    // output.textContent = '';
    output.appendChild(imgElement);

    this._root.dataset.imageLoaded = true;
  }

  /**
   * @see https://stackoverflow.com/questions/5633264/javascript-get-image-dimensions
   */
  _setImageSize (ev, IMG) {
    console.debug('Load - image size:', ev);
    console.debug('natural:', IMG.naturalWidth, IMG.naturalHeight);
    console.debug('width,height:', IMG.width, IMG.height);
    console.debug('offsetW,offsetH:', IMG.offsetWidth, IMG.offsetHeight);

    this._dimElement.textContent = `Image size: ${IMG.naturalWidth} × ${IMG.naturalHeight} pixels`;

    this._root.style.setProperty('--img-width', IMG.naturalWidth);
    this._root.style.setProperty('--img-height', IMG.naturalHeight);
  }

  /** @DEPRECATED
   */
  _getExifData (IMG) {
    const { EXIF, META } = window;

    EXIF.enableXmp();
    EXIF.getData(IMG, function () {
      const allMetaData = EXIF.getAllTags(this);
      // var allMetaDataSpan = document.getElementById("allMetaDataSpan");
      META.innerHTML = JSON.stringify(allMetaData, null, '\t');
    });
  }
}

export default AppElement;
