import Anim from '@ssv-lab/anim';
import { CanvasPoster, saveCanvasAsImage } from '../../../utils/canvas';

Anim.Page({
  canvas1: null,
  onReady() {
    wx.createSelectorQuery()
      .select('#canvas1')
      .fields({ node: true, size: true })
      .exec((res) => {
        /** @type {WechatMiniprogram.Canvas} */
        this.canvas1 = res[0].node;
        this.render1();
      });
  },
  render1() {
    const ctx = this.canvas1.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 900, 0, 1006);
    gradient.addColorStop(0, '#a55002');
    gradient.addColorStop(1, '#ffb470');

    const poster = new CanvasPoster({
      node: this.canvas1,
      width: 620,
      height: 1006,
    });

    const metrics = poster.measure({
      content: '姓名',
      fontSize: 44,
      fontWeight: 600,
      color: '#5d4d4a',
    });
    const nameWidth = metrics.width;
    const nameHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;

    poster.draw([
      {
        type: 'image',
        src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/certificate-bg-long.png',
        width: ({ containerWidth }) => containerWidth,
        height: ({ containerHeight }) => containerHeight,
      },
      {
        id: 'a',
        type: 'image',
        src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/logo.png',
        top: 47.88,
        left: 47.86,
        height: 31.18,
      },
      {
        relativeTo: 'a',
        type: 'image',
        src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/logo.png',
        left: ({ containerWidth }) => containerWidth + 30,
        height: 31.18,
      },
      {
        id: 'b',
        type: 'image',
        src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/default_avatar.png',
        left: ({ containerWidth }) => (containerWidth - nameWidth - 60 - 20) / 2,
        top: 236,
        height: 60,
        width: 60,
      },
      {
        relativeTo: 'b',
        type: 'text',
        content: '姓名',
        top: ({ containerHeight }) => (containerHeight - nameHeight) / 2,
        left: ({ containerWidth }) => containerWidth + 20,
        fontSize: 44,
        fontWeight: 600,
        color: '#5d4d4a',
        lineHeight: (h) => h,
      },
      {
        type: 'text',
        content: 'X月X日参加了',
        top: 322,
        textAlign: 'center',
        fontSize: 32,
        color: '#5b4c49',
      },
      {
        type: 'text',
        content: '某某某某某某组织的某某某某某某活动',
        top: 396,
        textAlign: 'center',
        fontSize: 32,
        color: '#5b4c49',
        left: 72,
        right: 72,
        lineHeight: 48,
      },
      {
        type: 'image',
        src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/certificate-personal1.png',
        bottom: 118,
        left: 67,
        right: 67,
        height: 306,
        mode: 'aspectFit',
      },
      {
        type: 'text',
        content: '- 每步志愿路，都在铸就美好未来 -',
        top: 924,
        textAlign: 'center',
        fontSize: 32,
        color: gradient,
      },
    ]);
  },
  onExport1() {
    saveCanvasAsImage(this.canvas1);
  },
});
