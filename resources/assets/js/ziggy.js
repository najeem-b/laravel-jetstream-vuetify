const Ziggy = {
  namedRoutes: {
    login: {
      uri: 'login',
      methods: ['GET', 'HEAD'],
      domain: null
    },
    logout: {
      uri: 'logout',
      methods: ['POST'],
      domain: null
    },
    'password.request': {
      uri: 'forgot-password',
      methods: ['GET', 'HEAD'],
      domain: null
    },
    'password.reset': {
      uri: 'reset-password/{token}',
      methods: ['GET', 'HEAD'],
      domain: null
    },
    'password.email': {
      uri: 'forgot-password',
      methods: ['POST'],
      domain: null
    },
    'password.update': {
      uri: 'reset-password',
      methods: ['POST'],
      domain: null
    },
    register: {
      uri: 'register',
      methods: ['GET', 'HEAD'],
      domain: null
    },
    'verification.notice': {
      uri: 'email/verify',
      methods: ['GET', 'HEAD'],
      domain: null
    },
    'verification.verify': {
      uri: 'email/verify/{id}/{hash}',
      methods: ['GET', 'HEAD'],
      domain: null
    },
    'verification.send': {
      uri: 'email/verification-notification',
      methods: ['POST'],
      domain: null
    },
    'user-profile-information.update': {
      uri: 'user/profile-information',
      methods: ['PUT'],
      domain: null
    },
    'user-password.update': {
      uri: 'user/password',
      methods: ['PUT'],
      domain: null
    },
    'password.confirm': {
      uri: 'user/confirm-password',
      methods: ['GET', 'HEAD'],
      domain: null
    },
    'password.confirmation': {
      uri: 'user/confirmed-password-status',
      methods: ['GET', 'HEAD'],
      domain: null
    },
    'two-factor.login': {
      uri: 'two-factor-challenge',
      methods: ['GET', 'HEAD'],
      domain: null
    },
    'profile.show': {
      uri: 'user/profile',
      methods: ['GET', 'HEAD'],
      domain: null
    },
    'other-browser-sessions.destroy': {
      uri: 'user/other-browser-sessions',
      methods: ['DELETE'],
      domain: null
    },
    'current-user.destroy': {
      uri: 'user',
      methods: ['DELETE'],
      domain: null
    },
    'current-user-photo.destroy': {
      uri: 'user/profile-photo',
      methods: ['DELETE'],
      domain: null
    },
    'teams.create': {
      uri: 'teams/create',
      methods: ['GET', 'HEAD'],
      domain: null
    },
    'teams.store': {
      uri: 'teams',
      methods: ['POST'],
      domain: null
    },
    'teams.show': {
      uri: 'teams/{team}',
      methods: ['GET', 'HEAD'],
      domain: null
    },
    'teams.update': {
      uri: 'teams/{team}',
      methods: ['PUT'],
      domain: null
    },
    'teams.destroy': {
      uri: 'teams/{team}',
      methods: ['DELETE'],
      domain: null
    },
    'current-team.update': {
      uri: 'current-team',
      methods: ['PUT'],
      domain: null
    },
    'team-members.store': {
      uri: 'teams/{team}/members',
      methods: ['POST'],
      domain: null
    },
    'team-members.update': {
      uri: 'teams/{team}/members/{user}',
      methods: ['PUT'],
      domain: null
    },
    'team-members.destroy': {
      uri: 'teams/{team}/members/{user}',
      methods: ['DELETE'],
      domain: null
    },
    telescope: {
      uri: 'telescope/{view?}',
      methods: ['GET', 'HEAD'],
      domain: null
    },
    dashboard: {
      uri: 'dashboard',
      methods: ['GET', 'HEAD'],
      domain: null
    }
  },
  baseUrl: 'http://localhost:3000/',
  baseProtocol: 'http',
  baseDomain: 'localhost:3000',
  basePort: false,
  defaultParameters: []
}

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  for (const name in window.Ziggy.namedRoutes) {
    Ziggy.namedRoutes[name] = window.Ziggy.namedRoutes[name]
  }
}

export {
  Ziggy
}
