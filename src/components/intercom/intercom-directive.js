/* global ObjectId:false */

(function () {
  'use strict';

  angular.module('exceptionless.intercom')
    .directive('intercom', [function () {
      return {
        bindToController: true,
        restrict: 'E',
        replace: true,
        templateUrl: 'components/intercom/intercom-directive.tpl.html',
        controller: ['$interval', '$scope', 'authService', 'filterService', 'INTERCOM_APPID', 'intercomService', 'organizationService', 'projectService', 'userService', function ($interval, $scope, authService, filterService, INTERCOM_APPID, intercomService, organizationService, projectService, userService) {
          if (!authService.isAuthenticated()) {
            return;
          }

          var vm = this;

          function get() {
            return getUser().then(getOrganizations).then(getProjects);
          }

          function getCurrentOrganization() {
            function getOrganizationFromProjectFilter() {
              if (!vm.projects || !filterService.getProjectId()) {
                return null;
              }

              var project = vm.projects.filter(function(o) { return o.id === filterService.getProjectId(); })[0];
              if (project) {
                return vm.organizations.filter(function(o) { return o.id === project.organization_id; })[0];
              }

              return null;
            }

            if (!vm.organizations || vm.organizations.length === 0) {
              return null;
            }

            var currentOrganization;
            if (filterService.getOrganizationId()) {
              currentOrganization = vm.organizations.filter(function(o) { return o.id === filterService.getOrganizationId(); })[0];
            } else if (filterService.getProjectId()) {
              currentOrganization = getOrganizationFromProjectFilter();
            }

            return currentOrganization ? currentOrganization : vm.organizations[0];
          }

          function getIntercomData() {
            if (!vm.user) {
              return;
            }

            var data = {
              user_id: vm.user.id,
              user_hash: vm.user.hash,
              name: vm.user.full_name,
              email: vm.user.email_address,
              remote_created_at: new ObjectId(vm.user.id).timestamp
            };

            var currentOrganization = getCurrentOrganization();
            if (currentOrganization) {
              data.company = {
                company_id: currentOrganization.id,
                name: currentOrganization.name,
                remote_created_at: new ObjectId(currentOrganization.id).timestamp,
                plan: currentOrganization.plan_id,
                monthly_spend: currentOrganization.billing_price,
                total_errors: currentOrganization.total_event_count
              };

              if (currentOrganization.subscribe_date) {
                data.company.subscribe_at = moment(currentOrganization.subscribe_date).unix();
              }
            }

            return data;
          }

          function getOrganizations(canUpdate) {
            function onSuccess(response) {
              vm.organizations = response.data.plain();

              if (canUpdate === true) {
                updateIntercom();
              }

              return vm.organizations;
            }

            return organizationService.getAll().then(onSuccess);
          }

          function getProjects(canUpdate) {
            function onSuccess(response) {
              vm.projects = response.data.plain();

              if (canUpdate === true) {
                updateIntercom();
              }

              return vm.projects;
            }

            return projectService.getAll().then(onSuccess);
          }

          function getUser(canUpdate) {
            function onSuccess(response) {
              vm.user = response.data.plain();

              if (canUpdate === true) {
                updateIntercom();
              }

              return vm.user;
            }

            return userService.getCurrentUser().then(onSuccess);
          }

          function hide() {
            intercomService.hide();
          }

          function initializeIntercom() {
            return intercomService.boot(getIntercomData());
          }

          function shutdown() {
            return intercomService.shutdown();
          }

          function updateIntercom(hide) {
            if (hide === true) {
              hide();
            }

            return intercomService.update(getIntercomData());
          }

          var interval = $interval(updateIntercom, 90000);
          $scope.$on('$destroy', function () {
            $interval.cancel(intercomService);
          });

          vm.getOrganizations = getOrganizations;
          vm.getProjects = getProjects;
          vm.getUser = getUser;
          vm.hide = hide;
          vm.IntercomAppId = INTERCOM_APPID;
          vm.shutdown = shutdown;
          vm.updateIntercom = updateIntercom;

          get().then(initializeIntercom);
        }],
        controllerAs: 'vm'
      };
  }]);
}());
