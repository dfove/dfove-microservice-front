import state from "./state";

export default {
  LOGIN_IN(state, token) {
    state.token = token;
  },
  LOGIN_OUT(state) {
    state.token = "";
    state.userInfo = {};
    localStorage.clear();
    // window.location.reload();
  },
  SET_ISCOLLAPSE(state, status) {
    state.isCollapse = status;
  },
  SET_USERINFO(state, data) {
    state.userInfo = data;
  },
  SET_MENU_ACTIVE(state, data) {
    state.menuActive = data;
  }
};
