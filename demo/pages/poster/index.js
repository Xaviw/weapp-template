Page({
  onReady() {
    const poster = this.selectComponent('#poster');
    poster.render({
      width: 350,
      height: 800,
      backgroundColor: '#ff0000',
      elements: [
        {
          type: 'block',
          width: 100,
          height: 100,
          borderWidth: 10,
          borderColor: '#00ff00',
          borderRadius: 20,
          backgroundColor: '#0000ff',
          x: 10,
          y: 10,
        },
        {
          type: 'text',
          x: 10,
          y: 110,
          fontSize: 22,
          color: '#eeeeee',
          textAlign: 'center',
          text: '这是一段测试文本，这是一段测试文本，这是一段测试文本',
          lineNum: 2,
          lineHeight: 1.5,
        },
      ],
    });
  },
});
