class TestStore {
  data = {
    simpleValue: 0,
    objectValue: { count: 0 },
  };

  updateSimpleValue(value) {
    this.data.simpleValue = value;
    this.update();
  }

  updateObjectValue(value) {
    this.data.objectValue = value;
    this.update();
  }
}

export default new TestStore();
