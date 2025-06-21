// demo/pages/anim/page1/index.js
import Anim from '@ssv-lab/anim';
import userStore from '@/stores/user';

Anim.Page({
  data: {
    watchedUserInfo: {},
  },
  store: {
    userStore,
  },
  computed: {
    userInfo(data) {
      return data.userStore.userInfo;
    },
  },
  watch: {
    'userStore.userInfo'(userInfo) {
      this.setData({ watchedUserInfo: userInfo });
    },
  },
  add() {
    userStore.setUserInfo({ time: Date.now() });
    console.log('this.data.userStore.userInfo.time', this.data.userStore.userInfo.time);
    console.log('this.data.userInfo.time', this.data.userInfo.time);
    console.log('this.data.watchedUserInfo.time', this.data.watchedUserInfo.time);
  },
  page2() {
    wx.navigateTo({
      url: '/demo/pages/anim/page2/index',
    });
  },
});
