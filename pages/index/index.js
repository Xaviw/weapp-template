import Anim from '@ssv-lab/anim';
import UserStore from '@/stores/user';

Anim.Page({
  data: {},
  store: {
    UserStore,
  },
  onLoad() {},

  navigate(e) {
    const { type } = e.currentTarget.dataset;
    const pages = [
      '/pages/login/index',
      '/demo/pages/scroll-view/index',
      '/demo/pages/font/index',
      '/demo/pages/map/index',
      '/demo/pages/text-collapse/index',
      '/demo/pages/canvas/index',
    ];
    wx.navigateTo({
      url: pages[type],
    });
  },
});
