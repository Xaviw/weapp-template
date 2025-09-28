// demo/pages/anim/page1/index.js
import Anim from '@ssv-lab/anim';
import testStore from '@/stores/test';

Anim.Page({
  data: {
    simpleCount: 0,
    objectCount: 0,
  },
  store: {
    testStore,
  },
  computed: {
    simpleValue(data) {
      return data.testStore.simpleValue;
    },
    objectValue(data) {
      return data.testStore.objectValue;
    },
  },
  watch: {
    'testStore.simpleValue'(value) {
      console.log('watch testStore.simpleValue', value);
    },
    'testStore.objectValue'(value) {
      console.log('watch testStore.objectValue', value);
    },
  },
  setSimpleValue() {
    this.setData({ simpleCount: this.data.simpleCount + 1 });
    testStore.updateSimpleValue(this.data.simpleCount);
    console.log('this.data.testStore.simpleValue', this.data.testStore.simpleValue);
    console.log('this.data.simpleValue', this.data.simpleValue);
  },
  setObjectValue() {
    this.setData({ objectCount: this.data.objectCount + 1 });
    testStore.updateObjectValue({ count: this.data.objectCount });
    console.log('this.data.testStore.objectValue.count', this.data.testStore.objectValue.count);
    console.log('this.data.objectValue.count', this.data.objectValue.count);
  },
  gotoPage2() {
    wx.navigateTo({
      url: '/demo/pages/anim/page2/index',
    });
  },
});
