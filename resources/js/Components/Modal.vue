<template>
  <portal to="modal">
    <v-dialog
      :value="show"
      max-width="40%"
      transition="scroll-y-transition"
    >
      <v-card>
        <v-card-title v-if="hasTitle">
          <slot name="title"></slot>
        </v-card-title>

        <v-card-text v-if="hasContent">
          <slot name="content"></slot>
        </v-card-text>

        <v-card-actions v-if="hasFooter">
          <slot name="footer"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </portal>
</template>

<script>
export default {
  props: {
    show: {
      default: false
    },
    maxWidth: {
      default: '2xl'
    },
    closeable: {
      default: true
    }
  },

  computed: {
    hasTitle () {
      return !!this.$slots.title
    },

    hasContent () {
      return !!this.$slots.content
    },

    hasFooter () {
      return !!this.$slots.footer
    }
  },

  methods: {
    close () {
      if (this.closeable) {
        this.$emit('close')
      }
    }
  }
}
</script>
