/**
 * This Javascript package creates Photoshop-like guides and rulers interface on a web page.
 *
 * @see https://github.com/mark-rolich/RulersGuides.js
 * @author Mark Rolich <mark.rolich@gmail.com> (original)
 */

import AppElement from './AppElement.js';
// import MyElement from 'https://nfreear.github.io/elements/src/MyElement.js';

class Ruler {
  constructor (type, size) {
    const ruler = document.createElement('div');
    let i = 0;
    let span = document.createElement('span');
    let label = null;
    let labelTxt = null;
    const spanFrag = document.createDocumentFragment();
    const cnt = Math.floor(size / 2);

    ruler.classList.add('ruler'); // Was: .className = 'ruler ' + type + ' unselectable';
    ruler.classList.add(type);
    ruler.classList.add('unselectable');

    for (i; i < cnt; i = i + 1) {
      span = span.cloneNode(false);

      if (i % 25 === 0) {
        // span.className = 'milestone';

        if (i > 0) {
          label = span.cloneNode(false);
          label.classList.add('label'); // .className = 'label';

          if (i < 50) {
            label.classList.add('l10');
          } else if (i >= 50 && i < 500) {
            label.classList.add('l100');
          } else if (i >= 500) {
            label.classList.add('l1000');
          }

          labelTxt = document.createTextNode(i * 2);
          label.appendChild(labelTxt);
          span.appendChild(label);
        }

        span.classList.add('milestone'); // .className = 'milestone';
      } else if (i % 5 === 0) {
        span.classList.add('major'); // .className = 'major';
      } else {
        span.className = '';
        span.removeAttribute('class');
      }

      spanFrag.appendChild(span);
    }

    ruler.appendChild(spanFrag);

    return ruler;
  }
}

export class RulersGuidesElement extends AppElement {
  static getTag () {
    return 'rulers-guides-v2';
  }

  connectedCallback () {
    // const size = this._getWindowSize();
    const hRuler = new Ruler('h', 3000);
    const vRuler = new Ruler('v', 7000);

    const wrapper = document.createElement('div');
    // Was: gInfoBlockWrapper = wrapper.cloneNode(false);

    wrapper.className = 'rg-overlay';
    // gInfoBlockWrapper.className = 'info-block-wrapper';

    // wrapper.style.width = (size[0]) + 'px';
    // wrapper.style.height = (size[1]) + 'px';

    wrapper.appendChild(hRuler);
    wrapper.appendChild(vRuler);
    // wrapper.appendChild(gInfoBlockWrapper);

    this.appendChild(wrapper);

    console.debug('rulers-guides-v2');
  }

  _getWindowSize () {
    return [
      window.innerWidth, window.innerHeight
    ];
  }
}

RulersGuidesElement.define();

/* End */
