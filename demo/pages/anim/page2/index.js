// demo/pages/anim/page2/index.js
import Anim from '@ssv-lab/anim';
import testStore from '@/stores/test';

Anim.Page({
  data: {},
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
  onLoad() {
    console.log('this.data.testStore.simpleValue', this.data.testStore.simpleValue);
    console.log('this.data.simpleValue', this.data.simpleValue);

    console.log('this.data.testStore.objectValue.count', this.data.testStore.objectValue.count);
    console.log('this.data.objectValue.count', this.data.objectValue.count);
  },
});
