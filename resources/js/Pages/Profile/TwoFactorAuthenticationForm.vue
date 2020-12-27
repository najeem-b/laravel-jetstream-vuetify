<template>
  <form-card
    :handleSubmit="enableTwoFactorAuthentication"
    :message="message"
  >
    <template #title>
      Two Factor Authentication
    </template>

    <template #subtitle>
      Add additional security to your account using two factor authentication.
    </template>

    <h3 class="text-lg font-medium text-gray-900" v-if="twoFactorEnabled">
      You have enabled two factor authentication.
    </h3>

    <h3 class="text-lg font-medium text-gray-900" v-else>
      You have not enabled two factor authentication.
    </h3>

    <p>
      When two factor authentication is enabled, you will be prompted for a secure, random token during
      authentication. You may retrieve this token from your phone's Google Authenticator application.
    </p>

    <template v-if="twoFactorEnabled">
      <div v-if="qrCode">
        <div class="mt-4 max-w-xl text-sm text-gray-600">
          <p class="font-semibold">
            Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator
            application.
          </p>
        </div>

        <div class="mt-4 dark:p-4 dark:w-56 dark:bg-white" v-html="qrCode">
        </div>
      </div>

      <div v-if="recoveryCodes.length > 0">
        <div class="mt-4 max-w-xl text-sm text-gray-600">
          <p class="font-semibold">
            Store these recovery codes in a secure password manager. They can be used to recover access to your
            account if your two factor authentication device is lost.
          </p>
        </div>

        <v-list>
          <v-list-item-content v-for="code in recoveryCodes" :key="code">
            <v-list-item-subtitle>
              {{ code }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list>
      </div>
    </template>

    <template #footer>
      <confirms-password
        v-if="!twoFactorEnabled"
        @confirmed="enableTwoFactorAuthentication"
      >
        Enable
      </confirms-password>

      <template v-else>
        <confirms-password
          v-if="recoveryCodes.length > 0"
          @confirmed="regenerateRecoveryCodes"
        >
          Regenerate Recovery Codes
        </confirms-password>

        <confirms-password
          v-if="recoveryCodes.length == 0"
          @confirmed="showRecoveryCodes"
        >
          Show Recovery Codes
        </confirms-password>

        <confirms-password
          @confirmed="disableTwoFactorAuthentication"
        >
          Disable
        </confirms-password>
      </template>
    </template>
  </form-card>
</template>

<script>
import FormCard from '../../Components/FormCard'

import JetActionSection from '@/Jetstream/ActionSection'
import JetButton from '@/Jetstream/Button'
import ConfirmsPassword from '@/Components/ConfirmsPassword'
import JetDangerButton from '@/Jetstream/DangerButton'
import JetSecondaryButton from '@/Jetstream/SecondaryButton'

export default {
  components: {
    ConfirmsPassword,
    FormCard,
    JetActionSection,
    JetButton,
    JetDangerButton,
    JetSecondaryButton
  },

  data () {
    return {
      enabling: false,
      disabling: false,

      qrCode: null,
      recoveryCodes: []
    }
  },

  methods: {
    enableTwoFactorAuthentication () {
      this.enabling = true

      this.$inertia.post('/user/two-factor-authentication', {}, {
        preserveScroll: true
      }).then(() => {
        return Promise.all([
          this.showQrCode(),
          this.showRecoveryCodes()
        ])
      }).then(() => {
        this.enabling = false
      })
    },

    showQrCode () {
      return axios.get('/user/two-factor-qr-code')
        .then(response => {
          this.qrCode = response.data.svg
        })
    },

    showRecoveryCodes () {
      return axios.get('/user/two-factor-recovery-codes')
        .then(response => {
          this.recoveryCodes = response.data
        })
    },

    regenerateRecoveryCodes () {
      axios.post('/user/two-factor-recovery-codes')
        .then(response => {
          this.showRecoveryCodes()
        })
    },

    disableTwoFactorAuthentication () {
      this.disabling = true

      this.$inertia.delete('/user/two-factor-authentication', {
        preserveScroll: true
      }).then(() => {
        this.disabling = false
      })
    }
  },

  computed: {
    message () {
      return {
        show: false,
        text: 'Saved',
        type: 'success'
      }
    },

    twoFactorEnabled () {
      return !this.enabling && this.$page.user.two_factor_enabled
    }
  }
}
</script>
