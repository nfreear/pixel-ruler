/**
 * Mobile and touch device screen sizes (DATA ONLY).
 *
 * Source: Chrome mobile developer tools.
 *
 * @see https://github.com/JVillella/ios-screen-sizes (older)
 * @see https://size-charts.com/topics/screen-size-charts/apple-iphone-size/
 */

export const SCREEN_SIZE = [
  // Android.
  { name: 'Pixel 3/3 XL', width: 393, height: 768 },
  { name: 'Pixel 4', width: 353, height: 745 },
  { name: 'Pixel 4a/5', width: 393, height: 851 },
  { name: 'Samsung A52 5G', width: 412, height: 915 },
  { name: 'Samsung S22 Ultra', width: 385, height: 824 },

  // iOS.
  { name: 'iPad Air', width: 820, height: 1180 },
  { name: 'iPad/iPad Mini', width: 768, height: 1024 },
  { name: 'iPhone 6/7/8 Plus', width: 414, height: 736 },
  { name: 'iPhone 12 Pro', width: 390, height: 844 },
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone X', width: 375, height: 812 },
  { name: 'iPhone XR', width: 414, height: 896 }
];

export default SCREEN_SIZE;
