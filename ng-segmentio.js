'use strict';

segmentio.$inject = ['$rootScope', '$window', '$location', '$log', '$q'];

function segmentio($rootScope, $window, $location, $q) {
  var service = {};

  $window.analytics = $window.analytics || [];

  // Define a factory that generates wrapper methods to push arrays of
  // arguments onto our `analytics` queue, where the first element of the arrays
  // is always the name of the analytics.js method itself (eg. `track`).
  var methodFactory = function (method) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(method);
      $window.analytics.push(args);
      return $window.analytics;
    };
  };

  // Loop through analytics.js' methods and generate a wrapper method for each.
  var methods = [
    'identify', 'group', 'track',
    'page', 'pageview', 'alias', 'ready', 'on', 'once', 'off',
    'trackLink', 'trackForm', 'trackClick', 'trackSubmit', 'reset'
  ];
  for (var i = 0; i < methods.length; i++) {
    service[methods[i]] = methodFactory(methods[i]);
  }

  /**
   * @description
   * Load Segment.io analytics script
   * @param key The key API to use
   */
  service.load = function (key) {
    var deferred = $q.defer();

    if (document.getElementById('analytics-js')) {
      deferred.resolve($window.analytics);

    } else {
      // Create an async script element based on your key.
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'analytics-js';
      script.async = true;
      script.src = ("https:" === $window.location.protocol ? "https://" : "http://") + 'cdn.segment.io/analytics.js/v1/' + key + '/analytics.min.js';
      script.onload = script.onreadystatechange = function () {
        deferred.resolve($window.analytics);
      };

      // Insert our script next to the first script element.
      var first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);
    }

    return deferred.promise;
  };

  // Add a version to keep track of what's in the wild.
  $window.analytics.SNIPPET_VERSION = '3.0.1';

  // Listening to $viewContentLoaded event to track pageview
  $rootScope.$watch(function () {
    return $location.path();
  }, function (value) {
    service.page(value);
  });

  return service;
}

angular.module('segmentio', ['ng'])
  .factory('segmentio', segmentio);
