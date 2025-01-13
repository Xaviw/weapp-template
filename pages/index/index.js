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
      '/pages/scroll-view/index',
      '/pages/font/index',
      '/pages/html-whitespace-sensitivity/index',
      '/pages/map/index',
    ];
    wx.navigateTo({
      url: pages[type],
    });
  },
});
