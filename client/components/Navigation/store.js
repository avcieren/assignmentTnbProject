export const NAME = 'navigation';
import actions from './actions';
import t from 'services/actionTypes';
import routes, {HOME} from 'core/routes';

const languages = [{
  name: 'English',
  id: 'en'
}, {
  name: 'Turkce',
  id: 'tr'
}];

const pages = routes.filter((route) => route.id);

const state = {
  selectedLanguage: 'en',
  currentPage: HOME.id,
  languages,
  pages
};

const mutations = {
  [t.NAVIGATION_UPDATE_LANGUAGE_SELECTION] (state, payload) {
    state.selectedLanguage = payload;
  },

  [t.NAVIGATION_UPDATE_PAGE] (state, payload) {
    console.log('semih NAVIGATION_UPDATE_PAGE');
    state.currentPage = payload;
  }
}

export default {
  mutations,
  actions,
  state
}
