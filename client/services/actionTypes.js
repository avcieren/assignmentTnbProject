
// Mutation list names.
// Also, there is a validator to make sure there is no duplicated mutation name
// In order to prevent duplicate actions.
const actionTypes = [
  // Navigation
  'NAVIGATION_UPDATE_LANGUAGE_SELECTION',
  'NAVIGATION_UPDATE_PAGE',

  // Login
  'LOGIN_SHOW_LOGIN_MODAL',
  'LOGIN_SAVE_USER_CREDENTIALS',
  'LOGIN_REMOVE_USER_CREDENTIALS',

  // Contact Us
  'CONTACT_US_SEND_FORM_DETAILS'
].reduce((actionTypes, name) => ({
  ...actionTypes,
  [name]: actionTypes[name] ? duplicatedActionName(name) : name
}), {});

function duplicatedActionName () {
  throw new Error('Duplicated action name');
}

export default actionTypes;
