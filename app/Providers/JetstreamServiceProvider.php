<?php

namespace App\Providers;

use App\Actions\Jetstream\AddTeamMember;
use App\Actions\Jetstream\CreateTeam;
use App\Actions\Jetstream\DeleteTeam;
use App\Actions\Jetstream\DeleteUser;
use App\Actions\Jetstream\UpdateTeamName;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Jetstream\Jetstream;
use Laravel\Fortify\Fortify;

class JetstreamServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Attach global variables to page
     *
     * @return void
     */
    private function globalVariables() {
      Inertia::share('appName', config('app.name'));
    }


    /**
     * Overwrite Fortify page routes
     *
     * @return void
     */
    private function pageRouteOverwrites() {
      Fortify::loginView(function () {
        return Inertia::render('Auth/Login');
      });

      Fortify::registerView(function () {
        return Inertia::render('Auth/Register');
      });

      Fortify::requestPasswordResetLinkView(function () {
        return Inertia::render('Auth/ForgotPassword');
      });

      Fortify::verifyEmailView(function () {
        return Inertia::render('Auth/VerifyEmail');
      });

      Fortify::twoFactorChallengeView(function () {
        return Inertia::render('Auth/TwoFactorChallenge');
      });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->configurePermissions();

        Jetstream::createTeamsUsing(CreateTeam::class);
        Jetstream::updateTeamNamesUsing(UpdateTeamName::class);
        Jetstream::addTeamMembersUsing(AddTeamMember::class);
        Jetstream::deleteTeamsUsing(DeleteTeam::class);
        Jetstream::deleteUsersUsing(DeleteUser::class);

        $this->pageRouteOverwrites();
        $this->globalVariables();
    }

    /**
     * Configure the roles and permissions that are available within the application.
     *
     * @return void
     */
    protected function configurePermissions()
    {
        Jetstream::defaultApiTokenPermissions(['read']);

        Jetstream::role('admin', __('Administrator'), [
            'create',
            'read',
            'update',
            'delete',
        ])->description(__('Administrator users can perform any action.'));

        Jetstream::role('editor', __('Editor'), [
            'read',
            'create',
            'update',
        ])->description(__('Editor users have the ability to read, create, and update.'));
    }
}
