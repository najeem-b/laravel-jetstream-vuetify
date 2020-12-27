<template>
  <form-card
    :handleSubmit="addTeamMember"
    :message="message"
    v-if="userPermissions.canAddTeamMembers"
    submitBtnText="Add"
  >
    <template #title>
      Add Team Member
    </template>

    <template #subtitle>
      Add a new team member to your team, allowing them to collaborate with you.
    </template>

    <p>
      Please provide the email address of the person you would like to add to this team. The email address must
      be associated with an existing account.
    </p>

    <!-- Email Field -->
    <v-text-field
      outlined
      label="Email"
      v-model="addTeamMemberForm.email"
      :error-messages="addTeamMemberForm.error('email')"
    ></v-text-field>

    <!-- Role -->
    <v-list
      flat
      two-line
      subheader
    >
      <v-subheader class="text-subtitle-1 font-weight-medium">
        Role
      </v-subheader>

      <v-list-item-group
        v-if="availableRoles.length"
        v-model="addTeamMemberForm.role"
      >
        <v-list-item
          v-for="role in availableRoles"
          :key="role.key"
          :value="role.key"
        >
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox
                color="primary"
                :input-value="active"
                :error="!!addTeamMemberForm.error('role')"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :class="{
                  'error--text': !!addTeamMemberForm.error('role')
                }"
              >
                {{ role.name }}
              </v-list-item-title>

              <!-- Role Description -->
              <v-list-item-subtitle
                :class="{
                  'error--text': !!addTeamMemberForm.error('role')
                }"
              >
                {{ role.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <p
      class="error--text text-caption"
      v-if="addTeamMemberForm.error('role')"
    >
      {{ addTeamMemberForm.error('role') }}
    </p>
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
    'team',
    'availableRoles',
    'userPermissions'
  ],

  data () {
    return {
      addTeamMemberForm: this.$inertia.form({
        email: '',
        role: null
      }, {
        bag: 'addTeamMember',
        resetOnSuccess: true
      }),

      updateRoleForm: this.$inertia.form({
        role: null
      }, {
        bag: 'updateRole',
        resetOnSuccess: false
      }),

      leaveTeamForm: this.$inertia.form({
        //
      }, {
        bag: 'leaveTeam'
      }),

      removeTeamMemberForm: this.$inertia.form({
        //
      }, {
        bag: 'removeTeamMember'
      }),

      currentlyManagingRole: false,
      managingRoleFor: null,
      confirmingLeavingTeam: false,
      teamMemberBeingRemoved: null
    }
  },

  computed: {
    message () {
      return {
        show: false,
        text: 'Added',
        type: 'success'
      }
    }
  },

  methods: {
    addTeamMember () {
      this.addTeamMemberForm.post(route('team-members.store', this.team), {
        preserveScroll: true
      })
    },

    manageRole (teamMember) {
      this.managingRoleFor = teamMember
      this.updateRoleForm.role = teamMember.membership.role
      this.currentlyManagingRole = true
    },

    updateRole () {
      this.updateRoleForm.put(route('team-members.update', [this.team, this.managingRoleFor]), {
        preserveScroll: true
      }).then(() => {
        this.currentlyManagingRole = false
      })
    },

    confirmLeavingTeam () {
      this.confirmingLeavingTeam = true
    },

    leaveTeam () {
      this.leaveTeamForm.delete(route('team-members.destroy', [this.team, this.$page.user]))
    },

    confirmTeamMemberRemoval (teamMember) {
      this.teamMemberBeingRemoved = teamMember
    },

    removeTeamMember () {
      this.removeTeamMemberForm.delete(route('team-members.destroy', [this.team, this.teamMemberBeingRemoved]), {
        preserveScroll: true,
        preserveState: true
      }).then(() => {
        this.teamMemberBeingRemoved = null
      })
    },

    displayableRole (role) {
      return this.availableRoles.find(r => r.key === role).name
    }
  },

  mounted () {
    console.log(this.team)
  }
}
</script>
