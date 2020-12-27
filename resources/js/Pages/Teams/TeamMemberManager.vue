<template>
  <form-card
    :message="message"
    v-if="team.users.length > 0"
  >
    <template #title>
      Manage Team Members
    </template>

    <!-- Team Member List -->
    <template>
      <v-list>
        <v-list-item v-for="user in team.users" :key="user.id">
          <v-list-item-avatar size="52">
            <img :src="user.profile_photo_url" :alt="user.name">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ user.full_name }}
            </v-list-item-title>

            <v-list-item-subtitle v-if="!(userPermissions.canAddTeamMembers && availableRoles.length) && availableRoles.length">
                {{ displayableRole(user.membership.role) }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              rounded
              small
              text
              v-if="userPermissions.canAddTeamMembers && availableRoles.length" @click="manageRole(user)"
            >
              {{ displayableRole(user.membership.role) }}
            </v-btn>
          </v-list-item-action>

          <v-list-item-action v-if="$page.user.id === user.id">
            <!-- Leave Team -->
            <v-btn
              color="secondary"
              @click="confirmLeavingTeam"
            >
              Leave
            </v-btn>
          </v-list-item-action>

          <v-list-item-action v-if="userPermissions.canRemoveTeamMembers">
            <!-- Remove Team Member -->
            <v-btn
              rounded
              small
              color="warning"
              @click="confirmTeamMemberRemoval(user)"
            >
              Remove
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </template>

    <!-- Role Management Modal -->
    <modal
      :show="currentlyManagingRole"
      @close="currentlyManagingRole = false"
    >
      <template #title>
        Manage Role
      </template>

      <template #content>
        <template v-if="managingRoleFor">
          <!-- Role -->
          <v-list
            flat
            two-line
            subheader
          >
            <v-list-item-group
              v-if="availableRoles.length"
              v-model="updateRoleForm.role"
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
        </template>
      </template>

      <template #footer>
        <v-spacer></v-spacer>

        <v-btn
          text
          @click.native="currentlyManagingRole = false"
        >
          Nevermind
        </v-btn>

        <v-btn
          color="primary"
          @click.native="updateRole"
        >
          Save
        </v-btn>
      </template>
    </modal>

    <!-- Remove Team Member Confirmation Modal -->
    <modal
      :show="teamMemberBeingRemoved"
      @close="teamMemberBeingRemoved = null"
    >
      <template #title>
        Remove Team Member
      </template>

      <template #content>
        Are you sure you would like to remove this person from the team?
      </template>

      <template #footer>
        <v-spacer></v-spacer>

        <v-btn
          text
          @click.native="teamMemberBeingRemoved = null"
        >
          Nevermind
        </v-btn>

        <v-btn
          color="error"
          @click.native="removeTeamMember"
        >
          Remove
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
