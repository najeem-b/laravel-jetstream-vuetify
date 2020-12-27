<template>
  <v-navigation-drawer app
    clipped
    floating
    right
    :value="drawer"
  >
    <template v-for="(group, index) in menuItems">
      <v-divider v-if="group.divider" :key="`${index}-divider`"></v-divider>
      <v-list
        nav
        :key="index"
      >
        <v-subheader v-if="group.title">
          {{ group.title }}
        </v-subheader>
        <template v-for="item in group.items">
          <v-list-item v-if="checkMenuItemCondition(item)" :key="item.text" :href="item.link">
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </template>

    <!-- Team Switcher -->
    <v-divider></v-divider>

    <v-list
      flat
      nav
    >
      <v-subheader>
        Switch Teams
      </v-subheader>
      <template>
        <v-list-item-group
          v-model="selectedTeam"
        >
          <v-list-item
            class="mb-0"
            v-for="team in $page.user.all_teams"
            :key="team.id"
            :value="team.id"
          >
            <template v-slot:default="{ active }">
              <v-list-item-icon>
                <v-icon
                  color="success"
                  v-if="team.id == $page.user.current_team_id"
                >
                  mdi-check-circle-outline
                </v-icon>
              </v-list-item-icon>

              <v-list-item-action class="d-none">
                <v-checkbox
                  color="primary"
                  :input-value="active"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  {{ team.name }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </template>
    </v-list>

    <!-- Authentication -->
    <template v-slot:append>
      <v-list
        nav
      >
        <v-list-item>
          <v-list-item-content>
            <form @submit.prevent="logout">
              <v-btn
                block
                color="secondary"
                type="submit"
              >
                Logout
              </v-btn>
            </form>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: Boolean
  },

  data () {
    return {
      menuItems: [
        {
          title: 'Manage Account',
          items: [
            {
              text: 'Profile',
              link: route('profile.show')
            },
            {
              condition: this.$page.jetstream.hasApiFeatures,
              text: 'API Tokens',
              link: this.$page.jetstream.hasApiFeatures ? route('api-tokens.index') : null
            }
          ]
        },
        {
          divider: true,
          title: 'Manage Team',
          items: [
            {
              text: 'Team Settings',
              link: route('teams.show', this.$page.user.current_team)
            },
            {
              condition: this.$page.jetstream.canCreateTeams,
              text: 'Create New Team',
              link: route('teams.create')
            }
          ]
        }
      ],
      selectedTeam: this.$page.user.current_team_id
    }
  },

  watch: {
    selectedTeam (val) {
      this.switchToTeam(val)
    }
  },

  methods: {
    /**
     * Checks if menu item has condition
     *
     * @param {object} item - Navigation item
     * @param {Boolean?} item.condition - Display condition
     * @returns {Boolean} Whether menu item should be shown or not
     */
    checkMenuItemCondition: item => {
      let visible = true

      if (Object.prototype.hasOwnProperty.call(item, 'condition')) {
        visible = item.condition
      }

      return visible
    },

    switchToTeam (teamId) {
      this.$inertia.put(route('current-team.update'), {
        team_id: teamId
      }, {
        preserveState: false
      })
    },

    logout () {
      axios.post(route('logout').url()).then(response => {
        window.location = '/'
      })
    }
  }
}
</script>
