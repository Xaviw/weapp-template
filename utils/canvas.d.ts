/* eslint-disable */
// prettier-ignore
type Fn<Args = any[], Res = any> = (...args: Args) => Res

type AsyncFn<Args = any[], Res = any> = (...args: Args) => Promise<Res>;

type Key = keyof any;

type Recordable<T = any> = Record<Key, T>;

type MaybePromise$1<T = any> = Promise<T> | T;

type CallbackifyParams<T extends Fn> = Parameters<T>[0] extends Recordable
  ? Omit<Parameters<T>[0], 'success' | 'fail' | 'complete'>
  : object;

type CallbackifyResults<T extends Fn> = Parameters<T>[0]['success'] extends Fn
  ? Parameters<Parameters<T>[0]['success']>
  : never;

interface CancelableFunction<F extends Fn> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): ReturnType<F> | void;
  cancel: () => void;
}

type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>;
};

type PartiallyRequired<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};

type PartiallyPartial<T, K extends keyof T> = T & {
  [P in K]?: T[P];
};

type Canvas = WechatMiniprogram.Canvas;

type CanvasContext = WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D;

/**
 * poster 基础配置
 */
interface PosterOptions {
  /**
   * canvas 节点
   */
  node: Canvas;
  /**
   * 海报设计图宽度
   */
  width: number;
  /**
   * 海报设计图高度
   */
  height: number;
  /**
   * 像素比，默认会自动获取设备 drp
   */
  dpr?: number;
}

/**
 * poster 配置式绘制项
 */
type PosterElement = (PosterText | PosterImage | PosterRect | PosterLine) & {
  /**
   * 用于相对定位
   */
  id?: string;
  /**
   * 相对于某个 id 对应的元素进行定位（注意避免循环依赖）
   */
  relativeTo?: string;
};

/**
 * poster 函数式绘制项
 */
interface PosterRenderFunction {
  /**
   * 手动绘制或设置上下文属性，支持异步
   * @param ctx - canvas 上下文
   * @param canvas - canvas 节点
   * @param dpr - 当前画布采用的 dpr
   */
  (options: { ctx: CanvasContext; canvas: Canvas; dpr: number }): MaybePromise<void>;
}

/**
 * 支持数字；或参数为父容器宽度、高度的对象，返回值为数字的函数
 * @example
 * ```ts
 * 10
 * ({ containerWidth, containerHeight }) => containerWidth * 0.5 + containerHeight * 0.5
 * ```
 */
type NumberWithContainer = number | Fn<[{ containerWidth: number; containerHeight: number }], number>;

/**
 * poster 绘制公共配置
 */
interface PosterElementCommonOptions {
  width?: NumberWithContainer;
  height?: NumberWithContainer;
  top?: NumberWithContainer;
  right?: NumberWithContainer;
  bottom?: NumberWithContainer;
  left?: NumberWithContainer;
  /**
   * 旋转角度，注意旋转不会改变元素盒模型，不会影响子元素相对定位
   */
  rotate?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowBlur?: number;
  shadowColor?: string;
}

/**
 * poster 文字元素公共配置
 */
interface PosterTextCommonOptions
  extends Pick<PosterElementCommonOptions, 'shadowBlur' | 'shadowColor' | 'shadowOffsetX' | 'shadowOffsetY'> {
  content: string;
  /**
   * 数值或参数为字体高度，返回值为数值的函数
   * @default
   * (h: number) => 1.2 * h
   */
  lineHeight?: number | Fn<[number], number>;
  /**
   * @default 16
   */
  fontSize?: number;
  /**
   * @default 'sans-serif'
   */
  fontFamily?: string;
  fontFamilySrc?: string;
  /**
   * @default 'normal'
   */
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold';
  color?: string | CanvasGradient | CanvasPattern;
  /**
   * 基线位置为起点 Y 坐标加基线上方文字高度（含上方的lineHeight）
   * @default 'alphabetic'
   */
  textBaseLine?: CanvasTextBaseline;
  letterSpacing?: number;
  wordSpacing?: number;
  /**
   * @default 'normal'
   */
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'underline' | 'overline' | 'line-through';
  textDecorationProps?: Pick<
    PosterLine,
    'lineCap' | 'lineColor' | 'lineDash' | 'lineDashOffset' | 'lineJoin' | 'lineWidth' | 'miterLimit'
  >;
  /**
   * 填充或镂空
   * @default 'fill'
   */
  textStyle?: 'fill' | 'stroke';
  /**
   * 仅 text=stroke 时生效
   */
  strokeProps?: Pick<PosterLine, 'lineCap' | 'lineDash' | 'lineDashOffset' | 'lineJoin' | 'lineWidth' | 'miterLimit'>;
  /**
   * 文字底色
   */
  backgroundColor?: string | CanvasGradient | CanvasPattern;
}

/**
 * poster 文本
 */
interface PosterText extends PosterTextCommonOptions, PosterElementCommonOptions {
  type: 'text';
  /**
   * 文本内容，支持空格，不支持其他控制字符；为数组时可以分别设置样式
   */
  content: string | PosterTextCommonOptions[];
  /**
   * 最大行数，超出省略显示
   * height 小于内容高度时，会进行裁剪
   */
  lineClamp?: number;
  /**
   * 超出省略时展示的字符
   * @default '...'
   */
  ellipsisContent?: string;
  /**
   * 容器内的对齐方式
   * @default 'left'
   */
  textAlign?: 'left' | 'center' | 'right';
}

/**
 * 支持数值或参数以容器宽、高，自身宽、高为参数，返回值为数值的函数
 * @example
 * ```ts
 * 10
 * ({ containerWidth, containerHeight, selfWidth, selfHeight }) => 10
 * ```
 */
type NumberWithContainerAndSelf =
  | number
  | Fn<[{ containerWidth: number; containerHeight: number; selfWidth: number; selfHeight: number }], number>;

/**
 * poster 图片
 */
interface PosterImage
  extends Omit<PosterElementCommonOptions, 'top' | 'right' | 'bottom' | 'left' | 'width' | 'height'>,
    Pick<PosterRect, 'border' | 'borderRadius'> {
  type: 'image';
  /**
   * 图片链接或 base64
   */
  src: string;
  width?: NumberWithContainerAndSelf;
  height?: NumberWithContainerAndSelf;
  top?: NumberWithContainerAndSelf;
  right?: NumberWithContainerAndSelf;
  bottom?: NumberWithContainerAndSelf;
  left?: NumberWithContainerAndSelf;
  /**
   * 裁剪图片的起点 X 坐标
   * @default 0
   */
  sourceX?: NumberWithContainerAndSelf;
  /**
   * 裁剪图片的起点 Y 坐标
   * @default 0
   */
  sourceY?: NumberWithContainerAndSelf;
  /**
   * 裁剪图片宽度
   * @default
   * ({ imageWidth }) => imageWidth
   */
  sourceWidth?: NumberWithContainerAndSelf;
  /**
   * 裁剪图片高度
   * 支持数值或百分比（相对于图片高度）
   * @default
   * ({ imageHeight }) => imageHeight
   */
  sourceHeight?: NumberWithContainerAndSelf;
  /**
   * 仅容器有固定宽高时生效
   * @remarks
   * - scaleToFill: 不保持比例拉伸填充
   * - aspectFit: 保持比例缩放，保证长边能完全显示
   * - aspectFill: 保持比例缩放，保证短边能完全显示
   * @default 'scaleToFill'
   */
  mode?: 'scaleToFill' | 'aspectFill' | 'aspectFit';
  /**
   * 沿 x 轴翻转
   */
  flipX?: boolean;
  /**
   * 沿 y 轴翻转
   */
  flipY?: boolean;
}

/**
 * poster 矩形
 */
interface PosterRect extends PosterElementCommonOptions {
  type: 'rect';
  backgroundColor?: string | CanvasGradient | CanvasPattern;
  border?: Pick<
    PosterLine,
    'lineCap' | 'lineColor' | 'lineDash' | 'lineDashOffset' | 'lineJoin' | 'lineWidth' | 'miterLimit'
  >;
  /**
   * 圆角大小
   * 支持数值或以自身宽、高对象为参数，返回数值的函数
   */
  borderRadius?: NumberWithContainerAndSelf;
}

/**
 * poster 直线
 */
interface PosterLine
  extends Omit<PosterElementCommonOptions, 'top' | 'right' | 'bottom' | 'left' | 'width' | 'height'> {
  type: 'line';
  /**
   * 线条顶点，可以为 2 个或多个
   */
  points: [NumberWithContainer, NumberWithContainer][];
  /**
   * @default 1
   */
  lineWidth?: number;
  lineColor?: string | CanvasGradient | CanvasPattern;
  lineDash?: number[];
  lineDashOffset?: number;
  /**
   * @default 'butt'
   */
  lineCap?: CanvasLineCap;
  /**
   * @default 'miter'
   */
  lineJoin?: CanvasLineJoin;
  /**
   * @default 10
   */
  miterLimit?: number;
}

type PosterElements = (PosterElement | PosterRenderFunction)[];
declare class CanvasPoster {
  /** 画布配置 */
  private options;
  /** 绘制项数组 */
  private configs;
  /** 绘制项缓存 */
  private cache;
  /** 绘制上下文 */
  private ctx;
  /** 画布使用的像素比 */
  private dpr;
  /** 全部绘制项 */
  private plugins;
  /**
   * @param options - 画布配置
   */
  constructor(options: PosterOptions);
  draw(configs: PosterElements): Promise<void>;
  /** 递归绘制项，获取相对定位元素盒模型并调用 normalize */
  private travelContainer;
  /** 标准化参数，扩展盒模型等参数 */
  private normalize;
  measure(content: PosterTextCommonOptions): TextMetrics;
  measureHeight(
    content: PosterText,
    maxWidth?: number,
  ): Promise<{
    width: number;
    height: number;
  }>;
}
/**
 * 导出 canvas
 */
declare function saveCanvasAsImage(
  canvas: Canvas,
  options?: {
    type?: string;
    quality?: number;
    fileName?: string;
  },
): Promise<unknown>;

export {
  type AsyncFn,
  type CallbackifyParams,
  type CallbackifyResults,
  type CancelableFunction,
  CanvasPoster,
  type DeepPartial,
  type DeepReadonly,
  type DeepRequired,
  type Fn,
  type Key,
  type MaybePromise$1 as MaybePromise,
  type PartiallyPartial,
  type PartiallyRequired,
  type Recordable,
  type Writable,
  saveCanvasAsImage,
};
