import Anim from '@ssv-lab/anim';
import UserStore from '@/stores/user';

Anim.Page({
  data: {},
  store: {
    UserStore,
  },
  onLoad() {
    console.log(UserStore.isLogin());
  },
  toUpper() {
    console.log('toUpper');
  },
  toLower() {
    console.log('toLower');
  },
});
