<template>
  <auth-layout
    :handleSubmit="handleSubmit"
    submitBtnText="Email Password Reset Link"
  >
    <template #title>
      Forgot your password?
    </template>

    <template #subtitle>
      No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
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
          email: this.email
        },
        {
          resetOnSuccess: true
        }
      ),
      valid: true,
      emailRules: [
        v => !!v || 'The email field is required.',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    }
  },

  components: {
    AuthLayout
  },

  methods: {
    handleSubmit: function () {
      this.form.post(route('password.email'), {
        preserveScroll: true
      })
    }
  }
}
</script>
