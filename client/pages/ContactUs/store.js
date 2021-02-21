export const NAME = 'contactUs';
import actions from './actions';
import t from 'services/actionTypes';

const countryList = [
  {
    id: "TR",
    locale: 'country-list-tr'
  },
  {
    id: "US",
    locale: 'country-list-usa'
  },
  {
    id: "GB",
    locale: 'country-list-gb'
  },
  {
    id: "DE",
    locale: 'country-list-de'
  },
  {
    id: "SE",
    locale: 'country-list-se'
  },
  {
    id: "KE",
    locale: 'country-list-ke'
  },
  {
    id: "BR",
    locale: 'country-list-br'
  },
  {
    id: "ZW",
    locale: 'country-list-zw'
  }
]

// Initial state.
const state = {
  countryList,
  contactUsForm: {
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    country: null,
    message: null
  }
};

// Action list to mutate the state.
const mutations = {
  [t.CONTACT_US_SEND_FORM_DETAILS] (state, payload) {
    state.contactUsForm = payload;
  }
}

export default {
  mutations,
  actions,
  state
}
