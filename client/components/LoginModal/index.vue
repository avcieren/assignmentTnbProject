<template>
  <div>
    <md-dialog :md-active.sync="showModal">
      <md-dialog-title>{{ t('login_modal_header') }}</md-dialog-title>

      <form novalidate class="md-layout">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="first-name">{{t('login_modal_first_name')}}</label>
                  <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="last-name">{{t('login_modal_last_name')}}</label>
                  <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="password">{{t('login_modal_password')}}</label>
                  <md-input name="password" id="password" type="password" autocomplete="password" v-model="form.password" :disabled="sending" />
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="email">{{t('login_modal_email')}}</label>
                  <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                </md-field>
              </div>
            </div>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />
      </form>

      <md-dialog-actions>
        <md-button class="md-primary" @click="onClose">{{t('login_modal_close_btn')}}</md-button>
        <md-button class="md-primary" @click="onSave">{{t('login_modal_proceed_btn')}}</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  props: {
    t: Function
  },
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    },
    sending: false,
  }),
  computed: {
    // Returns the state whether or not modal should be shown.
    showModal() {
      return this.$store.state.login.showModal;
    }
  },
  methods: {
    // Dispatches action to close the modal.
    onClose() {
      this.$store.dispatch('showLoginModal', false);
    },
    // Dispatches action to save the user details to the store.
    onSave() {
      this.sending = true;
      // Replicates a delay to match a server request async behavior.
      setTimeout(() => {
        this.sending = false;
        this.$store.dispatch('saveUserCredentials', this.form);
        this.$store.dispatch('showLoginModal', false);
      }, 1000);
    }
  }
}
</script>
