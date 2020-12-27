<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card>
        <!-- Title -->
        <v-card-title
          v-if="hasTitle"
          class="overline"
        >
          <slot name="title"></slot>
        </v-card-title>

        <!-- Subtitle -->
        <v-card-subtitle v-if="hasSubtitle">
          <slot name="subtitle"></slot>
        </v-card-subtitle>

        <v-form @submit.prevent="handleSubmit">
          <v-card-text class="py-0">
            <v-divider class="my-4"></v-divider>

            <slot></slot>
          </v-card-text>

          <!-- Message -->
          <v-card-text
            v-if="message.show"
            class="py-0"
          >
            <v-alert
              dense
              :type="message.type"
            >
              {{ message.text }}
            </v-alert>
          </v-card-text>

          <v-card-actions v-if="!!handleSubmit">
            <template v-if="hasFooter">
              <slot name="footer"></slot>
            </template>

            <v-btn
              block
              color="primary"
              type="submit"
              v-else
            >
              {{ submitBtnText }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    handleSubmit: {
      type: Function
    },
    message: {
      type: Object,
      required: true
    },
    submitBtnText: {
      type: String,
      default: 'Save'
    }
  },

  computed: {
    hasTitle () {
      return !!this.$slots.title
    },

    hasSubtitle () {
      return !!this.$slots.subtitle
    },

    hasFooter () {
      return !!this.$slots.footer
    }
  }
}
</script>
