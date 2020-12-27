<template>
  <auth-layout
    :handleSubmit="createUser"
    submitBtnText="Register"
  >
    <template #title>
      Register for Task App
    </template>

    <template #form>
      <!-- First Name Field -->
      <v-text-field
        outlined
        label="First Name"
        v-model="form.first_name"
        autocomplete="given-name"
        :error-messages="form.error('first_name')"
        :rules="firstNameRules"
      ></v-text-field>

      <!-- Last Name Field -->
      <v-text-field
        outlined
        label="Last Name"
        v-model="form.last_name"
        autocomplete="family-name"
        :error-messages="form.error('last_name')"
        :rules="lastNameRules"
      ></v-text-field>

      <!-- Email Field -->
      <v-text-field
        outlined
        label="Email"
        v-model="form.email"
        autocomplete="email"
        :error-messages="form.error('email')"
        :rules="emailRules"
      ></v-text-field>

      <!-- Password Field -->
      <v-text-field
        outlined
        label="Password"
        v-model="form.password"
        autocomplete="new-password"
        hint="Password must be at least 8 characters."
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :error-messages="form.error('password')"
        @click:append="showPassword = !showPassword"
        :rules="passwordRules"
      ></v-text-field>

      <!-- Password Confirmation Field -->
      <v-text-field
        outlined
        label="Confirm Password"
        v-model="form.password_confirmation"
        autocomplete="new-password"
        :type="showPasswordConfirmation ? 'text' : 'password'"
        :error-messages="form.error('password_confirmation')"
        :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPasswordConfirmation = !showPasswordConfirmation"
        :rules="passwordConfirmationRules"
      ></v-text-field>
    </template>

    <template #actions>
      <v-btn
        text
        :href="route('login')">
        Already registered?
      </v-btn>
    </template>
  </auth-layout>
</template>

<script>
import AuthLayout from '@/Layouts/AuthLayout'

export default {
  data () {
    return {
      form: this.$inertia.form(
        {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        },
        {
          bag: 'createUser',
          resetOnSuccess: true
        }
      ),
      showPassword: false,
      showPasswordConfirmation: false,
      valid: true,
      emailRules: [
        v => !!v || 'The email field is required.',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      firstNameRules: [
        v => !!v || 'The email field is required.'
      ],
      lastNameRules: [
        v => !!v || 'The email field is required.'
      ],
      passwordRules: [
        v => !!v || 'The password field is required.',
        v => (v && v.length >= 8) || 'Password must be at least 8 characters.'
      ],
      passwordConfirmationRules: [
        v => !!v || 'The password field is required.',
        v => v === this.form.password || 'Password confirmation must match password.'
      ]
    }
  },

  components: {
    AuthLayout
  },

  methods: {
    createUser () {
      this.form.post(route('register'), {
        preserveScroll: true
      })
    }
  }
}
</script>
