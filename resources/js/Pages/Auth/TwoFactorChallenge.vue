<template>
  <auth-layout
    :handleSubmit="login"
    submitBtnText="Login"
  >
    <template #title>
      Please confirm access to your account by entering the authentication code provided by your authenticator application.
    </template>

    <template #form>
      <p>
        Confirm access to your account by entering one of your emergency recovery codes.
      </p>

      <!-- Code Field -->
      <v-text-field
        outlined
        label="Code"
        v-model="form.code"
        v-if="!recovery"
        ref="code"
        autocomplete="one-time-code"
        inputmode="numeric"
        :error-messages="form.error('code')"
      ></v-text-field>

      <!-- Recovery Code Field -->
      <v-text-field
        outlined
        type="password"
        label="Recovery Code"
        v-model="form.recovery_code"
        v-if="recovery"
        ref="recovery_code"
        autocomplete="one-time-code"
        :error-messages="form.error('recovery_code')"
      ></v-text-field>
    </template>

    <template #actions>
      <v-btn
        text
        v-if="recovery"
        @click="useCode"
      >
        Use a recovery code
      </v-btn>

      <v-btn
        text
        v-if="!recovery"
        @click="useRecoveryCode"
      >
        Use an authentication code
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
          code: this.code,
          recovery_code: this.recovery_code
        },
        {
          resetOnSuccess: true
        }
      ),
      valid: true,
      recovery: false
    }
  },

  components: {
    AuthLayout
  },

  methods: {
    login () {
      this.form.post('/two-factor-challenge', {
        preserveScroll: true
      })
    },

    useRecoveryCode () {
      this.recovery = true

      this.$nextTick(() => this.$refs.recovery_code.focus())
    },

    useCode () {
      this.recovery = false

      this.$nextTick(() => this.$refs.code.focus())
    }
  }
}
</script>
