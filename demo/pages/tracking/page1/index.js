import Anim from '@ssv-lab/anim';

Anim.Page({
  data: {
    a: null,
  },
  async onLoad() {
    console.log('onLoad 1');
    await this.delay(4000);
    this.setData({ a: 9 });
    console.log('onLoad 2');
  },

  onShow() {
    Anim.$datong.createExposeObserver(this);
  },
  delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },
});
