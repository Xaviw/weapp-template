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
    const pages = ['/pages/scroll-view/index', '/pages/font/index', '/pages/map/index', '/pages/text-collapse/index'];
    wx.navigateTo({
      url: pages[type],
    });
  },
});
