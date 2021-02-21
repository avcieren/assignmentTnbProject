<template>
  <div>
    <form novalidate class="md-layout md-alignment-center-center contact-us-form" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">{{t('contact_us_header')}}</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="contactUs-first-name">{{t('contact_us_first_name')}}</label>
                <md-input name="first-name" id="contactUs-first-name" autocomplete="given-name" v-model="contactUs.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.contactUs.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.contactUs.firstName.minlength">Invalid first name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="contactUs-last-name">{{t('contact_us_last_name')}}</label>
                <md-input name="last-name" id="contactUs-last-name" autocomplete="family-name" v-model="contactUs.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.contactUs.lastName.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.contactUs.lastName.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('country')">
                <label for="country">{{t('contact_us_country')}}</label>
                <md-select name="country" id="country" v-model="contactUs.country" md-dense :disabled="sending">
                  <md-option v-bind:key="country.id" v-for="country in countryList" :value="country.id">{{ t(country.locale) }}</md-option>
                </md-select>
                <span class="md-error">The country is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('phoneNumber')">
                <label for="phoneNumber">{{t('contact_us_phone_number')}}</label>
                <md-input id="phoneNumber" name="phoneNumber" autocomplete="phoneNumber" v-model="contactUs.phoneNumber" :disabled="sending" />
                <span class="md-error" v-if="!$v.contactUs.phoneNumber.required">The phone number is required</span>
                <span class="md-error" v-else-if="!$v.contactUs.phoneNumber.minLength">Invalid phone number</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('email')">
            <label for="contactUs-email">{{t('contact_us_email')}}</label>
            <md-input type="email" name="email" id="contactUs-email" autocomplete="email" v-model="contactUs.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.contactUs.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.contactUs.email.email">Invalid email</span>
          </md-field>

          <md-field :class="getValidationClass('message')">
            <label>{{t('contact_us_message')}}</label>
            <md-textarea name="message" id="message" v-model="contactUs.message" :disabled="sending"></md-textarea>
            <md-icon>description</md-icon>
            <span class="md-error" v-if="!$v.contactUs.message.required">The message is required</span>
            <span class="md-error" v-else-if="!$v.contactUs.message.email">Invalid message</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">{{ t('contact_us_send_btn') }}</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="messageSent">The message was sent with success!</md-snackbar>
    </form>
  </div>
</template>
<script>
import './style.less';

// Form validator lib.
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'ContactUs',
  mixins: [validationMixin],
  props: {
    t: Function
  },
  data: () => ({
    contactUs: {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      country: null,
      message: null,
    },
    messageSent: false,
    sending: false
  }),
  computed: {
    // Returns country full list object.
    countryList() {
      return this.$store.state.contactUs.countryList;
    }
  },
  // Once component is rendered, it will auto-fill the texts with logged in details
  // which is going to be fetched from login modal store.
  mounted() {
    this.contactUs.firstName = this.$store.state.login.form.firstName;
    this.contactUs.lastName = this.$store.state.login.form.lastName;
    this.contactUs.email = this.$store.state.login.form.email;
  },
  validations: {
    contactUs: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      phoneNumber: {
        required,
        minLength: minLength(6)
      },
      country: {
        required
      },
      message: {
        required,
        minLength: minLength(5)
      },
    }
  },
  methods: {
    // If the given value is invalid, it returns invalid class name to show the invalidity on UI.
    getValidationClass (fieldName) {
      const field = this.$v.contactUs[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        };
      }
    },
    // Resets form details.
    clearForm () {
      this.$v.$reset()
      this.contactUs.firstName = null;
      this.contactUs.lastName = null;
      this.contactUs.email = null;
      this.contactUs.phoneNumber = null;
      this.contactUs.country = null;
      this.contactUs.message = null;
    },
    // Dispatches action to save the details to Vuex.
    sendMessage () {
      this.sending = true;

      // Dummy timeout to replicate server delay.
      window.setTimeout(() => {
        this.messageSent = true;
        this.sending = false;
        this.$store.dispatch('sendContactUsFormDetails', this.contactUs);
        this.clearForm();
      }, 1500)
    },
    // Validates each text box's value for the defined rules above.
    validateUser () {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.sendMessage();
      }
    }
  }
}
</script>
