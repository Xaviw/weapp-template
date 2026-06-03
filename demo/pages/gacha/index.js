const capsules = [
  { id: 1, pos: 1, path: 1, rotate: -18, depth: 'front' },
  { id: 2, pos: 2, path: 2, rotate: 12, depth: 'front' },
  { id: 3, pos: 3, path: 3, rotate: -8, depth: 'front' },
  { id: 4, pos: 4, path: 4, rotate: 24, depth: 'mid' },
  { id: 5, pos: 5, path: 5, rotate: -28, depth: 'mid' },
  { id: 6, pos: 6, path: 6, rotate: 10, depth: 'mid' },
  { id: 7, pos: 7, path: 7, rotate: 20, depth: 'back' },
  { id: 8, pos: 8, path: 8, rotate: -14, depth: 'back' },
  { id: 9, pos: 9, path: 9, rotate: 8, depth: 'back' },
];

Page({
  data: {
    isDrawing: false,
    isMixing: false,
    showExportCapsule: false,
    capsules,
  },

  handleStart() {
    if (this.data.isDrawing) return;

    this.clearTimers();
    this.setData({
      isDrawing: true,
      isMixing: true,
      showExportCapsule: false,
    });

    this.exportTimer = setTimeout(() => {
      this.setData({
        showExportCapsule: true,
      });
    }, 1500);

    this.finishTimer = setTimeout(() => {
      this.setData({
        isDrawing: false,
        isMixing: false,
      });
    }, 2250);
  },

  clearTimers() {
    clearTimeout(this.exportTimer);
    clearTimeout(this.finishTimer);
  },

  onUnload() {
    this.clearTimers();
  },
});
