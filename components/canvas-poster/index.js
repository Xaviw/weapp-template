/* eslint-disable max-params */
let id = 0;
const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 150;

Component({
  properties: {
    hidden: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    canvasId: `canvas${id++}`,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  ctx: null,
  methods: {
    /**
     * 初始方法，由外部通过组件实例调用
     * @param {*} options
     */
    render(options) {
      this.createSelectorQuery()
        .select(`#${this.data.canvasId}`)
        .node(({ node: canvas }) => {
          this.ctx = canvas.getContext('2d');
          console.log('this.ctx :', this.ctx);
          if (!this.ctx) {
            throw new Error('未获取到 canvas 元素！');
          }

          const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, backgroundColor, elements = [] } = options;

          this.setData({ width, height });

          const dpr = wx.getWindowInfo().pixelRatio;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          this.ctx.scale(dpr, dpr);
          this.ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (backgroundColor) {
            this.ctx.save();
            this.ctx.fillStyle = backgroundColor;
            this.ctx.fillRect(0, 0, canvas.width, canvas.height);
            this.ctx.restore();
          }

          this.draw(elements);
        })
        .exec();
    },
    /**
     * 绘制到 canvas
     * @param {*} elements
     */
    draw(elements) {
      elements.forEach((item) => {
        if (item.type === 'image') {
          this.drawImage(item);
        } else if (item.type === 'text') {
          this.drawText(item);
        } else if (item.type === 'block') {
          this.drawBlock(item);
        } else if (item.type === 'line') {
          this.drawLine(item);
        }
      });
    },

    drawBlock({ width = 0, height, x, y, borderWidth, backgroundColor, borderColor, borderRadius = 0, opacity = 1 }) {
      if (backgroundColor) {
        // 画面
        this.ctx.save();
        this.ctx.globalAlpha = opacity;
        this.ctx.fillStyle = backgroundColor;
        if (borderRadius > 0) {
          // 画圆角矩形
          this._drawRadiusRect(x, y, width, height, borderRadius);
          this.ctx.fill();
        } else {
          this.ctx.fillRect(x, y, width, height);
        }
        this.ctx.restore();
      }
      if (borderWidth) {
        // 画线
        this.ctx.save();
        this.ctx.globalAlpha = opacity;
        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = borderWidth;
        if (borderRadius > 0) {
          // 画圆角矩形边框
          this._drawRadiusRect(x, y, width, height, borderRadius);
          this.ctx.stroke();
        } else {
          this.ctx.strokeRect(x, y, width, height);
        }
        this.ctx.restore();
      }
    },
    drawText({
      x,
      y,
      fontSize,
      color,
      baseLine,
      textAlign = 'left',
      text,
      opacity = 1,
      textDecoration = 'none',
      width,
      lineNum = 1,
      lineHeight = 0,
      fontWeight = 'normal',
      fontStyle = 'normal',
      fontFamily = 'sans-serif',
    }) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.font = fontStyle + ' ' + fontWeight + ' ' + fontSize + 'px ' + fontFamily;
      this.ctx.globalAlpha = opacity;
      this.ctx.fillStyle = color;
      this.ctx.TextBaseline = baseLine;
      this.ctx.TextAlign = textAlign;
      let textWidth = this.ctx.measureText(text).width;
      const textArr = [];
      if (textWidth > width) {
        // 文本宽度 大于 渲染宽度
        let fillText = '';
        let line = 1;
        for (let i = 0; i <= text.length - 1; i++) {
          // 将文字转为数组，一行文字一个元素
          fillText = fillText + text[i];
          if (this.ctx.measureText(fillText).width) {
            if (line === lineNum) {
              if (i !== text.length - 1) {
                fillText = fillText.substring(0, fillText.length - 1) + '...';
              }
            }
            if (line <= lineNum) {
              textArr.push(fillText);
            }
            fillText = '';
            line++;
          } else {
            if (line <= lineNum) {
              if (i === text.length - 1) {
                textArr.push(fillText);
              }
            }
          }
        }
        textWidth = width;
      } else {
        textArr.push(text);
      }

      textArr.forEach((item, index) => {
        this.ctx.fillText(item, x, y + (lineHeight || fontSize * index));
      });

      this.ctx.restore();

      // textDecoration
      if (textDecoration !== 'none') {
        let lineY = y;
        if (textDecoration === 'line-through') {
          // 目前只支持贯穿线
          lineY = y;

          // 小程序画布baseLine偏移阈值
          let threshold = 5;

          // 根据baseLine的不同对贯穿线的Y坐标做相应调整
          switch (baseLine) {
            case 'top':
              lineY += fontSize / 2 + threshold;
              break;
            case 'middle':
              break;
            case 'bottom':
              lineY -= fontSize / 2 + threshold;
              break;
            default:
              lineY -= fontSize / 2 - threshold;
              break;
          }
        }
        this.ctx.save();
        this.ctx.moveTo(x, lineY);
        this.ctx.lineTo(x + textWidth, lineY);
        this.ctx.StrokeStyle = color;
        this.ctx.stroke();
        this.ctx.restore();
      }

      return textWidth;
    },

    /**
     * 画圆角矩形
     */
    _drawRadiusRect(x, y, w, h, r) {
      const br = r / 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x + br, y); // 移动到左上角的点
      this.ctx.lineTo(x + w - br, y);
      this.ctx.arc(x + w - br, y + br, br, 2 * Math.PI * (3 / 4), 2 * Math.PI * (4 / 4));
      this.ctx.lineTo(x + w, y + h - br);
      this.ctx.arc(x + w - br, y + h - br, br, 0, 2 * Math.PI * (1 / 4));
      this.ctx.lineTo(x + br, y + h);
      this.ctx.arc(x + br, y + h - br, br, 2 * Math.PI * (1 / 4), 2 * Math.PI * (2 / 4));
      this.ctx.lineTo(x, y + br);
      this.ctx.arc(x + br, y + br, br, 2 * Math.PI * (2 / 4), 2 * Math.PI * (3 / 4));
    },
  },
});
