import Anim from '@ssv-lab/anim';
import userStore from '@/stores/user';

Anim.Page({
  data: {
    loading: false,
  },
  async handleLogin(e) {
    const { errMsg, code } = e.detail;

    if (errMsg === 'getPhoneNumber:fail user deny') {
      return;
    }

    this.setData({ loading: true });
    await userStore.login(code);
    this.setData({ loading: false });
  },
});
