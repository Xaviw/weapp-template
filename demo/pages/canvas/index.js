import Anim from '@ssv-lab/anim';
import { canvasPoster, saveCanvasAsImage, wxPromisify } from '../../../utils/canvas';

const loadFont = wxPromisify(wx.loadFontFace, {
  family: 'Hanalei',
  source: 'url("https://fonts.gstatic.font.im/s/hanaleifill/v22/fC1mPYtObGbfyQznIaQzPQi8UAjAhFqtag.woff2")',
});

Anim.Page({
  canvas1: null,
  canvas2: null,
  onReady() {
    const query1 = wx.createSelectorQuery();
    query1
      .select('#canvas1')
      .fields({ node: true, size: true })
      .exec((res) => {
        /** @type {WechatMiniprogram.Canvas} */
        const canvas1 = res[0].node;
        this.canvas1 = canvas1;
        const ctx = canvas1.getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, 280, 0);
        gradient.addColorStop(0, '#cf1322');
        gradient.addColorStop(1, '#389e0d');

        canvasPoster(
          [
            () => {
              // 放在字体使用前，确保字体加载完成
              return loadFont;
            },
            {
              type: 'text',
              content: '测试 test 1234 !@#$',
              color: gradient,
              fontSize: 22,
              fontStyle: 'italic',
              fontFamily: 'Hanalei',
              letterSpacing: 6,
              shadowBlur: 2,
              shadowColor: '#00000033',
              shadowOffsetX: 6,
              shadowOffsetY: 6,
              textDecoration: 'underline',
              textStyle: 'stroke',
              wordSpacing: 6,
              backgroundColor: '#5cdbd348',
            },
            {
              type: 'text',
              top: 30,
              fontSize: 22,
              content: [
                {
                  content: 'textBaseLine: top ',
                  textBaseLine: 'top',
                },
                {
                  content: 'hanging ',
                  textBaseLine: 'hanging',
                },
                {
                  content: 'middle ',
                  textBaseLine: 'middle',
                },
                {
                  content: 'alphabetic ',
                  textBaseLine: 'alphabetic',
                },
                {
                  content: 'ideographic ',
                  textBaseLine: 'ideographic',
                },
                {
                  content: 'bottom',
                  textBaseLine: 'bottom',
                },
              ],
            },
            {
              type: 'text',
              top: 95,
              fontSize: 22,
              content: [
                {
                  content: 'textDecoration: underline',
                  textDecoration: 'underline',
                  textDecorationProps: {
                    lineColor: '#ff0000',
                    lineWidth: 5,
                    lineDash: [15, 5],
                  },
                },
                {
                  content: ' line-through ',
                  textDecoration: 'line-through',
                  textDecorationProps: {
                    lineColor: '#00ff00',
                  },
                },
                {
                  content: 'overline',
                  textDecoration: 'overline',
                  textDecorationProps: {
                    lineColor: '#0000ff',
                  },
                },
              ],
            },
            {
              type: 'text',
              top: 145,
              fontSize: 22,
              content: 'textAlign: left',
              textAlign: 'left',
              backgroundColor: '#ff000044',
            },
            {
              type: 'text',
              top: 145,
              fontSize: 22,
              content: 'center',
              textAlign: 'center',
              backgroundColor: '#00ff0044',
            },
            {
              type: 'text',
              top: 145,
              fontSize: 22,
              content: 'right',
              textAlign: 'right',
              backgroundColor: '#0000ff44',
            },
            {
              id: 'a',
              type: 'text',
              fontSize: 22,
              top: 190,
              width: 220,
              content: '内容超出指定行数后省略显示，内容超出指定行数后省略显示，内容超出指定行数后省略显示',
              lineClamp: 3,
            },
            {
              relativeTo: 'a',
              type: 'text',
              fontSize: 22,
              fontFamily: 'Hanalei Fill',
              left: '120%',
              width: 220,
              content: '自定义超出省略内容，自定义超出省略内容，自定义超出省略内容，自定义超出省略内容',
              lineClamp: 3,
              ellipsisContent: '~~~',
            },
          ],
          {
            node: canvas1,
            width: 750,
            height: 327,
          },
        );
      });

    const query2 = wx.createSelectorQuery();
    query2
      .select('#canvas2')
      .fields({ node: true, size: true })
      .exec((res) => {
        /** @type {WechatMiniprogram.Canvas} */
        const canvas2 = res[0].node;
        this.canvas2 = canvas2;
        const ctx = canvas2.getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, 280, 0);
        gradient.addColorStop(0, '#cf1322');
        gradient.addColorStop(1, '#389e0d');

        canvasPoster(
          [
            {
              id: 'a',
              type: 'image',
              src: '../../images/logo.png',
              width: 94,
              height: 150,
            },
            {
              relativeTo: 'a',
              type: 'image',
              src: '../../images/logo.png',
              left: '100%',
              width: 94,
              height: 150,
              flipX: true,
            },
            {
              relativeTo: 'a',
              type: 'image',
              src: '../../images/logo.png',
              top: '100%',
              width: 94,
              height: 150,
              flipY: true,
            },
            {
              relativeTo: 'a',
              type: 'image',
              src: '../../images/logo.png',
              top: '100%',
              left: '100%',
              width: 94,
              height: 150,
              flipX: true,
              flipY: true,
            },
            {
              type: 'image',
              src: '../../images/logo.png',
              top: 103,
              left: 200,
              width: 94,
              height: 94,
              rotate: 90,
              mode: 'aspectFit',
              borderColor: gradient,
              borderDash: [5, 5],
              borderRadius: '100%',
              shadowBlur: 2,
              shadowColor: '#00000066',
              shadowOffsetX: 20,
              shadowOffsetY: 20,
              borderStyle: 'dashed',
              borderSize: 5,
            },
            {
              type: 'image',
              src: '../../images/logo.png',
              top: 103,
              left: 315,
              width: 94,
              height: 94,
              rotate: 180,
              mode: 'scaleToFill',
              borderColor: gradient,
              borderDash: [5, 5],
              borderRadius: '100%',
              shadowBlur: 2,
              shadowColor: '#00000066',
              shadowOffsetX: 20,
              shadowOffsetY: 20,
              borderStyle: 'dashed',
              borderSize: 5,
            },
            {
              type: 'image',
              src: '../../images/logo.png',
              top: 103,
              left: 430,
              width: 94,
              height: 94,
              rotate: 225,
              mode: 'aspectFill',
              borderColor: gradient,
              borderDash: [5, 5],
              borderRadius: '100%',
              shadowBlur: 2,
              shadowColor: '#00000066',
              shadowOffsetX: 20,
              shadowOffsetY: 20,
              borderStyle: 'dashed',
              borderSize: 5,
            },
            {
              type: 'image',
              src: '../../images/logo.png',
              top: 103,
              left: 545,
              width: 94,
              height: 94,
              sourceX: 0,
              borderSize: 2,
              borderColor: gradient,
              sourceY: 640,
              sourceWidth: 1080,
              sourceHeight: 1080,
            },
          ],
          {
            node: canvas2,
            width: 750,
            height: 327,
          },
        );
      });
  },
  onExport1() {
    saveCanvasAsImage(this.canvas1);
  },
  onExport2() {
    saveCanvasAsImage(this.canvas2);
  },
});
