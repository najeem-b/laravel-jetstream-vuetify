<template>
  <app-layout>
    <template #title>
      Welcome to your Jetstream application!
    </template>

    <template #subtitle>
      Laravel Jetstream provides a beautiful, robust starting point for your next Laravel application. Laravel is designed
      to help you build your application using a development environment that is simple, powerful, and enjoyable. We believe
      you should love expressing your creativity through programming, so we have spent time carefully crafting the Laravel
      ecosystem to be a breath of fresh air. We hope you love it.
    </template>

    <v-row class="px-6">
      <v-col
        cols="12"
        md="6"
      >
        <v-btn
          text
          href="https://laravel.com/docs"
          target="_blank"
        >
          <v-icon
            left
            class="mr-2"
          >
            mdi-book-open-variant
          </v-icon>

          Documentation
        </v-btn>

        <p>
          Laravel has wonderful, thorough documentation covering every aspect of the framework. Whether you are new to the framework or have previous experience with Laravel, we recommend reading all of the documentation from beginning to end.
        </p>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-btn
          text
          href="https://laracasts.com"
          target="_blank"
        >
          <v-icon
            left
            class="mr-2"
          >
            mdi-camera
          </v-icon>

          Laracasts
        </v-btn>

        <p>
            Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development. Check them out, see for yourself, and massively level up your development skills in the process.
        </p>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-btn
          text
          href="https://laravel-news.com/"
          target="_blank"
        >
          <v-icon
            left
            class="mr-2"
          >
            mdi-android-messages
          </v-icon>

          Laravel News
        </v-btn>

        <p>
          Laravel News is a community driven portal and newsletter aggregating all of the latest and most important news in the Laravel ecosystem, including new package releases and tutorials.
        </p>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-btn
          text
        >
          <v-icon
            left
            class="mr-2"
          >
            mdi-earth
          </v-icon>

          Vibrant Ecosystem
        </v-btn>

        <p>
          Laravel's robust library of first-party tools and libraries, such as
          <a href="https://forge.laravel.com" class="underline">Forge</a>,
          <a href="https://vapor.laravel.com" class="underline">Vapor</a>,
          <a href="https://nova.laravel.com" class="underline">Nova</a>, and
          <a href="https://envoyer.io" class="underline">Envoyer</a> help you take your projects to the next level. Pair them with powerful open source libraries like
          <a href="https://laravel.com/docs/billing" class="underline">Cashier</a>,
          <a href="https://laravel.com/docs/dusk" class="underline">Dusk</a>,
          <a href="https://laravel.com/docs/broadcasting" class="underline">Echo</a>,
          <a href="https://laravel.com/docs/horizon" class="underline">Horizon</a>,
          <a href="https://laravel.com/docs/sanctum" class="underline">Sanctum</a>,
          <a href="https://laravel.com/docs/telescope" class="underline">Telescope</a>, and more.
        </p>
      </v-col>

      <v-col>
        <v-btn
          text
          href="https://laravel.bigcartel.com"
          target="_blank"
        >
          <v-icon
            left
            class="mr-2"
          >
            mdi-cart
          </v-icon>
          Shop
        </v-btn>

        <v-btn
          text
          href="https://github.com/sponsors/taylorotwell"
          target="_blank"
        >
          <v-icon
            left
            class="mr-2"
          >
            mdi-heart-outline
          </v-icon>
          Sponsor
        </v-btn>
      </v-col>
    </v-row>
  </app-layout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout'

export default {
  components: {
    AppLayout
  }
}
</script>
