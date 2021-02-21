export const NAME = 'login';
import actions from './actions';
import t from 'services/actionTypes';

// Initial state.
const state = {
  showModal: false,
  form: {
    firstName: null,
    lastName: null,
    email: null,
    password: null
  }
};

// Login modal component mutations.
const mutations = {
  [t.LOGIN_SHOW_LOGIN_MODAL] (state, payload) {
    state.showModal = payload;
  },
  [t.LOGIN_SAVE_USER_CREDENTIALS] (state, payload) {
    state.form = payload;
  },
  [t.LOGIN_REMOVE_USER_CREDENTIALS] (state) {
    // Sets null to replicate logout action.
    for (const key in state.form) {
      if (state.form.hasOwnProperty(key)) {
        state.form[key] = null;
      }
    }
  }
}

export default {
  mutations,
  actions,
  state
}
