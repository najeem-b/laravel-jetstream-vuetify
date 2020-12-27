<template>
  <app-layout>
    <template #title>
      Profile
    </template>

    <template v-if="$page.jetstream.canUpdateProfileInformation">
      <update-profile-information-form :user="$page.user" />
    </template>

    <template v-if="$page.jetstream.canUpdatePassword">
      <update-password-form />
    </template>

    <template v-if="$page.jetstream.canManageTwoFactorAuthentication">
      <two-factor-authentication-form />
    </template>

    <logout-other-browser-sessions-form :sessions="sessions" />

    <delete-user-form />
  </app-layout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout'
import DeleteUserForm from './DeleteUserForm'
import LogoutOtherBrowserSessionsForm from './LogoutOtherBrowserSessionsForm'
import TwoFactorAuthenticationForm from './TwoFactorAuthenticationForm'
import UpdatePasswordForm from './UpdatePasswordForm'
import UpdateProfileInformationForm from './UpdateProfileInformationForm'

export default {
  props: ['sessions'],

  components: {
    AppLayout,
    DeleteUserForm,
    LogoutOtherBrowserSessionsForm,
    TwoFactorAuthenticationForm,
    UpdatePasswordForm,
    UpdateProfileInformationForm
  }
}
</script>
