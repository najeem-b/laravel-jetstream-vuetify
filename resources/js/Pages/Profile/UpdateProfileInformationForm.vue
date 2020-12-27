<template>
  <form-card
    :handleSubmit="updateProfileInformation"
    :message="message"
  >
    <template #title>
      Profile Information
    </template>

    <template #subtitle>
      Update your account's profile information and email address.
    </template>

    <!-- Profile Photo -->
    <template v-if="$page.jetstream.managesProfilePhotos">
      <!-- Profile Photo File Input -->
      <input type="file" class="d-none" ref="photo" @change="updatePhotoPreview">

      <!-- Current Profile Photo -->
      <div v-show="!photoPreview">
        <v-avatar size="84">
          <img :src="user.profile_photo_url" alt="Current Profile Photo">
        </v-avatar>
      </div>

      <!-- New Profile Photo Preview -->
      <div v-show="photoPreview">
        <v-avatar size="84">
          <img :src="photoPreview" alt="New Profile Photo">
        </v-avatar>
      </div>

      <v-btn
        class="mt-5"
        color="primary"
        @click.native.prevent="selectNewPhoto"
      >
        Select A New Photo
      </v-btn>

      <v-btn
        v-if="user.profile_photo_path"
        class="mt-2"
        color="warning"
        @click.native.prevent="deletePhoto"
      >
        Remove Photo
      </v-btn>
    </template>

    <!-- First Name -->
    <v-text-field
      outlined
      autocomplete="given-name"
      label="First Name"
      v-model="form.first_name"
      class="mt-8"
    ></v-text-field>

    <!-- Last Name -->
    <v-text-field
      outlined
      autocomplete="family-name"
      label="Last Name"
      v-model="form.last_name"
    ></v-text-field>

    <!-- Email -->
    <v-text-field
      outlined
      autocomplete="email"
      label="Email"
      v-model="form.email"
    ></v-text-field>
  </form-card>
</template>

<script>
import FormCard from '../../Components/FormCard'

export default {
  components: {
    FormCard
  },

  props: ['user'],

  data () {
    return {
      form: this.$inertia.form({
        _method: 'PUT',
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        photo: null
      }, {
        bag: 'updateProfileInformation',
        resetOnSuccess: false
      }),
      photoPreview: null
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
    updateProfileInformation () {
      if (this.$refs.photo) {
        this.form.photo = this.$refs.photo.files[0]
      }

      this.form.post(route('user-profile-information.update'), {
        preserveScroll: true
      })
    },

    selectNewPhoto () {
      this.$refs.photo.click()
    },

    updatePhotoPreview () {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.photoPreview = e.target.result
      }

      reader.readAsDataURL(this.$refs.photo.files[0])
    },

    deletePhoto () {
      this.$inertia.delete(route('current-user-photo.destroy'), {
        preserveScroll: true
      }).then(() => {
        this.photoPreview = null
      })
    }
  }
}
</script>
