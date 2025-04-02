/* eslint-disable */
// prettier-ignore
/**
 * 获取值的内部 [[Class]] 属性，等同于 Object.prototype.toString.call
 * @param val - 要获取类型的值
 * @returns 返回形如 '[object Type]' 的字符串
 * @example
 * ```ts
 * objectToString([]) // '[object Array]'
 * objectToString({}) // '[object Object]'
 * objectToString(null) // '[object Null]'
 * objectToString(new Date()) // '[object Date]'
 * ```
 */
function objectToString(val) {
    return Object.prototype.toString.call(val);
}

/**
 * 判断值是否为数组
 * @param val - 要检查的值
 * @returns 如果值是数组，则返回 true，否则返回 false
 * @example
 * ```ts
 * isArray([1, 2, 3]) // true
 * isArray('hello') // false
 * ```
 */
function isArray(val) {
  if (Array.isArray) return Array.isArray(val);
  return objectToString(val) === '[object Array]';
}
/**
 * 判断值是否为函数
 * @param val - 要检查的值
 * @returns 如果值是函数，则返回 true，否则返回 false
 * @example
 * ```ts
 * isFunction(() => {}) // true
 * isFunction(123) // false
 * ```
 */
function isFunction(val) {
  return ['[object Function]', '[object GeneratorFunction]', '[object AsyncFunction]'].includes(objectToString(val));
}
/**
 * 判断值是否为 null 或者 undefined（void 0）
 * @param val - 要检查的值
 * @returns 如果值是null 或者 undefined（void 0），则返回 true，否则返回 false
 * @example
 * ```ts
 * isNil(null) // true
 * isNil(123) // false
 * ```
 */
function isNil(val) {
  return val == null;
}
/**
 * 判断值是否为数字
 * @param val - 要检查的值
 * @returns 如果值是数字，则返回 true，否则返回 false
 * @example
 * ```ts
 * isNumber(123) // true
 * isNumber('123') // false
 * ```
 */
function isNumber(val) {
  return objectToString(val) === '[object Number]';
}
/**
 * 判断值是否为对象（包括函数）
 * @param val - 要检查的值
 * @returns 如果值是对象，则返回 true，否则返回 false
 * @example
 * ```ts
 * isObject({}) // true
 * isObject(null) // false
 * ```
 */
function isObject(val) {
  const type = typeof val;
  return !!val && (type === 'function' || type === 'object');
}
/**
 * 判断值是否为字符串
 * @param val - 要检查的值
 * @returns 如果值是字符串，则返回 true，否则返回 false
 * @example
 * ```ts
 * isString('hello') // true
 * isString(123) // false
 * ```
 */
function isString(val) {
  return objectToString(val) === '[object String]';
}

/**
 * 简单 LRU (Least Recently Used) 缓存实现
 * @example
 * ```ts
 * const cache = new Lru(2)
 * cache.set('a', 1)
 * cache.set('b', 2)
 * cache.get('a') // 1
 * cache.set('c', 3) // 'b' 会被删除
 * ```
 */
class Lru {
  max;
  cache = new Map();
  /**
   * 创建一个新的 LRU 缓存实例
   * @param max - 缓存的最大容量，默认为 Infinity
   */
  constructor(max) {
    this.max = Number.parseInt(max) || Infinity;
  }
  /**
   * 检查缓存中是否存在指定的键
   * @param key - 要检查的键
   * @returns 如果键存在则返回 true，否则返回 false
   */
  has(key) {
    return this.cache.has(key);
  }
  /**
   * 从缓存中移除指定的键值对
   * @param key - 要移除的键
   */
  remove(key) {
    if (this.has(key)) this.cache.delete(key);
  }
  /**
   * 获取缓存中指定键的值，并将其移到最近使用的位置
   * @param key - 要获取的键
   * @returns 键对应的值，如果键不存在则返回 null
   */
  get(key) {
    if (!this.has(key)) return null;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  /**
   * 设置缓存中的键值对，如果缓存已满则移除最久未使用的项
   * @param key - 要设置的键
   * @param value - 要设置的值
   */
  set(key, value) {
    if (this.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.max) {
      const firstKey = this.cache.keys().next().value;
      firstKey && this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
  /**
   * 清空缓存
   */
  clear() {
    this.cache.clear();
  }
}

/**
 * 创建一个带有缓存功能的记忆化函数
 * @param fn - 需要被记忆化的原函数
 * @param options - 记忆化配置选项
 * @returns  返回一个带有缓存功能的新函数
 * @example
 * // 基本用法
 * const cachedFn = memo(expensiveFunction);
 *
 * // 使用自定义缓存键生成函数
 * const cachedFn = memo(userFetch, {
 *   key: (userId) => `user-${userId}`,
 *   expires: 60000 // 1分钟过期
 * });
 *
 * // 使用LRU缓存限制最大缓存数量
 * const cachedFn = memo(heavyComputation, {
 *   lruMax: 100
 * });
 */
function memo(fn, options) {
  /**
   * 记忆化后的函数
   * @param {...Args} args - 传递给原函数的参数
   * @returns {R} 原函数的返回值，可能来自缓存
   */
  function memoize(...args) {
    const key = isFunction(options?.key) ? options.key(...args) : JSON.stringify(args);
    const existing = memoize.cache.get(key);
    if (existing && (!existing.expires || existing.expires > Date.now())) {
      return existing.value;
    }
    const result = fn(...args);
    const expires = Number.parseInt(options?.expires) || null;
    memoize.cache.set(key, {
      value: result,
      expires: expires ? Date.now() + expires : null,
    });
    return result;
  }
  /**
   * 缓存存储对象
   * @type {Lru}
   */
  memoize.cache = new Lru(options?.lruMax);
  return memoize;
}

/**
 * 判断字符串是否为相对路径或绝对路径
 * @param str - 要检查的字符串
 * @returns 如果是相对路径或绝对路径则返回 true，否则返回 false
 */
function isPath(str) {
  if (!isString(str)) return false;
  return /^(?:\/|\.\/|\.\.\/)[\w/.-]*$/.test(str.trim());
}
/**
 * 判断字符串是否为有效的 Data URL
 * @param str - 要检查的字符串
 * @returns 如果是有效的 Data URL 则返回 true，否则返回 false
 * @example
 * ```ts
 * isDataUrl('data:image/png;base64,iVBORw0K...') // true
 * isDataUrl('https://example.com/image.png') // false
 * ```
 */
function isDataUrl(str) {
  if (!isString(str)) return false;
  // https://tools.ietf.org/html/rfc2397
  return /^data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z0-9-.!#$%*+{}|~`]+=[a-z0-9-.!#$%*+{}|~`]+)*)?(?:;base64)?,[\w!$&',()*+;=\-.~:@/?%\s]*$/i.test(
    str.trim(),
  );
}
/**
 * 判断字符串是否为有效的 URL（支持 localhost）
 * @param str - 要检查的字符串
 * @returns 如果是有效的 URL 则返回 true，否则返回 false
 * @example
 * ```ts
 * isUrl('https://example.com') // true
 * isUrl('http://localhost:3000') // true
 * ```
 */
function isUrl(str) {
  if (!isString(str)) return false;
  return /^(?:\w+:)?\/\/(?:[^\s.]+\.\S{2}|localhost)\S*$/.test(str);
}

const downloadImage = memo(
  (src, canvas) => {
    return new Promise((resolve, reject) => {
      {
        if (isPath(src)) {
          const image = canvas.createImage();
          image.onload = () => {
            resolve({ image, width: image.width, height: image.height });
          };
          image.onerror = reject;
          image.src = src;
        } else if (isUrl(src)) {
          const downloader = src.startsWith('cloud://') ? wx.cloud.downloadFile : wx.downloadFile;
          downloader({
            url: src,
            fileID: src,
            success: (file) => {
              if (file.statusCode !== 200) {
                reject(file);
                return;
              }
              const image = canvas.createImage();
              image.onload = () => {
                resolve({ image, width: image.width, height: image.height });
              };
              image.onerror = reject;
              image.src = file.tempFilePath;
            },
            fail: reject,
          });
        } else if (isDataUrl(src)) {
          const [, format, body] = /data:image\/(\w+);base64,(.*)/.exec(src) || [];
          const filePath = `${wx.env.USER_DATA_PATH}/${Date.now()}.${format}`;
          const buffer = wx.base64ToArrayBuffer(body.replace(/[\r\n]/g, ''));
          wx.getFileSystemManager().writeFile({
            filePath,
            data: buffer,
            encoding: 'binary',
            success: () => {
              const image = canvas.createImage();
              image.onload = () => {
                resolve({ image, width: image.width, height: image.height });
              };
              image.onerror = reject;
              image.src = filePath;
            },
            fail: reject,
          });
        } else {
          reject(src);
        }
      }
    });
  },
  {
    lruMax: 20,
    key(src) {
      return src;
    },
  },
);

/**
 * 遍历对象的每个键值并返回一个新对象，类似数组的 map 方法
 * @param obj - 要遍历的对象
 * @param iterator - 遍历函数，接收属性名和属性值作为参数，返回新的属性名和属性值元组
 * @returns 返回一个新对象，包含遍历函数处理后的结果
 * @throws 当 iterator 不是函数时抛出类型错误
 * @example
 * ```ts
 * mapObject({ a: 1, b: 2 }, (key, val) => [key, val * 2]) // { a: 2, b: 4 }
 * mapObject({ x: 'hello', y: 'world' }, (key, val) => [key.toUpperCase(), `${key}_${val}`])
 * // { X: 'x_hello', Y: 'y_world' }
 * mapObject({}, (key, val) => [key, val]) // {}
 * ```
 */
function mapObject(obj, iterator) {
  if (!isObject(obj)) return obj;
  if (!isFunction(iterator)) throw new TypeError('iterator 应该是一个函数');
  const result = {};
  Object.keys(obj).forEach((key) => {
    const [k, v] = iterator(key, obj[key]);
    result[k] = v;
  });
  return result;
}

/**
 * 绘制元素旋转
 * @param rotate - 旋转角度
 * @param options
 * @param options.x - 旋转容器左上角 x
 * @param options.y - 旋转容器左上角 y
 * @param options.width - 旋转容器宽度
 * @param options.height - 旋转容器高度
 * @web
 * @miniprogram
 */
function rotateCanvasElement(rotate, options) {
  if (isNumber(rotate)) {
    const { x, y, width, height, ctx } = options;
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);
  }
}
function saveCanvasAsImage(canvas, options) {
  let { type, quality, fileName } = isObject(options) ? options : {};
  type = isString(type) && type.startsWith('image/') ? type : undefined;
  quality = isNumber(quality) && quality > 0 && quality <= 1 ? quality : 1;
  return new Promise((resolve, reject) => {
    {
      wx.canvasToTempFilePath({
        canvas,
        fileType: type === 'image/jpeg' ? 'jpg' : 'png',
        quality,
        success({ tempFilePath }) {
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success() {
              resolve(tempFilePath);
            },
            fail(err) {
              reject(err);
            },
          });
        },
        fail(err) {
          reject(err);
        },
      });
    }
  });
}

/**
 * canvas 实例属性绘制策略
 */
const canvasPropsStrategies = {
  lineWidth(lineWidth, ctx) {
    if (isNumber(lineWidth)) ctx.lineWidth = lineWidth;
  },
  lineDash(lineDash, ctx) {
    if (isArray(lineDash) && lineDash.every(isNumber)) ctx.setLineDash(lineDash);
  },
  lineDashOffset(lineDashOffset, ctx) {
    if (isNumber(lineDashOffset)) ctx.lineDashOffset = lineDashOffset;
  },
  lineCap(lineCap, ctx) {
    if (lineCap && ['butt', 'round', 'square'].includes(lineCap)) ctx.lineCap = lineCap;
  },
  lineJoin(lineJoin, ctx) {
    if (lineJoin && ['round', 'bevel', 'miter'].includes(lineJoin)) ctx.lineJoin = lineJoin;
  },
  miterLimit(miterLimit, ctx) {
    if (isNumber(miterLimit)) ctx.miterLimit = miterLimit;
  },
  fillStyle(fillStyle, ctx) {
    if (fillStyle) ctx.fillStyle = fillStyle;
  },
  strokeStyle(strokeStyle, ctx) {
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
  },
  shadowColor(shadowColor, ctx) {
    if (isString(shadowColor)) ctx.shadowColor = shadowColor;
  },
  shadowBlur(shadowBlur, ctx) {
    if (isNumber(shadowBlur)) ctx.shadowBlur = shadowBlur;
  },
  shadowOffsetX(shadowOffsetX, ctx) {
    if (isNumber(shadowOffsetX)) ctx.shadowOffsetX = shadowOffsetX;
  },
  shadowOffsetY(shadowOffsetY, ctx) {
    if (isNumber(shadowOffsetY)) ctx.shadowOffsetY = shadowOffsetY;
  },
  wordSpacing(wordSpacing, ctx) {
    if (isNumber(wordSpacing)) ctx.wordSpacing = `${wordSpacing}px`;
  },
  letterSpacing(letterSpacing, ctx) {
    if (isNumber(letterSpacing)) ctx.letterSpacing = `${letterSpacing}px`;
  },
  textBaseLine(textBaseLine, ctx) {
    if (isString(textBaseLine)) ctx.textBaseline = textBaseLine;
  },
};
canvasPropsStrategies.color = canvasPropsStrategies.backgroundColor = canvasPropsStrategies.fillStyle;
canvasPropsStrategies.color = canvasPropsStrategies.lineColor = canvasPropsStrategies.strokeStyle;
canvasPropsStrategies.borderColor = canvasPropsStrategies.lineColor = canvasPropsStrategies.strokeStyle;
canvasPropsStrategies.borderDash = canvasPropsStrategies.lineDash;
canvasPropsStrategies.borderDashOffset = canvasPropsStrategies.lineDashOffset;
/**
 * 设置 canvas 实例属性
 * @param props 实例属性对象
 */
function settingCanvasProps(props, ctx) {
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      canvasPropsStrategies[key]?.(props[key], ctx);
    }
  }
  const borderSize = Math.max(Number.parseFloat(props.borderSize) || 0, 0);
  if (borderSize) {
    if (props.borderStyle === 'dashed' && !props.borderDash) ctx.setLineDash([borderSize * 2, borderSize]);
    else if (props.borderStyle === 'solid' && props.borderDash) ctx.setLineDash([]);
  }
  if (props.fontStyle && props.fontWeight && props.fontSize && props.fontFamily)
    ctx.font = `${props.fontStyle} ${props.fontWeight} ${props.fontSize}px '${props.fontFamily}'`;
  return borderSize;
}

/**
 * 绘制 canvas 线条
 * @web
 * @miniprogram
 */
function renderLine(configs, options) {
  const { ctx, width: canvasWidth, height: canvasHeight } = options;
  ctx.save();
  // 参数标准化
  const { x, y, width, height, points } = lineStrategy(
    { type: 'line', ...configs },
    { width: canvasWidth, height: canvasHeight, x: 0, y: 0 },
  );
  if (points.length < 2) return;
  // 设置 canvas 属性
  settingCanvasProps(configs, ctx);
  // 旋转
  if (configs.rotate) rotateCanvasElement(configs.rotate, { x, y, width, height, ctx });
  // 绘制
  const [first, ...rest] = points;
  ctx.beginPath();
  ctx.moveTo(...first);
  rest.forEach((item) => ctx.lineTo(...item));
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

/**
 * 绘制全部段落
 */
function enhancedDraw(text, options) {
  let { content, textAlign, lineClamp, ellipsisContent } = text;
  lineClamp = isNumber(lineClamp) && lineClamp > 0 ? lineClamp : Infinity;
  ellipsisContent = isString(ellipsisContent) ? ellipsisContent : '...';
  const { ctx, maxWidth, x, y } = options;
  ctx.save();
  const baseProps = settingProperty(text, { ctx });
  let contents = isArray(content) ? [...content] : [{ content }];
  let yOffset = 0;
  let rowNum = 1;
  while (contents.length) {
    const { top, bottom, content } = measureRowHeight(contents, {
      ctx,
      maxWidth,
      baseProps,
      suffix: rowNum === lineClamp ? ellipsisContent : '',
    });
    const readyLength = content.length;
    const origin = contents[readyLength - 1];
    const last = content[readyLength - 1];
    const lastReady = last.content.length === origin.content.length;
    yOffset += top;
    // 最后一行
    let alignOffset = 0;
    if (content.length === contents.length && lastReady) {
      const rowWidth = content.reduce((p, c) => p + c.width, 0);
      if (textAlign === 'center') alignOffset = (maxWidth - rowWidth) / 2;
      if (textAlign === 'right') alignOffset = maxWidth - rowWidth;
    }
    content.forEach((item) => {
      const {
        backgroundColor,
        overLineY,
        xOffset,
        width,
        underLineY,
        textDecorationProps,
        textDecoration,
        color,
        lineThroughY,
      } = item;
      if (backgroundColor) {
        renderRect(
          {
            type: 'rect',
            top: y + yOffset + overLineY,
            left: x + xOffset + alignOffset,
            backgroundColor,
            width,
            height: Math.abs(overLineY) + Math.abs(underLineY),
          },
          { ctx, width: 100, height: 100 },
        );
      }
      ctx.save();
      settingProperty(item, { ctx, baseProps });
      draw(item, { ctx, baseProps, x: x + xOffset + alignOffset, y: y + yOffset });
      if (['overline', 'line-through', 'underline'].includes(textDecoration)) {
        const offsetY =
          textDecoration === 'overline' ? overLineY : textDecoration === 'line-through' ? lineThroughY : underLineY;
        const halfLine =
          textDecorationProps.lineWidth && textDecorationProps.lineWidth > 0 ? textDecorationProps.lineWidth / 2 : 0.5;
        const halfLineOffset =
          textDecoration === 'overline' ? -halfLine : textDecoration === 'underline' ? halfLine : 0;
        renderLine(
          {
            points: [
              [x + xOffset + alignOffset, y + yOffset + offsetY + halfLineOffset],
              [x + xOffset + alignOffset + width, y + yOffset + offsetY + halfLineOffset],
            ],
            ...textDecorationProps,
            lineColor: textDecorationProps.lineColor || color,
          },
          {
            ctx,
            width: 100,
            height: 100,
          },
        );
      }
      ctx.restore();
    });
    if (rowNum === lineClamp) {
      contents = [];
    } else {
      yOffset += bottom;
      contents = contents.slice(lastReady ? readyLength : readyLength - 1);
      if (!lastReady) {
        contents[0] = { ...contents[0], content: contents[0].content.slice(last.content.length) };
      }
    }
    rowNum++;
  }
  ctx.restore();
}
/**
 * 测量全部段落总高度
 */
function enhancedMeasure(text, options) {
  let { lineClamp, content } = text;
  lineClamp = isNumber(lineClamp) && lineClamp > 0 ? lineClamp : Infinity;
  const { ctx, maxWidth } = options;
  ctx.save();
  const baseProps = settingProperty(text, { ctx });
  let contents = isArray(content) ? [...content] : [{ content }];
  let height = 0;
  let rowNum = 1;
  while (contents.length) {
    const { top, bottom, content } = measureRowHeight(contents, { ctx, maxWidth, baseProps });
    height += top + bottom;
    if (rowNum < lineClamp) {
      rowNum++;
      const readyLength = content.length;
      const origin = contents[readyLength - 1];
      const last = content[readyLength - 1];
      const lastReady = last.content.length === origin.content.length;
      contents = contents.slice(lastReady ? readyLength : readyLength - 1);
      if (!lastReady) {
        contents[0] = { ...contents[0], content: contents[0].content.slice(last.content.length) };
      }
    } else {
      contents = [];
    }
  }
  ctx.restore();
  return height;
}
/**
 * 计算文本首行基线上下部分高度（含行高）
 */
function measureRowHeight(contents, options) {
  const { ctx, maxWidth, baseProps } = options;
  const top = [];
  const bottom = [];
  const renderable = [];
  let line = '';
  let xOffset = 0;
  // 每一段
  for (let pi = 0; pi < contents.length; pi++) {
    const p = contents[pi];
    ctx.save();
    const props = settingProperty(p, { ctx, baseProps });
    const suffix = isString(options.suffix) ? options.suffix : '';
    const suffixWidth = isString(options.suffix) ? measure({ ...props, content: options.suffix }, { ctx }).width : 0;
    // 每个字
    for (let i = 0; i < p.content.length; i++) {
      line += p.content[i];
      const { width, fontBoundingBoxAscent, fontBoundingBoxDescent } = measure(
        { ...p, content: line + suffix },
        { ctx, baseProps },
      );
      const isEnd = i === p.content.length - 1;
      // 满一行或一段结束
      if (width + xOffset > maxWidth || isEnd) {
        // 文本高度
        const height = fontBoundingBoxAscent + fontBoundingBoxDescent;
        // 行高在基线上下平分
        const halfLineHeight = (calcSize(props.lineHeight, height) - height) / 2;
        console.log(fontBoundingBoxAscent, fontBoundingBoxDescent);
        // 存储每一段文本的基线上下高度
        top.push(fontBoundingBoxAscent + halfLineHeight);
        bottom.push(fontBoundingBoxDescent + halfLineHeight);
        const baseLine = props.textBaseLine;
        const overLineY = -fontBoundingBoxAscent;
        let lineThroughY = -(height / 2) + fontBoundingBoxDescent;
        const underLineY = fontBoundingBoxDescent;
        if (['top', 'hanging'].includes(baseLine)) {
          lineThroughY = height / 2 - fontBoundingBoxAscent;
        } else if (baseLine === 'middle') {
          lineThroughY = 0;
        }
        renderable.push({
          ...props,
          content: isEnd ? line : line.slice(0, -1) + suffix,
          overLineY,
          lineThroughY,
          underLineY,
          xOffset,
          width: isEnd ? width - suffixWidth : width,
        });
        // 满一行
        if (width + xOffset > maxWidth) {
          ctx.restore();
          return {
            top: Math.max(...top),
            bottom: Math.max(...bottom),
            content: renderable,
          };
        }
        // 一段结束
        if (isEnd) {
          xOffset += width;
          line = '';
        }
      }
    }
    ctx.restore();
  }
  return {
    top: Math.max(...top),
    bottom: Math.max(...bottom),
    content: renderable,
  };
}
/**
 * 绘制文本
 */
function draw(content, options) {
  const { ctx, baseProps, x, y } = options;
  ctx.save();
  const props = settingProperty(content, { ctx, baseProps });
  const draw = (props.textStyle === 'stroke' ? ctx.strokeText : ctx.fillText).bind(ctx);
  if (!isNil(x) && !isNil(y)) {
    draw(content.content, x, y);
  }
  ctx.restore();
}
/**
 * 测量文本
 */
function measure(content, options) {
  const { ctx, baseProps } = options;
  ctx.save();
  settingProperty(content, { ctx, baseProps });
  const metrics = ctx.measureText(content.content);
  ctx.restore();
  return metrics;
}
/**
 * 设置字体相关属性，并返回标准化后的 baseProps 所需属性
 */
function settingProperty(properties, options) {
  const props = { ...properties };
  const { ctx, baseProps = {} } = options;
  const strategies = {
    lineHeight: [(v) => isNumber(v) || (isString(v) && v.endsWith('%')), '120%'],
    fontSize: [isNumber, 'normal'],
    fontFamily: [isString, 'sans-serif'],
    fontWeight: [(v) => [100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold'].includes(v), 'normal'],
    color: [(v) => isString(v) || isObject(v)],
    textBaseLine: [
      (v) => ['alphabetic', 'bottom', 'hanging', 'ideographic', 'middle', 'top'].includes(v),
      'alphabetic',
    ],
    letterSpacing: [isNumber],
    wordSpacing: [isNumber],
    fontStyle: [(v) => ['italic', 'normal'].includes(v), 'normal'],
    textDecoration: [(v) => ['underline', 'overline', 'line-through'].includes(v)],
    textDecorationProps: [isObject, {}],
    textStyle: [(v) => ['fill', 'stroke'].includes(v), 'fill'],
    strokeProps: [isObject, {}],
    backgroundColor: [(v) => isString(v) || isObject(v)],
    shadowBlur: [isNumber],
    shadowColor: [isString],
    shadowOffsetX: [(v) => isNumber(v) || (isString(v) && v.endsWith('%'))],
    shadowOffsetY: [(v) => isNumber(v) || (isString(v) && v.endsWith('%'))],
  };
  Object.entries(strategies).forEach(([key, value]) => {
    if (!value[0](props[key])) {
      props[key] = baseProps[key] || value[1];
    }
  });
  // // 设置 canvas 属性
  settingCanvasProps(
    {
      ...props,
      ...props.strokeProps,
      fillStyle: props.color,
      strokeStyle: props.color,
      backgroundColor: undefined,
    },
    ctx,
  );
  return props;
}

/**
 * 标准盒子元素参数规范化
 */
const standardStrategy = memo(
  (props, options) => {
    const { width: containerWidth, height: containerHeight, x: containerX, y: containerY } = options;
    const normalizeOptions = mapObject(props, (key, value) => {
      if (isNil(value) || !['top', 'right', 'bottom', 'left', 'width', 'height'].includes(key)) return [key, value];
      const isVertical = ['top', 'bottom', 'height'].includes(key);
      return [key, calcSize(value, isVertical ? containerHeight : containerWidth) || undefined];
    });
    const { top, right, bottom, left, width: elementWidth, height: elementHeight } = normalizeOptions;
    let x = 0;
    let y = 0;
    let width = 0;
    let height = 0;
    if (!isNil(elementWidth)) {
      width = elementWidth;
      if (!isNil(left)) x = left;
      else if (!isNil(right)) x = containerWidth - right - width;
      else x = 0;
    } else {
      x = left || 0;
      const x2 = right || 0;
      width = containerWidth - x - x2;
    }
    if (!isNil(elementHeight)) {
      height = elementHeight;
      if (!isNil(top)) y = top;
      else if (!isNil(bottom)) y = containerHeight - bottom - height;
      else y = 0;
    } else {
      y = top || 0;
      const y2 = bottom || 0;
      height = containerHeight - y - y2;
    }
    return {
      x: containerX + x,
      left: containerX + x,
      y: containerY + y,
      top: containerY + y,
      right: undefined,
      bottom: undefined,
      width,
      height,
    };
  },
  {
    key(props, options) {
      const { top, right, bottom, left, width, height } = props;
      const { width: containerWidth, height: containerHeight, x: containerX, y: containerY } = options;
      return JSON.stringify({
        top,
        right,
        bottom,
        left,
        width,
        height,
        containerWidth,
        containerHeight,
        containerX,
        containerY,
      });
    },
    lruMax: 20,
  },
);
/**
 * 线条参数规范化
 */
const lineStrategy = memo(
  (props, options) => {
    const [first = [0, 0], ...points] = props?.points || [];
    const { width, height, x, y } = options;
    const [firstX, firstY] = first.map((item, index) => calcSize(item, [width, height][index]));
    let minX = firstX;
    let minY = firstY;
    let maxX = firstX;
    let maxY = firstY;
    if (!points.length) return { points: [] };
    const normalizedPoints = points.reduce((p, c) => {
      const [pointX, pointY] = (isArray(c) ? c : []).map((item, index) => calcSize(item, [width, height][index]));
      if ([pointX, pointY].some(Number.isNaN)) return p;
      minX = Math.min(minX, pointX);
      minY = Math.min(minY, pointY);
      maxX = Math.max(maxX, pointX);
      maxY = Math.max(maxY, pointY);
      return [...p, [pointX, pointY]];
    }, []);
    return {
      width: maxX - minX || 1,
      height: maxY - minY || 1,
      x: x + minX,
      y: y + minY,
      points: [[firstX, firstY], ...normalizedPoints].map(([pointX, pointY]) => [x + pointX, y + pointY]),
    };
  },
  {
    key(props, options) {
      const { points } = props;
      const { width, height, x, y } = options;
      return JSON.stringify({ points, width, height, x, y });
    },
    lruMax: 20,
  },
);
const textStrategy = memo((props, options, canvasOptions) => {
  const box = standardStrategy(props, options);
  if (isNil(props.height) && isNil(props.bottom))
    box.height = enhancedMeasure(props, { maxWidth: box.width, ctx: canvasOptions.ctx });
  return box;
});
const normalizeStrategies = {
  rect: standardStrategy,
  text: textStrategy,
  image: standardStrategy,
  line: lineStrategy,
};
/**
 * 绘制参数标准化中间层
 */
function normalizeElement(element, elements, options) {
  const { width, height } = options;
  const strategy = normalizeStrategies[element.type];
  if (!element.relativeTo) return strategy(element, { width, height, x: 0, y: 0 }, options);
  const relativeElement = elements.find((item) => !isFunction(item) && item.id === element.relativeTo);
  if (!relativeElement) return strategy(element, { width, height, x: 0, y: 0 }, options);
  const { x, y, width: containerWidth, height: containerHeight } = normalizeElement(relativeElement, elements, options);
  return strategy(element, { width: containerWidth, height: containerHeight, x, y }, options);
}
/**
 * 标准化数值与百分比字符串
 */
function calcSize(val, base) {
  if (isString(val) && val.endsWith('%')) return (base * Number.parseFloat(val)) / 100;
  return Number.parseFloat(val);
}

/**
 * 绘制 Canvas 矩形
 * @web
 * @miniprogram
 */
function renderRect(renderOptions, contextOptions) {
  const { ctx, width: canvasWidth, height: canvasHeight } = contextOptions;
  ctx.save();
  // 参数标准化
  const { x, y, width, height } = standardStrategy(renderOptions, {
    width: canvasWidth,
    height: canvasHeight,
    x: 0,
    y: 0,
  });
  if (!width || !height) return;
  const { rotate, borderRadius, backgroundColor } = renderOptions;
  // 旋转
  if (rotate) rotateCanvasElement(rotate, { x, y, width, height, ctx });
  // canvas 属性设置
  const borderSize = settingCanvasProps(renderOptions, ctx);
  ctx.save();
  const r = radiusClipPath({ x, y, width, height, borderRadius, ctx, borderSize });
  // 填充
  if (backgroundColor) ctx.fill();
  // 绘制 border
  // border 较粗时，外边缘圆角会大于需要的圆角，所以采用裁剪
  renderBorder({ x, y, width, height, r, borderSize, ctx });
  ctx.restore();
  ctx.restore();
}
/**
 * canvas 圆角矩形
 * @param options
 * @web
 * @miniprogram
 */
function roundRect(options) {
  let { x, y, w, h, r, ctx } = options;
  const min_size = Math.min(w, h);
  if (r > min_size / 2) r = min_size / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function radiusClipPath(options) {
  const { x, y, width, height, borderRadius, borderSize, ctx } = options;
  // 圆角半径标准化
  let r = Number.parseFloat(borderRadius) || 0;
  if (isString(borderRadius) && borderRadius.endsWith('%')) r = (r * width) / 100;
  // 圆角裁剪路径
  roundRect({
    x: x - borderSize,
    y: y - borderSize,
    w: width + 2 * borderSize,
    h: height + 2 * borderSize,
    r,
    ctx,
  });
  ctx.clip();
  return r;
}
function renderBorder(options) {
  const { x, y, width, height, r, borderSize, ctx } = options;
  if (borderSize) {
    ctx.lineWidth = borderSize * 2;
    roundRect({
      x: x - borderSize,
      y: y - borderSize,
      w: width + 2 * borderSize,
      h: height + 2 * borderSize,
      r,
      ctx,
    });
    ctx.stroke();
  }
}
/**
 * 接收 dpr 判断是否可用，不可用则获取设备 dpr
 */
function getDpr(dpr) {
  if (isNumber(dpr) && dpr > 0) return dpr;
  {
    const { pixelRatio } = wx.getWindowInfo();
    return pixelRatio;
  }
}

/**
 * 绘制 Canvas 图片
 * @web
 * @miniprogram
 */
async function renderImage(renderOptions, contextOptions) {
  const { ctx, canvas, width: canvasWidth, height: canvasHeight } = contextOptions;
  ctx.save();
  // 参数标准化
  const { x, y, width, height } = standardStrategy(renderOptions, {
    width: canvasWidth,
    height: canvasHeight,
    x: 0,
    y: 0,
  });
  const { rotate, borderRadius, src, flipX, flipY } = renderOptions;
  // 获取图片
  let image;
  let imageWidth;
  let imageHeight;
  try {
    const res = await downloadImage(src, canvas);
    image = res.image;
    imageWidth = res.width;
    imageHeight = res.height;
  } catch (err) {
    console.warn(`图片加载失败：`, err);
    ctx.restore();
    return;
  }
  // 旋转
  if (rotate) rotateCanvasElement(rotate, { x, y, width, height, ctx });
  // canvas 属性设置
  const borderSize = settingCanvasProps(renderOptions, ctx);
  ctx.save();
  const r = radiusClipPath({ x, y, width, height, borderRadius, ctx, borderSize });
  // 翻转
  ctx.save();
  const drawProps = calcDrawProps({ ...renderOptions, x, y, width, height, imageWidth, imageHeight });
  ctx.translate(flipX ? canvasWidth : 0, flipY ? canvasHeight : 0);
  ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
  if (flipX || flipY) {
    const [dx, dy, dWidth, dHeight] = drawProps.slice(4);
    drawProps[4] = flipX ? canvasWidth - dx - dWidth : dx;
    drawProps[5] = flipY ? canvasHeight - dy - dHeight : dy;
  }
  // 绘制图片
  ctx.drawImage(image, ...drawProps);
  ctx.restore();
  // 绘制边框
  // border 去掉 shadow
  ctx.shadowColor = '#00000000';
  // border 较粗时，外边缘圆角会大于需要的圆角，所以采用裁剪
  renderBorder({ x, y, width, height, r, borderSize, ctx });
  ctx.restore();
  ctx.restore();
}
/**
 * 计算 drawImage 参数
 */
function calcDrawProps(options) {
  let { x, y, width, height, imageWidth, imageHeight, sourceX, sourceY, sourceWidth, sourceHeight, mode } = options;
  sourceX = calcSize(sourceX, imageWidth) || 0;
  sourceY = calcSize(sourceY, imageHeight) || 0;
  sourceWidth = calcSize(sourceWidth, imageWidth) || imageWidth;
  sourceHeight = calcSize(sourceHeight, imageHeight) || imageHeight;
  if (width && height) {
    const imageRatio = sourceWidth / sourceHeight;
    const containerRatio = width / height;
    // 默认的 scaleToFill 无需处理
    if (mode === 'aspectFill') {
      if (containerRatio > imageRatio) {
        // 宽度填满，高度裁剪
        const newHeight = sourceWidth / containerRatio;
        sourceHeight = newHeight;
      } else {
        // 高度填满，宽度裁剪
        const newWidth = sourceHeight * containerRatio;
        sourceWidth = newWidth;
      }
    } else if (mode === 'aspectFit') {
      if (containerRatio > imageRatio) {
        // 高度填满，宽度留白
        const newWidth = height * imageRatio;
        x += (width - newWidth) / 2;
        width = newWidth;
      } else {
        // 宽度填满，高度留白
        const newHeight = width / imageRatio;
        y += (height - newHeight) / 2;
        height = newHeight;
      }
    }
  }
  // 宽高仅设置了一个的时候，根据图片比例设置另一个
  else if (width || height) {
    if (width) height = (sourceHeight * sourceWidth) / width;
    if (height) width = (sourceWidth * sourceHeight) / height;
  }
  // 未设置宽高时使用图片宽高
  else {
    width = sourceWidth;
    height = sourceHeight;
  }
  return [sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height];
}

/**
 * 绘制 Canvas 文字
 * @web
 * @miniprogram
 */
function renderText(renderOptions, contextOptions) {
  const { width: canvasWidth, height: canvasHeight, ctx } = contextOptions;
  // 参数标准化
  const { x, y, width, height } = textStrategy(
    renderOptions,
    { width: canvasWidth, height: canvasHeight, x: 0, y: 0 },
    contextOptions,
  );
  // 旋转
  if (renderOptions.rotate) rotateCanvasElement(renderOptions.rotate, { x, y, width, height, ctx });
  // 裁剪区域
  ctx.save();
  ctx.rect(x, y, width, height);
  ctx.clip();
  // 绘制
  enhancedDraw(renderOptions, { maxWidth: width, ctx, x, y });
  ctx.restore();
}

/**
 * 配置式生成 Canvas 海报
 * @web
 * @miniprogram
 */
async function canvasPoster(elements, options) {
  let { node: canvas, width, height, dpr } = options;
  width = Number.parseFloat(width);
  height = Number.parseFloat(height);
  dpr = getDpr(dpr);
  if (!isArray(elements) || !isFunction(canvas?.getContext) || !width || !height) {
    console.error(`请传入正确的参数，当前 elements：${elements}、options：${options}`);
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('获取 Canvas 上下文失败');
    return;
  }
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);
  const contextOptions = { ctx, canvas, width, height };
  // 图片预加载
  elements.forEach((element) => {
    if (!isFunction(element) && element.type === 'image' && element.src) {
      downloadImage(element.src, canvas);
    }
  });
  // 绘制元素
  for (let i = 0, l = elements.length; i < l; i++) {
    // 校验配置
    const element = elements[i];
    if (!isObject(element) || (!isFunction(element) && !['text', 'image', 'rect', 'line'].includes(element.type))) {
      console.warn(`请检查配置：${element}`);
      continue;
    }
    // 优先使用自定义渲染函数
    if (isFunction(element)) {
      ctx.save();
      await element({ ctx: ctx, canvas: canvas, dpr });
      ctx.restore();
      continue;
    }
    const normalized = normalizeElement(element, elements, contextOptions);
    switch (element.type) {
      case 'line':
        renderLine({ ...element, ...normalized }, contextOptions);
        break;
      case 'rect':
        renderRect({ ...element, ...normalized }, contextOptions);
        break;
      case 'image':
        await renderImage({ ...element, ...normalized }, contextOptions);
        break;
      case 'text':
        renderText({ ...element, ...normalized }, contextOptions);
        break;
    }
  }
}

/**
 * 将微信小程序的回调式异步 API 转换为 Promise 形式
 * @param method - 要转换的异步方法（如 wx.request、wx.login 等）
 * @param options - 方法的配置参数（不包含 success、fail 回调）
 * @returns 返回 Promise 对象，resolve 时传入 success 回调的参数，reject 时传入 fail 回调的参数
 * @example
 * ```ts
 * // 转换 wx.login 接口
 * const res = await wxPromisify(wx.login, {})
 * console.log(res.code)
 *
 * // 转换 wx.request 接口
 * const res = await wxPromisify(wx.request, {
 *   url: 'https://api.example.com/data',
 *   method: 'GET'
 * })
 * console.log(res.data)
 * ```
 * @miniprogram
 */
function wxPromisify(method, options) {
  return new Promise((resolve, reject) => {
    method({
      ...options,
      success: resolve,
      fail: reject,
    });
  });
}

export { canvasPoster, saveCanvasAsImage, wxPromisify };
