(function () {
  'use strict';

  angular.module('app.auth', [
    'directives.inputMatch',
    'ngMessages',
    'satellizer',
    'ui.router',

    'app.config',
    'exceptionless',
    'exceptionless.analytics',
    'exceptionless.auth',
    'exceptionless.autofocus',
    'exceptionless.notification',
    'exceptionless.project',
    'exceptionless.rate-limit',
    'exceptionless.user',
    'exceptionless.validators'
  ])
      .config(function ($authProvider, $stateProvider, BASE_URL, FACEBOOK_APPID, GOOGLE_APPID, GITHUB_APPID, LIVE_APPID, CUSTOM_APPID, CUSTOM_AUTH_ENDPOINT, CUSTOM_SCOPE_PREFIX, CUSTOM_SCOPE_DELIMITER, CUSTOM_REQUIRED_PARAMS, CUSTOM_OPTIONAL_PARAMS, CUSTOM_SCOPE) {
    $authProvider.baseUrl = BASE_URL + '/api/v2';
    $authProvider.facebook({
      clientId: FACEBOOK_APPID
    });

    $authProvider.google({
      clientId: GOOGLE_APPID
    });

    $authProvider.github({
      clientId: GITHUB_APPID
    });

    $authProvider.live({
      clientId: LIVE_APPID,
      scope: ['wl.emails']
    });

    var requiredUrlParams = CUSTOM_REQUIRED_PARAMS.split(',');
    var optionalUrlParams = CUSTOM_OPTIONAL_PARAMS.split(',');
    var scope = CUSTOM_SCOPE.split(',');

    $authProvider.oauth2({
        name: "oauth2",
        url: '/auth/custom',
        redirectUri: window.location.origin,
        oauthType: '2.0',
        popupOptions: { width: 500, height: 600 },
        state: function () { return encodeURIComponent(Math.random().toString(36).substr(2));},
        clientId: CUSTOM_APPID,
        authorizationEndpoint: CUSTOM_AUTH_ENDPOINT,
        requiredUrlParams: requiredUrlParams,
        optionalUrlParams: optionalUrlParams,
        scope: scope,
        scopePrefix: CUSTOM_SCOPE_PREFIX,
        scopeDelimiter: CUSTOM_SCOPE_DELIMITER
    });

    $stateProvider.state('auth', {
      abstract: true,
      template: '<ui-view autoscroll="true" />'
    });

    $stateProvider.state('auth.forgot-password', {
      title: 'Forgot Password',
      url: '/forgot-password',
      controller: 'auth.ForgotPassword',
      controllerAs: 'vm',
      templateUrl: 'app/auth/forgot-password.tpl.html'
    });

    $stateProvider.state('auth.login', {
      title: 'Login',
      url: '/login?token',
      controller: 'auth.Login',
      controllerAs: 'vm',
      templateUrl: 'app/auth/login.tpl.html'
    });

    $stateProvider.state('auth.logout', {
      title: 'Logout',
      url: '/logout',
      template: null,
      controller: 'auth.Logout'
    });

    $stateProvider.state('auth.reset-password', {
      title: 'Reset Password',
      url: '/reset-password/:token?cancel',
      controller: 'auth.ResetPassword',
      controllerAs: 'vm',
      templateUrl: 'app/auth/reset-password.tpl.html'
    });

    $stateProvider.state('auth.signup', {
      title: 'Signup',
      url: '/signup?token',
      controller: 'auth.Signup',
      controllerAs: 'vm',
      templateUrl: 'app/auth/signup.tpl.html'
    });
  });
}());
