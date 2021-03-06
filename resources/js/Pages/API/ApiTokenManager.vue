<template>
  <form-card
    :handleSubmit="createApiToken"
    :message="message"
    submitBtnText="Create"
  >
    <template #title>
      Manage API Tokens
    </template>

    <template #subtitle>
      You may delete any of your existing tokens if they are no longer needed.
    </template>

    <!-- API Token List -->
    <v-list>
      <v-list-item
        v-for="token in tokens"
        :key="token.id"
        :two-line="token.last_used_at"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ token.name }}
          </v-list-item-title>

          <v-list-item-title-subtitle
            v-if="token.last_used_at"
          >
            Last used {{ fromNow(token.last_used_at) }}
          </v-list-item-title-subtitle>
        </v-list-item-content>

        <v-list-item-action
          v-if="availablePermissions.length > 0"
        >
          <v-btn
            text
            @click="manageApiTokenPermissions(token)"
          >
            Permissions
          </v-btn>
        </v-list-item-action>

        <v-list-item-action>
          <v-btn
            text
            color="error"
            @click="confirmApiTokenDeletion(token)"
          >
            Delete
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <!-- API Token Permissions Modal -->
    <modal
      :show="managingPermissionsFor"
      @close="managingPermissionsFor = null"
    >
      <template #title>
        API Token Permissions
      </template>

      <template #content>
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
      </template>

      <template #footer>
        <v-spacer></v-spacer>

        <v-btn
          text
          @click.native="managingPermissionsFor = null"
        >
          Nevermind
        </v-btn>

        <v-btn
          color="primary"
          @click.native="updateApiToken"
        >
          Save
        </v-btn>
      </template>
    </modal>

    <!-- Delete Token Confirmation Modal -->
    <modal
      :show="apiTokenBeingDeleted"
      @close="apiTokenBeingDeleted = null"
    >
      <template #title>
        Delete API Token
      </template>

      <template #content>
        <p>
          Are you sure you would like to delete this API token?
        </p>
      </template>

      <template #footer>
        <v-spacer></v-spacer>

        <v-btn
          text
          @click.native="apiTokenBeingDeleted = null"
        >
          Nevermind
        </v-btn>

        <v-btn
          color="error"
          @click.native="deleteApiToken"
        >
          Delete
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
