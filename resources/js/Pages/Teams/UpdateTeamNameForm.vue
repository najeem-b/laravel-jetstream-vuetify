<template>
  <form-card
    :handleSubmit="updateTeamName"
    :message="message"
  >
  <template #title>
    Team Names
  </template>

  <p>
    The team's name and owner information.
  </p>

  <!-- Team Owner Information -->
  <v-list>
    <v-list-item>
      <v-list-item-avatar size="58">
        <img
          :src="team.owner.profile_photo_url"
          :alt="team.owner.name"
        >
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          Team Owner
        </v-list-item-title>
        <v-list-item-subtitle>
          <div>{{ `${team.owner.first_name} ${team.owner.last_name}` }}</div>
          <div class="text-caption">{{ team.owner.email }}</div>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>

  <!-- Team Name Field -->
  <v-text-field
    outlined
    label="Team Name"
    v-model="form.name"
    :error-messages="form.error('name')"
  ></v-text-field>
  </form-card>
</template>

<script>
import FormCard from '@/Components/FormCard'

export default {
  components: {
    FormCard
  },

  props: ['team', 'permissions'],

  data () {
    return {
      form: this.$inertia.form({
        name: this.team.name
      }, {
        bag: 'updateTeamName',
        resetOnSuccess: false
      })
    }
  },

  computed: {
    message () {
      return {
        show: this.form.recentlySuccessful,
        text: 'Saved',
        type: 'success'
      }
    }
  },

  methods: {
    updateTeamName () {
      this.form.put(route('teams.update', this.team), {
        preserveScroll: true
      })
    }
  }
}
</script>
