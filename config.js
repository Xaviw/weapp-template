const configs = {
  // 开发环境
  develop: {
    appId: 'wx8f1fde6d214dd86f',
    rumId: 'p0x7mskrgjX58jO1ly',
    host: 'https://api-dev.community-platform.qq.com',
    socket: 'wss://api-dev.community-platform.qq.com',
    // cdn: 'https://cdn-public-dev.community-platform.qq.com',
    cdn: 'https://cdn-public-test.community-platform.qq.com',
  },
  // 体验（测试）环境
  trial: {
    appId: 'wx6240d984c989275c',
    rumId: 'p0x7mskrgjX58jO1ly',
    host: 'https://api-test.community-platform.qq.com',
    socket: 'wss://api-test.community-platform.qq.com',
    cdn: 'https://cdn-public-test.community-platform.qq.com',
  },
  // 正式环境
  release: {
    appId: 'wx6240d984c989275c',
    rumId: 'Jj1Pyclk1Jg577qDXv',
    host: 'https://api.community-platform.qq.com',
    socket: 'wss://api.community-platform.qq.com',
    cdn: 'https://cdn-public.community-platform.qq.com',
  },
};

const {
  miniProgram: { envVersion },
} = wx.getAccountInfoSync();

const ENV_STORAGE_KEY = '_app_env';

/**
 * 当前环境，非正式版小程序环境时支持切换
 * @type {WechatMiniprogram.AccountInfo['miniProgram']['envVersion']}
 */
export const env = envVersion === 'release' ? 'release' : wx.getStorageSync(ENV_STORAGE_KEY) || 'release';

export const config = configs[env];

/**
 * 切换配置，仅非正式版小程序环境下可用
 */
export function changeEnv() {
  if (envVersion === 'release') return;

  const itemList = Object.keys(configs);
  wx.showActionSheet({
    alertText: `切换环境(当前环境：${env})`,
    itemList,
  }).then(({ tapIndex }) => {
    if (env !== itemList[tapIndex]) {
      // 清除缓存防止多环境缓存混杂
      wx.clearStorageSync();
      // 记住当前选择的环境
      wx.setStorageSync(ENV_STORAGE_KEY, itemList[tapIndex]);
      // 重启小程序（基础库 3.0.1 以上）
      wx.restartMiniProgram({ path: '/pages/index/index' });
    }
  });
}
