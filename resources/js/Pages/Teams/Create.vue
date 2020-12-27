<template>
  <app-layout>
    <template #title>
      Create Team
    </template>

    <create-team-form />
  </app-layout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout'
import CreateTeamForm from './CreateTeamForm'

export default {
  props: ['team'],

  components: {
    AppLayout,
    CreateTeamForm
  }
}
</script>
