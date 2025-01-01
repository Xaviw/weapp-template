import { initAegis } from 'utils/aegis';
import { initAnim } from 'utils/anim';

App({
  onLaunch() {
    initAegis();
    initAnim();
  },
});
