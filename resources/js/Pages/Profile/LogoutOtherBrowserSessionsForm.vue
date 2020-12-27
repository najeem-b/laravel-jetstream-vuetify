<template>
  <form-card
    submitBtnText="Logout Other Browser Sessions"
    :handleSubmit="confirmLogout"
    :message="message"
  >
    <template #title>
      Browser Sessions
    </template>

    <template #subtitle>
      Manage and logout your active sessions on other browsers and devices.
    </template>

    <p>
      If necessary, you may logout of all of your other browser sessions across all of your devices. Some of your
      recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been
      compromised, you should also update your password.
    </p>

    <!-- Other Browser Sessions -->
    <v-list v-if="sessions.length > 0">
      <v-list-item
        v-for="(session, i) in sessions"
        :key="i"
      >
        <v-list-item-icon>
          <v-icon v-if="session.agent.is_desktop">
            mdi-desktop-mac
          </v-icon>
          <v-icon v-else>
            mdi-cellphone-iphone
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ session.agent.platform }} - {{ session.agent.browser }}
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ session.ip_address }},

            <span
              class="success--text font-weight-bold"
              v-if="session.is_current_device"
            >
              This device
            </span>

            <template v-else>
              Last active {{ session.last_active }}
            </template>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- Logout Other Devices Confirmation Modal -->
    <modal :show="confirmingLogout" @close="confirmingLogout = false">
      <template #title>
        Logout Other Browser Sessions
      </template>

      <template #content>
        <p>
          Please enter your password to confirm you would like to logout of your other browser sessions across all of
          your devices.
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
          @click.native="confirmingLogout = false"
        >
          Nevermind
        </v-btn>

        <v-btn
          color="primary"
          @click.native="logoutOtherBrowserSessions"
        >
          Logout Other Browser Sessions
        </v-btn>
      </template>
    </modal>
  </form-card>
</template>

<script>
import FormCard from '@/Components/FormCard'
import Modal from '@/Components/Modal'

export default {
  props: ['sessions'],

  components: {
    FormCard,
    Modal
  },

  data () {
    return {
      confirmingLogout: false,

      form: this.$inertia.form({
        _method: 'DELETE',
        password: ''
      }, {
        bag: 'logoutOtherBrowserSessions'
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
    confirmLogout () {
      this.form.password = ''

      this.confirmingLogout = true

      setTimeout(() => {
        this.$refs.password.focus()
      }, 250)
    },

    logoutOtherBrowserSessions () {
      this.form.post(route('other-browser-sessions.destroy'), {
        preserveScroll: true
      }).then(response => {
        if (!this.form.hasErrors()) {
          this.confirmingLogout = false
        }
      })
    }
  }
}
</script>
