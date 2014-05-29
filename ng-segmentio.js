angular.module('segmentio', ['ng'])
.factory('segmentio', ['$rootScope', '$document', '$window', '$location',
  function($rootScope, $document, $window, $location) {
    var service = {};

    $window.analytics = $window.analytics || [];

    // Define a factory that generates wrapper methods to push arrays of
    // arguments onto our `analytics` queue, where the first element of the arrays
    // is always the name of the analytics.js method itself (eg. `track`).
    var methodFactory = function(method) {
      return function() {
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
      'trackLink', 'trackForm', 'trackClick', 'trackSubmit'
    ];
    for (var i = 0; i < methods.length; i++) {
      service[methods[i]] = methodFactory(methods[i]);
    }

    /**
     * @description
     * Load Segment.io analytics script
     * @param apiKey The key API to use
     */
    service.load = function(key) {
      // Create an async script element based on your key.
      var script = $document[0].createElement('script');
      script.async = true;
      script.src = '//cdn.segment.io/analytics.js/v1/'
        + key + '/analytics.min.js';

      // Insert our script at the end of the body
      $document[0].getElementsByTagName('body')[0]
        .appendChild(script);
    };

    // Add a version to keep track of what's in the wild.
    $window.analytics.SNIPPET_VERSION = '2.0.9';

    // Listening to $viewContentLoaded event to track pageview
    $rootScope.$on('$viewContentLoaded', function() {
      if (service.location != $location.path()) {
        service.location = $location.path();
        service.page(service.location);
      }
    });

    return service;
  }
]);
