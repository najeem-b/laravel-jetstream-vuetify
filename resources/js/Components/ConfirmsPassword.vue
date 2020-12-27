<template>
  <div style="width: 100%;">
    <v-btn
      block
      color="primary"
      @click="startConfirmingPassword"
    >
      <slot />
    </v-btn>

    <modal
      :show="confirmingPassword"
      @close="confirmingPassword = false"
    >
      <template #title>
        {{ title }}
      </template>

      <template #content>
        <p>
          {{ content }}
        </p>

        <!-- Password Field -->
        <v-text-field
          outlined
          ref="password"
          label="Password"
          v-model="form.password"
          autocomplete="current-password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="form.error"
          @click:append="showPassword = !showPassword"
          @keyup.enter.native="confirmPassword"
        ></v-text-field>
      </template>

      <template #footer>
        <v-spacer></v-spacer>

        <v-btn
          text
          @click.native="confirmingPassword = false"
        >
          Nevermind
        </v-btn>

        <v-btn
          color="primary"
          @click.native="confirmPassword"
          :disabled="form.processing"
        >
          {{ button }}
        </v-btn>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal'

export default {
  props: {
    title: {
      default: 'Confirm Password'
    },
    content: {
      default: 'For your security, please confirm your password to continue.'
    },
    button: {
      default: 'Confirm'
    }
  },

  components: {
    Modal
  },

  data () {
    return {
      confirmingPassword: false,

      form: this.$inertia.form({
        password: '',
        error: ''
      }, {
        bag: 'confirmPassword'
      }),

      showPassword: false
    }
  },

  methods: {
    startConfirmingPassword () {
      this.form.error = ''

      axios.get(route('password.confirmation').url()).then(response => {
        if (response.data.confirmed) {
          this.$emit('confirmed')
        } else {
          this.confirmingPassword = true
          this.form.password = ''

          setTimeout(() => {
            this.$refs.password.focus()
          }, 250)
        }
      })
    },

    confirmPassword () {
      this.form.processing = true

      axios.post(route('password.confirm').url(), {
        password: this.form.password
      }).then(response => {
        this.confirmingPassword = false
        this.form.password = ''
        this.form.error = ''
        this.form.processing = false

        this.$nextTick(() => this.$emit('confirmed'))
      }).catch(error => {
        this.form.processing = false
        this.form.error = error.response.data.errors.password[0]
      })
    }
  }
}
</script>
