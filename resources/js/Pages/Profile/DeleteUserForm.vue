<template>
  <form-card
    :handleSubmit="confirmUserDeletion"
    :message="message"
    submitBtnText="Delete Account"
  >
    <template #title>
      Delete Account
    </template>

    <template #subtitle>
      Permanently delete your account.
    </template>

    <p>
      Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your
      account, please download any data or information that you wish to retain.
    </p>

    <!-- Delete Account Confirmation Modal -->
    <modal
      :show="confirmingUserDeletion"
      @close="confirmingUserDeletion = false"
    >
      <template #title>
        Delete Account
      </template>

      <template #content>
        <p>
          Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will
          be permanently deleted. Please enter your password to confirm you would like to permanently delete your
          account.
        </p>

        <!-- Password Field -->
        <v-text-field
          outlined
          label="Password"
          v-model="form.password"
          autocomplete="current-password"
          ref="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="form.error('password')"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </template>

      <template #footer>
        <v-spacer></v-spacer>

        <v-btn
          text
          @click.native="confirmingUserDeletion = false"
        >
          Nevermind
        </v-btn>

        <v-btn
          color="error"
          @click.native="deleteUser"
        >
          Delete Account
        </v-btn>
      </template>
    </modal>
  </form-card>
</template>

<script>
import FormCard from '@/Components/FormCard'
import Modal from '@/Components/Modal'

export default {
  components: {
    FormCard,
    Modal
  },

  data () {
    return {
      confirmingUserDeletion: false,

      form: this.$inertia.form({
        _method: 'DELETE',
        password: ''
      }, {
        bag: 'deleteUser'
      }),

      showPassword: false
    }
  },

  computed: {
    message () {
      return {
        show: this.form.recentlySuccessful,
        text: 'Done.',
        type: 'success'
      }
    }
  },

  methods: {
    confirmUserDeletion () {
      this.form.password = ''

      this.confirmingUserDeletion = true

      setTimeout(() => {
        this.$refs.password.focus()
      }, 250)
    },

    deleteUser () {
      this.form.post(route('current-user.destroy'), {
        preserveScroll: true
      }).then(response => {
        if (!this.form.hasErrors()) {
          this.confirmingUserDeletion = false
        }
      })
    }
  }
}
</script>
