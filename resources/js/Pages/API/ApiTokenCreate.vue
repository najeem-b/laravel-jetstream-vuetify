<template>
  <form-card
    :handleSubmit="createApiToken"
    :message="message"
    submitBtnText="Create"
  >
    <template #title>
      Create API Token
    </template>

    <template #subtitle>
      API tokens allow third-party services to authenticate with our application on your behalf.
    </template>

    <!-- Token Name Field -->
    <v-text-field
      outlined
      label="Name"
      v-model="createApiTokenForm.name"
      :error-messages="createApiTokenForm.error('name')"
    ></v-text-field>

    <!-- Token Permissions -->
    <p class="text-subtitle-1 font-weight-medium">
      Permissions
    </p>

    <v-row>
      <v-col
        cols="12"
        md="6"
        v-for="permission in availablePermissions"
        :key="permission"
      >
        <v-checkbox
          dense
          class="ma-0"
          v-model="createApiTokenForm.permissions"
          :label="permission"
          :value="permission"
        ></v-checkbox>
      </v-col>
    </v-row>

    <!-- Token Value Modal -->
    <modal
      :show="displayingToken"
      @close="displayingToken = false"
    >
      <template #title>
        API Token
      </template>

      <template #content>
        <p>
          Please copy your new API token. For your security, it won't be shown again.
        </p>

        <v-text-field
          outlined
          readonly
          v-if="$page.jetstream.flash.token"
          ref="new_token"
          append-icon="mdi-content-copy"
          :success-messages="tokenSuccessMessage"
          :value="$page.jetstream.flash.token"
          @click:append="copyTokenText"
        ></v-text-field>
      </template>

      <template #footer>
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          @click.native="displayingToken = false"
        >
          Close
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

  props: [
    'tokens',
    'availablePermissions',
    'defaultPermissions'
  ],

  data () {
    return {
      createApiTokenForm: this.$inertia.form({
        name: '',
        permissions: this.defaultPermissions
      }, {
        bag: 'createApiToken',
        resetOnSuccess: true
      }),

      updateApiTokenForm: this.$inertia.form({
        permissions: []
      }, {
        resetOnSuccess: false,
        bag: 'updateApiToken'
      }),

      deleteApiTokenForm: this.$inertia.form(),

      displayingToken: false,
      managingPermissionsFor: null,
      apiTokenBeingDeleted: null,
      tokenSuccessMessage: null
    }
  },

  computed: {
    message () {
      return {
        show: false,
        text: 'Created',
        type: 'success'
      }
    }
  },

  methods: {
    showTokenSuccess () {
      this.tokenSuccessMessage = 'Text copied successfully'

      setTimeout(() => {
        this.tokenSuccessMessage = null
      }, 2000)
    },

    copyTokenText () {
      const token = this.$refs.new_token

      // check if clipboard api is available
      navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
        if (result.state === 'granted' || result.state === 'prompt') {
          navigator.clipboard.writeText(token.value).then(() => this.showTokenSuccess())
        } else {
          token.select()
          document.execCommand('copy')
          this.showTokenSuccess()
        }
      })
    },

    createApiToken () {
      this.createApiTokenForm.post(route('api-tokens.store'), {
        preserveScroll: true
      }).then(response => {
        if (!this.createApiTokenForm.hasErrors()) {
          this.displayingToken = true
        }
      })
    },

    manageApiTokenPermissions (token) {
      this.updateApiTokenForm.permissions = token.abilities

      this.managingPermissionsFor = token
    },

    updateApiToken () {
      this.updateApiTokenForm.put(route('api-tokens.update', this.managingPermissionsFor), {
        preserveScroll: true,
        preserveState: true
      }).then(response => {
        this.managingPermissionsFor = null
      })
    },

    confirmApiTokenDeletion (token) {
      this.apiTokenBeingDeleted = token
    },

    deleteApiToken () {
      this.deleteApiTokenForm.delete(route('api-tokens.destroy', this.apiTokenBeingDeleted), {
        preserveScroll: true,
        preserveState: true
      }).then(() => {
        this.apiTokenBeingDeleted = null
      })
    },

    fromNow (timestamp) {
      return moment(timestamp).local().fromNow()
    }
  }
}
</script>
