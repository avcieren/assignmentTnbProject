<template>
  <div id="app">
    <Navigation :t="translate"/>
    <router-view class="md-content" :t="translate"></router-view>
    <Footer class="md-alignment-bottom-center" :t="translate"/>
  </div>
</template>
<script>

// Main VueJS tools.
import Vue from 'vue';
import VueRouter from 'vue-router';

// Registering vue-material for the widgets and app theme.
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

// routes and the stores of the app.
import routes from 'routes';
import store from 'stores';

// Components
import Navigation from 'components/navigation';
import Footer from 'components/footer';

// Util
import translations from "./translation.json";

Vue.use(VueMaterial);
Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

export default Vue.extend({
  components: {
    Navigation,
    Footer
  },
  methods: {
    /**
     * Main translate function that is passed throughout the application.
     * @param id - Id of the locale prop
     * @returns {String} Returns the translated string.
     */
    translate (id) {
      const selectedLanguage = this.$store.state.navigation.selectedLanguage;
      return translations[selectedLanguage][id];
    }
  },
  store,
  router,
});

</script>
