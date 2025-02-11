import { initAegis } from 'utils/aegis';
import { initAnim } from 'utils/anim';
import 'utils/routeGuards';

App({
  onLaunch() {
    initAegis();
    initAnim();
  },
});
