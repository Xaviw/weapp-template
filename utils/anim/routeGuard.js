import Anim from '@ssv-lab/anim';

const LOGIN_PAGE = '/pages/login/index';

Anim.interceptors.router({
  beforeEach(to, from) {
    if (from.url === LOGIN_PAGE && to.url === LOGIN_PAGE) {
      return false;
    }

    return true;
  },
});
