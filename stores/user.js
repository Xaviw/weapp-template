const USER_STORAGE_KEY = 'user-info';

class UserStore {
  data = {
    userInfo: wx.getStorageSync(USER_STORAGE_KEY),
  };

  isLogin() {
    return !!this.data.userInfo?.VolunteerID;
  }

  setUserInfo(userInfo) {
    this.data.userInfo = userInfo;
    this.update();
  }

  setUserInfoApp(userInfo) {
    this.data.userInfo = userInfo;
    this.updateApp();
  }

  login() {}

  logout() {}
}

export default new UserStore();
