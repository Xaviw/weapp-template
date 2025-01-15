import { initAegis } from 'utils/aegis';
import { initAnim } from 'utils/anim/index';

App({
  onLaunch() {
    initAegis();
    initAnim();
  },
});
