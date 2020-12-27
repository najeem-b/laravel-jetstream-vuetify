<template>
  <auth-layout
    :handleSubmit="handleSubmit"
    submitBtnText="Resend Verification Email"
  >
    <template #title>
      Verify Your Email
    </template>

    <template #message>
      <template v-if="validResponse">
        A new verification link has been sent to the email address you provided during registration.
      </template>
    </template>

    <template #form>
      <p>
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
      </p>
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
          resetOnSuccess: true
        }
      ),
      valid: true,
      validResponse: false
    }
  },

  components: {
    AuthLayout
  },

  methods: {
    handleSubmit: function () {
      this.form.post(route('verification.send'), {
        preserveScroll: true,
        onSuccess: page => {
          this.validResponse = true
        }
      })
    }
  }
}
</script>
