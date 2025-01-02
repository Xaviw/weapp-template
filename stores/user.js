class UserStore {
  data = {
    userInfo: null,
  };

  isLogin() {
    return !!this.data.userInfo?.VolunteerID;
  }

  setUserInfo(userInfo) {
    this.data.userInfo = userInfo;
    this.updateApp();
  }
}

export default new UserStore();
