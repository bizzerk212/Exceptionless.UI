(function () {
  'use strict';

  angular.module('app.config', [])
    .constant('BASE_URL', 'https://localhost:5001')
    .constant('EXCEPTIONLESS_API_KEY')
    .constant('EXCEPTIONLESS_SERVER_URL')
    .constant('FACEBOOK_APPID')
    .constant('GITHUB_APPID')
    .constant('GOOGLE_APPID')
    .constant('INTERCOM_APPID')
    .constant('LIVE_APPID')
    .constant('SLACK_APPID')
    .constant('CUSTOM_APPID')
    .constant('CUSTOM_NAME')
    .constant('CUSTOM_AUTH_ENDPOINT')
    .constant('CUSTOM_SCOPE')
    .constant('CUSTOM_SCOPE_PREFIX')
    .constant('CUSTOM_SCOPE_DELIMITER')
    .constant('CUSTOM_REQUIRED_PARAMS')
    .constant('CUSTOM_OPTIONAL_PARAMS')
    .constant('STRIPE_PUBLISHABLE_KEY')
    .constant('SYSTEM_NOTIFICATION_MESSAGE')
    .constant('USE_HTML5_MODE', false)
    .constant('USE_SSL', false)
    .constant('ENABLE_ACCOUNT_CREATION', true);
}());
