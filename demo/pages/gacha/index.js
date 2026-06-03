const capsules = [
  { id: 1, rotate: -18, depth: 'front' },
  { id: 2, rotate: 12, depth: 'front' },
  { id: 3, rotate: -8, depth: 'front' },
  { id: 4, rotate: 24, depth: 'mid' },
  { id: 5, rotate: -28, depth: 'mid' },
  { id: 6, rotate: 10, depth: 'mid' },
  { id: 7, rotate: 20, depth: 'back' },
  { id: 8, rotate: -14, depth: 'back' },
  { id: 9, rotate: 8, depth: 'back' },
];

const RESULT_STAGE = {
  HIDDEN: '',
  CAPSULE: 'capsule',
  CONTENT: 'content',
};

// 结果弹窗使用单一阶段字段，避免多个布尔值组合出非法 UI 状态。
// 与 CSS 动画时长保持一致，避免抽奖阶段和视觉动画错位。
const DRAW_TIMING = {
  EXPORT_CAPSULE: 1500,
  MIXING_DONE: 2250,
  RESULT_CONTENT: 3220,
};

Page({
  data: {
    isDrawing: false,
    isMixing: false,
    showExportCapsule: false,
    resultStage: RESULT_STAGE.HIDDEN,
    capsules,
  },

  handleStart() {
    if (this.data.isDrawing) return;

    this.clearTimers();
    this.setData({
      isDrawing: true,
      isMixing: true,
      showExportCapsule: false,
      resultStage: RESULT_STAGE.HIDDEN,
    });

    // 出口扭蛋先出现，随后主机内扭蛋混合动画结束并进入结果动效。
    this.setTimer(() => {
      this.setData({
        showExportCapsule: true,
      });
    }, DRAW_TIMING.EXPORT_CAPSULE);

    this.setTimer(() => {
      this.setData({
        isDrawing: false,
        isMixing: false,
        resultStage: RESULT_STAGE.CAPSULE,
      });
    }, DRAW_TIMING.MIXING_DONE);

    this.setTimer(() => {
      this.setData({
        resultStage: RESULT_STAGE.CONTENT,
      });
    }, DRAW_TIMING.RESULT_CONTENT);
  },

  handleCloseResult() {
    this.clearTimers();
    this.setData({
      showExportCapsule: false,
      resultStage: RESULT_STAGE.HIDDEN,
    });
  },

  setTimer(callback, delay) {
    // 统一登记定时器，关闭弹窗或卸载页面时可以一次性清理。
    const timer = setTimeout(callback, delay);
    this.timers = this.timers || [];
    this.timers.push(timer);
  },

  clearTimers() {
    if (!this.timers) return;

    this.timers.forEach((timer) => {
      clearTimeout(timer);
    });
    this.timers = [];
  },

  onUnload() {
    this.clearTimers();
  },
});
