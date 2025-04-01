/* eslint-disable */
// prettier-ignore
type Fn<Args = any[], Res = any> = (...args: Args) => Res

type AsyncFn<Args = any[], Res = any> = (...args: Args) => Promise<Res>

type Key = keyof any

type Recordable<T = any> = Record<Key, T>

type MaybePromise$1<T = any> = Promise<T> | T

type CallbackifyParams<T extends Fn> = Parameters<T>[0] extends Recordable ? Omit<Parameters<T>[0], 'success' | 'fail' | 'complete'> : object

type CallbackifyResults<T extends Fn> = Parameters<T>[0]['success'] extends Fn ? Parameters<Parameters<T>[0]['success']> : never

interface CancelableFunction<F extends Fn> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): ReturnType<F> | void
  cancel: () => void
}

type Writable<T> = {
  -readonly [P in keyof T]: T[P];
}

type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
}

type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>;
}

type PartiallyRequired<T, K extends keyof T> = T & {
  [P in K]-?: T[P]
}

type PartiallyPartial<T, K extends keyof T> = T & {
  [P in K]?: T[P]
}

type Canvas = WechatMiniprogram.Canvas

type CanvasContext = WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D

/**
 * poster 绘制项
 */
type PosterElements = (PosterElement | PosterRenderFunction)[]

/**
 * poster 基础配置
 */
interface PosterOptions {
  /**
   * canvas 节点
   */
  node: Canvas
  /**
   * 海报设计图宽度
   */
  width: number
  /**
   * 海报设计图高度
   */
  height: number
  /**
   * 像素比，默认会自动获取设备 drp
   */
  dpr?: number
}

/**
 * poster 配置式绘制项
 */
type PosterElement = (PosterText | PosterImage | PosterRect | PosterLine) & {
  /**
   * 用于相对定位
   */
  id?: string
  /**
   * 相对于某个 id 对应的元素进行定位（注意避免循环依赖）
   */
  relativeTo?: string
}

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
  (options: { ctx: CanvasContext, canvas: Canvas, dpr: number }): MaybePromise<void>
}

/**
 * poster 绘制公共配置
 */
interface PosterElementCommonOptions {
  /**
   * 支持数字或百分比（相对于父容器宽度）
   */
  width?: string | number
  /**
   * 支持数字或百分比（相对于父容器高度）
   */
  height?: string | number
  /**
   * 支持数字或百分比（相对于父容器高度）
   * 不存在 height 时，根据 top、bottom 计算高度
   * 存在 height 时，优先使用 top 定位
   */
  top?: string | number
  /**
   * 支持数字或百分比（相对于父容器宽度）
   * 不存在 width 时，根据 left、right 计算宽度
   * 存在 width 时，优先使用 left 定位
   */
  right?: string | number
  /**
   * 支持数字或百分比（相对于父容器高度）
   * 不存在 height 时，根据 top、bottom 计算高度
   * 存在 height 时，优先使用 top 定位
   */
  bottom?: string | number
  /**
   * 支持数字或百分比（相对于父容器宽度）
   * 不存在 width 时，根据 left、right 计算宽度
   * 存在 width 时，优先使用 left 定位
   */
  left?: string | number
  /**
   * 旋转角度，注意旋转不会改变元素盒模型，不会影响子元素相对定位
   */
  rotate?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
  shadowBlur?: number
  shadowColor?: string
}

/**
 * poster 文字元素公共配置
 */
interface PosterTextCommonOptions extends Pick<PosterElementCommonOptions, 'shadowBlur' | 'shadowColor' | 'shadowOffsetX' | 'shadowOffsetY'> {
  content: string
  /**
   * 数值或百分比（相对于文字高度）
   * @default '120%'
   */
  lineHeight?: number | string
  /**
   * @default 16
   */
  fontSize?: number
  /**
   * @default 'sans-serif'
   */
  fontFamily?: string
  /**
   * @default 'normal'
   */
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold'
  color?: string | CanvasGradient | CanvasPattern
  /**
   * 基线位置为起点 Y 坐标加基线上方文字高度（含上方的lineHeight）
   * @default 'alphabetic'
   */
  textBaseLine?: CanvasTextBaseline
  letterSpacing?: number
  wordSpacing?: number
  /**
   * @default 'normal'
   */
  fontStyle?: 'normal' | 'italic'
  textDecoration?: 'underline' | 'overline' | 'line-through'
  textDecorationProps?: Pick<PosterLine, 'lineCap' | 'lineColor' | 'lineDash' | 'lineDashOffset' | 'lineJoin' | 'lineWidth' | 'miterLimit'>
  /**
   * 填充或镂空
   * @default 'fill'
   */
  textStyle?: 'fill' | 'stroke'
  /**
   * 仅 text=stroke 时生效
   */
  strokeProps?: Pick<PosterLine, 'lineCap' | 'lineDash' | 'lineDashOffset' | 'lineJoin' | 'lineWidth' | 'miterLimit'>
  /**
   * 文字底色
   */
  backgroundColor?: string | CanvasGradient | CanvasPattern
}

/**
 * poster 文本
 */
interface PosterText extends PosterTextCommonOptions, Omit<PosterElementCommonOptions, 'shadowBlur' | 'shadowColor' | 'shadowOffsetX' | 'shadowOffsetY'> {
  type: 'text'
  /**
   * 文本内容，支持空格，不支持其他控制字符；为数组时可以分别设置样式
   */
  content: string | PosterTextCommonOptions[]
  /**
   * 最大行数，超出省略显示
   * height 小于内容高度时，会进行裁剪
   */
  lineClamp?: number
  /**
   * 超出省略时展示的字符
   * @default '...'
   */
  ellipsisContent?: string
  /**
   * 容器内的对齐方式
   * @default 'left'
   */
  textAlign?: 'left' | 'center' | 'right'
}

/**
 * poster 图片
 */
interface PosterImage extends PosterElementCommonOptions, Pick<PosterRect, 'borderColor' | 'borderDash' | 'borderDashOffset' | 'borderRadius' | 'borderSize' | 'borderStyle'> {
  type: 'image'
  /**
   * 图片链接或 base64
   */
  src: string
  /**
   * 裁剪图片的起点 X 坐标
   * 支持数值或百分比（相对于图片宽度）
   * @default 0
   */
  sourceX?: string | number
  /**
   * 裁剪图片的起点 Y 坐标
   * 支持数值或百分比（相对于图片高度）
   * @default 0
   */
  sourceY?: string | number
  /**
   * 裁剪图片宽度
   * 支持数值或百分比（相对于图片宽度）
   * @default '100%'
   */
  sourceWidth?: string | number
  /**
   * 裁剪图片高度
   * 支持数值或百分比（相对于图片高度）
   * @default '100%'
   */
  sourceHeight?: string | number
  /**
   * 仅容器有固定宽高时生效
   * @remarks
   * - scaleToFill: 不保持比例拉伸填充
   * - aspectFit: 保持比例缩放，保证长边能完全显示
   * - aspectFill: 保持比例缩放，保证短边能完全显示
   * @default 'scaleToFill'
   */
  mode?: 'scaleToFill' | 'aspectFill' | 'aspectFit'
  /**
   * 沿 x 轴翻转
   */
  flipX?: boolean
  /**
   * 沿 y 轴翻转
   */
  flipY?: boolean
}

/**
 * poster 矩形
 */
interface PosterRect extends PosterElementCommonOptions {
  type: 'rect'
  backgroundColor?: string | CanvasGradient | CanvasPattern
  /**
   * box-sizing: content-box；
   * borderStyle 为 dashed 时，此值不适合设置较大
   */
  borderSize?: number
  /**
   * @default 'solid'
   */
  borderStyle?: 'solid' | 'dashed'
  borderColor?: string | CanvasGradient | CanvasPattern
  /**
   * 支持数字或百分比（相对于自身宽度）
   */
  borderRadius?: number | string
  borderDash?: number[]
  borderDashOffset?: number
}

/**
 * poster 直线
 */
interface PosterLine extends Omit<PosterElementCommonOptions, 'top' | 'right' | 'bottom' | 'left' | 'width' | 'height'> {
  type: 'line'
  /**
   * 线条顶点，可以为 2 个或多个
   * 支持数字或百分比(相对于容器宽高)
   */
  points: [number | string, number | string][]
  /**
   * @default 1
   */
  lineWidth?: number
  lineColor?: string | CanvasGradient | CanvasPattern
  lineDash?: number[]
  lineDashOffset?: number
  /**
   * @default 'butt'
   */
  lineCap?: CanvasLineCap
  /**
   * @default 'miter'
   */
  lineJoin?: CanvasLineJoin
  /**
   * @default 10
   */
  miterLimit?: number
}

/**
 * 配置式生成 Canvas 海报
 * @web
 * @miniprogram
 */
declare function canvasPoster(elements: PosterElements, options: PosterOptions): Promise<void>;

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
declare function wxPromisify<M extends Fn>(method: M, options: CallbackifyParams<M>): Promise<CallbackifyResults<M>>;

export { type AsyncFn, type CallbackifyParams, type CallbackifyResults, type CancelableFunction, type DeepPartial, type DeepReadonly, type DeepRequired, type Fn, type Key, type MaybePromise$1 as MaybePromise, type PartiallyPartial, type PartiallyRequired, type Recordable, type Writable, canvasPoster, wxPromisify };
