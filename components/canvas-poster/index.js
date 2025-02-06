/* eslint-disable max-params */
let id = 0;
const rpr = wx.getWindowInfo().screenWidth / 750;
const dpr = wx.getWindowInfo().pixelRatio;

Component({
  properties: {
    width: {
      type: String,
      width: '600rpx',
    },
    height: {
      type: String,
      height: '300rpx',
    },
    hidden: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    canvasId: `canvas${id++}`,
  },
  ctx: null,
  methods: {
    /**
     * 初始方法，由外部通过组件实例调用
     * @param {*} options
     */
    render(options) {
      const { backgroundColor, elements = [] } = options;

      this.createSelectorQuery()
        .select(`#${this.data.canvasId}`)
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node;
          this.ctx = canvas.getContext('2d');
          if (!this.ctx) {
            throw new Error('未获取到 canvas 元素！');
          }

          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          this.ctx.scale(dpr, dpr);
          this.ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (backgroundColor) {
            this.ctx.save();
            this.ctx.fillStyle = backgroundColor;
            this.ctx.fillRect(0, 0, canvas.width, canvas.height);
            this.ctx.restore();
          }

          this.draw(elements);
        });
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
    toPx(rpx, int) {
      if (int) {
        return parseInt(rpx * rpr * dpr, 10);
      }
      return rpx * rpr * dpr;
    },
    toRpx(px, int) {
      if (int) {
        return parseInt(px / rpr, 10);
      }
      return px / rpr;
    },
    /**
     * 渲染块
     * @param {Object} params
     */
    drawBlock({ width = 0, height, x, y, borderWidth, backgroundColor, borderColor, borderRadius = 0, opacity = 1 }) {
      // 判断是否块内有文字
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
          this.ctx.fillRect(this.toPx(x), this.toPx(y), this.toPx(width), this.toPx(height));
        }
        this.ctx.restore();
      }
      if (borderWidth) {
        // 画线
        this.ctx.save();
        this.ctx.globalAlpha = opacity;
        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = this.toPx(borderWidth);
        if (borderRadius > 0) {
          // 画圆角矩形边框
          this._drawRadiusRect(x, y, width, height, borderRadius);
          this.ctx.stroke();
        } else {
          this.ctx.strokeRect(this.toPx(x), this.toPx(y), this.toPx(width), this.toPx(height));
        }
        this.ctx.restore();
      }
    },
    /**
     * 画圆角矩形
     */
    _drawRadiusRect(x, y, w, h, r) {
      const br = r / 2;
      this.ctx.beginPath();
      this.ctx.moveTo(this.toPx(x + br), this.toPx(y)); // 移动到左上角的点
      this.ctx.lineTo(this.toPx(x + w - br), this.toPx(y));
      this.ctx.arc(
        this.toPx(x + w - br),
        this.toPx(y + br),
        this.toPx(br),
        2 * Math.PI * (3 / 4),
        2 * Math.PI * (4 / 4),
      );
      this.ctx.lineTo(this.toPx(x + w), this.toPx(y + h - br));
      this.ctx.arc(this.toPx(x + w - br), this.toPx(y + h - br), this.toPx(br), 0, 2 * Math.PI * (1 / 4));
      this.ctx.lineTo(this.toPx(x + br), this.toPx(y + h));
      this.ctx.arc(
        this.toPx(x + br),
        this.toPx(y + h - br),
        this.toPx(br),
        2 * Math.PI * (1 / 4),
        2 * Math.PI * (2 / 4),
      );
      this.ctx.lineTo(this.toPx(x), this.toPx(y + br));
      this.ctx.arc(this.toPx(x + br), this.toPx(y + br), this.toPx(br), 2 * Math.PI * (2 / 4), 2 * Math.PI * (3 / 4));
    },

    /**
     * 渲染文字
     * @param {Object} params
     */
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
      this.ctx.font = fontStyle + ' ' + fontWeight + ' ' + this.toPx(fontSize, true) + 'px ' + fontFamily;
      this.ctx.globalAlpha = opacity;
      this.ctx.fillStyle = color;
      this.ctx.textBaseline = baseLine;
      this.ctx.textAlign = textAlign;
      let textWidth = this.toRpx(this.ctx.measureText(text).width);
      const textArr = [];
      if (textWidth > width) {
        // 文本宽度 大于 渲染宽度
        let fillText = '';
        let line = 1;
        for (let i = 0; i <= text.length - 1; i++) {
          // 将文字转为数组，一行文字一个元素
          fillText = fillText + text[i];
          if (this.toRpx(this.ctx.measureText(fillText).width) >= width) {
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
        this.ctx.fillText(item, this.toPx(x), this.toPx(y + (lineHeight || fontSize) * index));
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
        this.ctx.moveTo(this.toPx(x), this.toPx(lineY));
        this.ctx.lineTo(this.toPx(x) + this.toPx(textWidth), this.toPx(lineY));
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        this.ctx.restore();
      }

      return textWidth;
    },
  },
});
