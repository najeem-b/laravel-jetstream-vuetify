<template>
  <auth-layout
    :handleSubmit="login"
    submitBtnText="Login"
  >
    <template #title>
      Log in to your account
    </template>

    <template #form>
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
        type="password"
        label="Password"
        v-model="form.password"
        autocomplete="password"
        :error-messages="form.error('password')"
        :rules="passwordRules"
      ></v-text-field>
    </template>

    <template #actions>
      <v-btn
        text
        :href="route('password.request')">
        Forgot your password?
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
          email: this.email,
          password: this.password
        },
        {
          resetOnSuccess: true
        }
      ),
      valid: true,
      emailRules: [
        v => !!v || 'The email field is required.',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'The password field is required.'
      ]
    }
  },

  components: {
    AuthLayout
  },

  methods: {
    login () {
      this.form.post(route('login'), {
        preserveScroll: true
      })
    }
  }
}
</script>
