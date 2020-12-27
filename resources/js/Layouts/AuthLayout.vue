<template>
  <v-app>
    <!-- Navigation -->
    <app-bar />

    <!-- Main Content -->
    <v-main class="grey lighten-4">
      <v-container class="py-10">
        <!-- Messages -->
        <v-col
          v-if="hasMessage"
          cols="12"
        >
          <v-alert
            dismissible
            type="success"
            elevation="3"
          >
            <slot name="message"></slot>
          </v-alert>
        </v-col>

        <!-- Headings -->
        <template v-if="hasTitle || hasSubtitle">
          <headings :hasTitle="hasTitle" :hasSubtitle="hasSubtitle">
            <template v-if="hasTitle" #title>
              <slot name="title"></slot>
            </template>

            <template v-if="hasSubtitle" #subtitle>
              <slot name="subtitle"></slot>
            </template>
          </headings>
        </template>

        <!-- Form -->
        <v-col
          v-if="hasForm"
          cols="6"
        >
          <v-card>
            <v-form
              lazy-validation
              ref="form"
              v-model="valid"
              @submit.prevent="formSubmit"
            >
              <v-card-text>
                <slot name="form"></slot>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  type="submit"
                  color="primary"
                >
                  {{ submitBtnText }}
                </v-btn>
                <slot name="actions"></slot>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>

        <!-- Body Content -->
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/Components/Layout/UnAuthAppBar'
import Headings from '@/Components/Headings'

export default {
  props: {
    handleSubmit: Function,
    submitBtnText: String
  },

  components: {
    AppBar,
    Headings
  },

  data () {
    return {
      valid: true
    }
  },

  computed: {
    hasForm: function () {
      return !!this.$slots.form
    },
    hasMessage: function () {
      return !!this.$slots.message
    },
    hasTitle: function () {
      return !!this.$slots.title
    },
    hasSubtitle: function () {
      return !!this.$slots.subtitle
    }
  },

  methods: {
    formSubmit: function () {
      const valid = this.$refs.form.validate()

      if (valid) {
        this.handleSubmit()
      }
    }
  }
}
</script>
