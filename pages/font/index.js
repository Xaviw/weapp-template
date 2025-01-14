Page({
  data: {},

  loadFonts() {
    [
      'MiSans-Thin',
      'MiSans-ExtraLight',
      'MiSans-Light',
      'MiSans-Normal',
      'MiSans-Regular',
      'MiSans-Medium',
      'MiSans-Demibold',
      'MiSans-Semibold',
      'MiSans-Bold',
      'MiSans-Heavy',
    ].forEach((font, index) => {
      const weight = (index + 1) * 100;
      wx.loadFontFace({
        family: 'MiSans',
        source: `url(https://cdn-public-test.community-platform.qq.com/fonts/${font}.ttf)`,
        desc: { weight },
        scopes: ['webview', 'native'],
      });
    });
  },
});
