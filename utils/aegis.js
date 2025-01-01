/**
 * Aegis 文档：https://cloud.tencent.com/document/product/1464/58566
 */

import Aegis from 'aegis-mp-sdk';
import { config } from '../config';

let aegis;

export function initAegis() {
  aegis = new Aegis({
    id: config.rumId, // 请填写 RUM 监控应用 key
    uin: '', // 用户唯一标识符，需要动态获取
    reportApiSpeed: true, // 接口测速
    reportAssetSpeed: true, // 静态资源测速
    hostUrl: 'https://rumt-zh.com',
    spa: true, // 页面切换的时候上报 pv
    api: {
      apiDetail: true,
      injectTraceHeader: 'traceparent', // 注意这里目前支持 traceparent，sw8。请根据后端 Trace 协议选择使用
      injectTraceIgnoreUrls: ['/v1/traces', /rumt-zh.com/, /otheve.beacon.qq.com/], // 忽略不参与注入的接口
      retCodeHandler(data, url) {
        let responseData = data;
        try {
          responseData = JSON.parse(data);
        } catch (e) {}
        // 如果涉及到第三方请求，可自行判断条件
        // if(url === '') { return {} }

        // 业务请求
        return {
          // isErr 如果是 true 的话，会上报一条 retcode 异常的日志。
          isErr: !!responseData.Response.Error?.Code,
          code: responseData.Response.Error?.Code,
        };
      },
    },
  });

  return aegis;
}

/**
 * 获取 aegis 实例
 */
export function getAegis() {
  if (!aegis) {
    aegis = initAegis();
  }
  return aegis;
}

/**
 * 设置用户 uin
 * @param {string} uin
 */
export function setUin(uin) {
  const instance = getAegis();
  instance.setConfig({ uin });
}
