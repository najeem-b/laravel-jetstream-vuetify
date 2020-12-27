<template>
  <form-card
    :handleSubmit="createTeam"
    :message="message"
  >
    <template #title>
      Team Details
    </template>

    <template #subtitle>
      Create a new team to collaborate with others on projects.
    </template>

    <p class="text-subtitle-1">
      Team Owner
    </p>

    <v-list>
      <v-list-item>
        <v-list-item-avatar size="58">
          <img
            :src="$page.user.profile_photo_url"
            :alt="$page.user.name"
          >
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ $page.user.full_name }}
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ $page.user.email }}
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

  data () {
    return {
      form: this.$inertia.form({
        name: ''
      }, {
        bag: 'createTeam',
        resetOnSuccess: false
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
    createTeam () {
      this.form.post(route('teams.store'), {
        preserveScroll: true
      })
    }
  }
}
</script>
