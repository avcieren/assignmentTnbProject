<template>
  <md-toolbar class="md-accent" md-elevation="1">
    <md-avatar class="md-avatar-icon">
      <md-icon v-if="isHome">home</md-icon>
      <md-icon v-if="!isHome">mail_outline</md-icon>
    </md-avatar>
    <h3 class="md-display-1" style="flex: 1">{{t(currentPageName)}}</h3>
    <md-button v-if="!userName" class="md-primary md-raised navigation-button" @click="onLogin">{{t('login_btn')}}</md-button>
    <md-button class="md-primary md-raised navigation-button" @click="onClickHome">{{t('home_btn')}}</md-button>
    <md-button class="md-primary md-raised navigation-button" @click="onClickContactUs">{{t('contact_us_btn')}}</md-button>
    <md-menu v-if="!!userName" md-direction="bottom-start">
      <md-button md-menu-trigger>{{userName}}</md-button>
      <md-menu-content>
        <md-menu-item>{{email}}</md-menu-item>
        <md-menu-item @click="onLogout">Logout</md-menu-item>
      </md-menu-content>
    </md-menu>
    <md-menu md-direction="bottom-start">
      <md-button md-menu-trigger>{{selectedLanguage}}</md-button>
      <md-menu-content>
        <md-menu-item v-bind:key="lang.id" v-for="lang in navigation.languages" @click="onChangeLanguage(lang.id)">{{lang.name}}</md-menu-item>
      </md-menu-content>
    </md-menu>
    <login-modal :t="t"/>
  </md-toolbar>
</template>
<script>
import './style.less';
import { HOME, CONTACT_US } from 'core/routes';
import LoginModal from 'components/LoginModal';

export default {
  props: {
    t: Function
  },
  components: {
    LoginModal
  },
  computed: {
    navigation() {
      return this.$store.state.navigation;
    },
    currentPageName() {
      const currentPage = this.$store.state.navigation.currentPage;
      const page = this.$store.state.navigation.pages.find((page) => page.id === currentPage);
      return page.locale;
    },
    selectedLanguage() {
      const selectedLanguageId = this.$store.state.navigation.selectedLanguage;
      const languages = this.$store.state.navigation.languages;
      const selectedLanguage = languages.find((lang) => lang.id === selectedLanguageId);
      return selectedLanguage.name;
    },
    userName() {
      return this.$store.state.login.form.firstName;
    },
    email() {
      return this.$store.state.login.form.email;
    },
    isHome() {
      const currentPage = this.$store.state.navigation.currentPage;
      return currentPage === HOME.id;
    }
  },
  methods: {
    onLogin() {
      this.$store.dispatch('showLoginModal', true);
    },
    onClickHome() {
      if (this.$store.state.navigation.currentPage === HOME.id) {
        return;
      }
      this.$store.dispatch('updatePage', HOME.id);
      this.$router.push({ name: HOME.name });
    },
    onClickContactUs() {
      if (this.$store.state.navigation.currentPage === CONTACT_US.id) {
        return;
      }
      this.$store.dispatch('updatePage', CONTACT_US.id);
      this.$router.push({ name: CONTACT_US.name });
    },
    onChangeLanguage(selection) {
      this.$store.dispatch('updateLanguage', selection);
    },
    onLogout() {
      this.$store.dispatch('removeCredentials', {});
    }
  }
}
</script>
