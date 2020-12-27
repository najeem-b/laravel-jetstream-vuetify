<template>
  <form-card
    :handleSubmit="updatePassword"
    :message="message"
  >
    <template #title>
      Update Password
    </template>

    <template #subtitle>
      Ensure your account is using a long, random password to stay secure.
    </template>

     <!-- Current Password Field -->
      <v-text-field
        outlined
        label="Current Password"
        v-model="form.current_password"
        autocomplete="current-password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :error-messages="form.error('current_password')"
        @click:append="showCurrentPassword = !showCurrentPassword"
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
    ></v-text-field>
  </form-card>
</template>

<script>
import FormCard from '../../Components/FormCard'

export default {
  components: {
    FormCard
  },

  data () {
    return {
      form: this.$inertia.form({
        current_password: '',
        password: '',
        password_confirmation: ''
      }, {
        bag: 'updatePassword'
      }),
      showCurrentPassword: false,
      showPassword: false,
      showPasswordConfirmation: false
    }
  },

  computed: {
    message () {
      return {
        show: this.form.recentlySuccessful,
        text: 'Saved',
        type: 'success'
      }
    }
  },

  methods: {
    updatePassword () {
      this.form.put(route('user-password.update'), {
        preserveScroll: true
      }).then(() => {
        this.$refs.current_password.focus()
      })
    }
  }
}
</script>
