<template>
  <app-layout>
    <template #title>
      Team Settings
    </template>

    <update-team-name-form :team="team" :permissions="permissions" />

    <add-a-team-member
      :team="team"
      :available-roles="availableRoles"
      :user-permissions="permissions"
    />

    <team-member-manager
      :team="team"
      :available-roles="availableRoles"
      :user-permissions="permissions"
    />

    <delete-team-form :team="team" />
  </app-layout>
</template>

<script>
import AddATeamMember from './AddATeamMember'
import AppLayout from '@/Layouts/AppLayout'
import DeleteTeamForm from './DeleteTeamForm'
import TeamMemberManager from './TeamMemberManager'
import UpdateTeamNameForm from './UpdateTeamNameForm'

export default {
  props: [
    'team',
    'availableRoles',
    'permissions'
  ],

  components: {
    AddATeamMember,
    AppLayout,
    DeleteTeamForm,
    TeamMemberManager,
    UpdateTeamNameForm
  }
}
</script>

    AddATeamMember
