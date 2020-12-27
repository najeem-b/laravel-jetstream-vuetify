<template>
  <v-app-bar app
      dark
      flat
      color="primary"
    >
    <v-container>
      <v-row align="center">
        <v-col>
          <v-toolbar-title>
            <a href="/" class="white--text text-decoration-none font-weight-light">
              {{ this.$page.appName }}
            </a>
          </v-toolbar-title>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="col-auto">
          <v-btn
            text
            :href="route('register')"
          >
            Register
          </v-btn>
          <v-btn
            text
            :href="route('login')"
          >
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
