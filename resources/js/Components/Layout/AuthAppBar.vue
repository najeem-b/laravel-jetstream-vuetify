<template>
  <v-app-bar app
    clipped-right
    dark
    flat
    color="primary"
  >
    <v-container>
      <v-row align="center">
        <v-col>
          <v-toolbar-title>
            <a :href="route('dashboard')" class="white--text text-decoration-none font-weight-light">
              {{this.$page.appName}}
            </a>
          </v-toolbar-title>
        </v-col>

        <v-spacer />

        <v-col class="col-auto">
          <v-btn
            :icon="$page.jetstream.managesProfilePhotos"
            :text="!$page.jetstream.managesProfilePhotos"
            @click.stop="toggleNav"
          >
            <v-avatar
              v-if="$page.jetstream.managesProfilePhotos"
              :color="user.profile_photo_path ? false : 'secondary'"
            >
              <img
                v-if="user.profile_photo_path"
                :src="user.profile_photo_url"
                :alt="user.full_name"
              >
              <template v-else>
                {{ initials }}
              </template>
            </v-avatar>
            <template v-else>
              {{ user.full_name }}
              <v-icon>mdi-chevron-down</v-icon>
            </template>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    user: Object,
    drawer: Boolean,
    toggleNav: Function
  },

  computed: {
    initials: function () {
      return this.user.first_name[0] + this.user.last_name[0]
    }
  }
}
</script>
