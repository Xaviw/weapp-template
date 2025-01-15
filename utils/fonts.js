import { config } from '@/config';

const fonts = {
  MiSans: {
    100: '-Thin.ttf',
    200: '-ExtraLight.ttf',
    300: '-Light.ttf',
    400: '-Normal.ttf',
    500: '-Regular.ttf',
    600: '-Medium.ttf',
    700: '-Demibold.ttf',
    800: '-Semibold.ttf',
    900: '-Bold.ttf',
    1000: '-Heavy.ttf',
  },
};

/**
 * 注意安卓存在字体加载失败的情况，需要字体文件允许跨域 https://servicewechat.com
 * @param {'MiSans'} name - 字族名称
 * @param {object} options
 * @param {number} options.weight - 不传时加载 400 或 normal 字重对应字体，且不会设置 desc.weight
 * @param {boolean} options.global - 应用于全局，默认 false
 * @param {boolean} options.webview - 应用于 webview，默认 true
 * @param {boolean} options.native - 应用于 canvas，默认 false
 * @param {'normal' | 'italic' | 'oblique'} options.style
 * @param {'normal' | 'small-caps' | 'inherit'} options.variant
 */
export function loadFont(name, options) {
  const fontFamily = fonts[name];
  if (!fontFamily) {
    throw new Error(`没有定义字体${name}`);
  }

  const { weight, global, webview = true, native, style, variant } = options || {};

  const font = fontFamily[weight] || fontFamily[400] || fontFamily['normal'] || Object.values(fontFamily)[0];
  if (!font) {
    throw new Error(`没有定义字体${name}${font}`);
  }

  const desc = {};
  weight && (desc.weight = weight);
  style && (desc.style = style);
  variant && (desc.variant = variant);

  const scopes = [];
  webview && scopes.push('webview');
  native && scopes.push('native');

  wx.loadFontFace({
    family: name,
    source: `url(${config.cdn}/fonts/${name}${font})`,
    desc,
    scopes,
    global,
  });
}
