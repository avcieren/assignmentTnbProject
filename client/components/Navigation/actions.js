import t from 'services/actionTypes';

export default {
  updateLanguage ({commit}, payload) {
    commit(t.NAVIGATION_UPDATE_LANGUAGE_SELECTION, payload);
  },

  updatePage ({commit}, payload) {
    commit(t.NAVIGATION_UPDATE_PAGE, payload);
  }
}
