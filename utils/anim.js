/**
 * Anim 文档：http://digital.ssv.tencent.com/@ssv-lab/anim/
 */

import Anim from '@ssv-lab/anim';
import DatongPlugin from '@ssv-lab/anim-plugin-datong';
// import CryptoPlugin from '@ssv-lab/anim-plugin-api-encrypt';
// import LoggerPlugin from '@ssv-lab/anim-plugin-logger';
// import GrayPlugin from '@ssv-lab/anim-plugin-api-gray';

// eslint-disable-next-line no-unused-vars
import { env, config } from '../config';

export function initAnim() {
  Anim.use(DatongPlugin, {
    // debug: true,
    beacon: '0MA00656CDQTRHLG',
    pageSelector: '.expose-page',
    exposeSelector: '.expose',
    exposeParentSelector: '.expose-container',
  });

  // 加密插件，可以通过注释开启
  // if (env === 'release') {
  //   Anim.use(CryptoPlugin, {
  //     publicKeyUrl: `${config.host}/kong/requestEncryption/getPublicKey`,
  //   });
  // }

  // 灰度插件
  // Anim.use(GrayPlugin, {
  //   grayKeys: ['X-SSV-GREY-INFO', 'X-SSV-UID'],
  // });

  // 日志采集插件
  // Anim.use(LoggerPlugin, {
  //   bisDomains: [config.host],
  //   errCodes: [],
  // });
}
