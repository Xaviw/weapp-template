class UserStore {
  data = {
    // 用户信息
    userInfo: null,
  };

  // 用于提供给 JS 判断用户是否登录
  isLogin() {
    return !!this.data.userInfo;
  }

  // 更新用户信息
  updateUserInfo(userInfo) {
    if (userInfo) {
      this.data.userInfo = userInfo;
      this.updateApp();
    }
  }
}

export default new UserStore();
