<template>
  <v-row>
    <v-col cols="12" v-if="hasTitle || hasSubtitle">
      <!-- Title -->
      <h1 class="text-h5 mb-4" v-if="hasTitle">
        <slot name="title"></slot>
      </h1>

      <!-- Subtitle -->
      <p class="text-subtitle-1 font-weight-light" v-if="hasSubtitle">
        <slot name="subtitle"></slot>
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    hasTitle: Boolean,
    hasSubtitle: Boolean
  }
}
</script>
