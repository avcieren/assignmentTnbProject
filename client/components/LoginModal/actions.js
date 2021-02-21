import t from 'services/actionTypes';

export default {
  showLoginModal ({commit}, payload) {
    commit(t.LOGIN_SHOW_LOGIN_MODAL, payload);
  },
  saveUserCredentials ({commit}, payload) {
    commit(t.LOGIN_SAVE_USER_CREDENTIALS, payload);
  },

  removeCredentials ({commit}, payload) {
    commit(t.LOGIN_REMOVE_USER_CREDENTIALS, payload);
  }
}
