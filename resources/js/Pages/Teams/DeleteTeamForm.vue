<template>
  <form-card
    submitBtnText="Delete Team"
    :handleSubmit="confirmTeamDeletion"
    :message="message"
  >
    <template #title>
      Delete Team
    </template>

    <template #subtitle>
      Permanently delete this team.
    </template>

    <p>
      Once a team is deleted, all of its resources and data will be permanently deleted. Before deleting this team,
      please download any data or information regarding this team that you wish to retain.
    </p>

    <!-- Delete Team Confirmation Modal -->
    <modal
      :show="confirmingTeamDeletion"
      @close="confirmingTeamDeletion = false"
    >
      <template #title>
        Delete Team
      </template>

      <template #content>
        Are you sure you want to delete this team? Once a team is deleted, all of its resources and data will be
        permanently deleted.
      </template>

      <template #footer>
        <v-spacer></v-spacer>

        <v-btn
          text
          @click.native="confirmingTeamDeletion = false"
        >
          Nevermind
        </v-btn>

        <v-btn
          color="error"
          @click.native="deleteTeam"
        >
          Delete Team
        </v-btn>
      </template>
    </modal>
  </form-card>
</template>

<script>
import FormCard from '@/Components/FormCard'
import Modal from '@/Components/Modal'

export default {
  props: ['team'],

  components: {
    FormCard,
    Modal
  },

  data () {
    return {
      confirmingTeamDeletion: false,
      deleting: false,

      form: this.$inertia.form({
        //
      }, {
        bag: 'deleteTeam'
      })
    }
  },

  computed: {
    message () {
      return {
        show: false,
        text: 'Saved',
        type: 'success'
      }
    }
  },

  methods: {
    confirmTeamDeletion () {
      this.confirmingTeamDeletion = true
    },

    deleteTeam () {
      this.form.delete(route('teams.destroy', this.team), {
        preserveScroll: true
      })
    }
  }
}
</script>
