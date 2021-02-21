import Home from 'pages/Home';
import ContactUs from 'pages/ContactUs';

export const HOME = {
  path: '/home',
  id: 'home',
  locale: 'home_name',
  name: 'Home',
  component: Home
};

export const CONTACT_US = {
  path: '/contactus',
  id: 'contactus',
  locale: 'contact_us_name',
  name: 'ContactUs',
  component: ContactUs
};

/** *
 * Main page routes and their components are defined which is provided to Vue-Router
 */
export default [
  HOME,
  CONTACT_US,
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/*',
    redirect: '/home'
  }
]
