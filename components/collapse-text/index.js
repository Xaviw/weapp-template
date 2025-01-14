Component({
  properties: {
    /** 内容 */
    content: {
      type: String,
      value: '',
      observer() {
        // 传入内容后检查内容高度，以及按钮宽度
        this.checkContent();
      },
    },
    /** 省略显示时的行数 */
    rows: {
      type: Number,
      value: 3,
      observer(rows) {
        if (typeof rows !== 'number' || rows < 1 || ~~rows !== rows) {
          throw new Error('rows 仅支持正整数');
        }
      },
    },
    /** 行高，用于浮动按钮定位 */
    lineHeight: {
      type: Number,
      value: 1.5,
      observer(lineHeight) {
        if (typeof lineHeight !== 'number') {
          throw new Error('请使用数字 lineHeight');
        }
      },
    },
  },
  externalClasses: ['content-class', 'trigger-class'],
  data: {
    collapsed: true,
    showTrigger: false,
    top: 0,
    collapsedTop: 0,
    triggerWidth: 0,
  },
  methods: {
    onTriggerTap() {
      this.setData({ collapsed: !this.data.collapsed });
    },
    checkContent() {
      const query = this.createSelectorQuery();
      query
        .select('.hidden .text')
        .fields(
          {
            size: true,
            computedStyle: ['line-height'],
          },
          (res) => {
            const lineHeight = parseFloat(res['line-height']);
            // height 与 行高*行数 可能有细小偏差，需要取整
            const totalRows = Math.round(res.height / lineHeight);
            this.setData({
              // 计算浮动距离顶部距离
              top: lineHeight * (totalRows - 1) + 'px',
              collapsedTop: lineHeight * (this.data.rows - 1) + 'px',
              // 计算内容是否多余指定行数
              showTrigger: lineHeight * this.data.rows < res.height,
            });
          },
        )
        .exec();

      query
        .select('.hidden .trigger')
        .fields({ computedStyle: ['width', 'marginLeft', 'paddingLeft'] }, (res) => {
          // 计算按钮宽度
          const { width, marginLeft, paddingLeft } = res;
          const triggerWidth = parseFloat(width) + parseFloat(marginLeft) + parseFloat(paddingLeft) + 'px';
          this.setData({ triggerWidth });
        })
        .exec();
    },
  },
});
