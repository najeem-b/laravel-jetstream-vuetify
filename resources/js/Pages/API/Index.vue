<template>
  <app-layout>
    <template #title>
      API Tokens
    </template>

    <api-token-create
      :tokens="tokens"
      :available-permissions="availablePermissions"
      :default-permissions="defaultPermissions" />

    <api-token-manager
      :tokens="tokens"
      :available-permissions="availablePermissions"
      :default-permissions="defaultPermissions" />
  </app-layout>
</template>

<script>
import ApiTokenCreate from './ApiTokenCreate'
import ApiTokenManager from './ApiTokenManager'
import AppLayout from '@/Layouts/AppLayout'

export default {
  props: [
    'tokens',
    'availablePermissions',
    'defaultPermissions'
  ],

  components: {
    ApiTokenCreate,
    ApiTokenManager,
    AppLayout
  }
}
</script>
