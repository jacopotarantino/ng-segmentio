# Tracking Events and Pageviews with Segment.io (http://segment.io)

## How-to use it?

Follow these steps:

1) Add the service to your angular js app module:

```javascript
var app = angular.module('myapp', ['segmentio']) {
    ...
});
```

2) In your application config block, use the `load` method to get your analytics script from segmentio.

```javascript
app.config(function($stateProvider) {
  $stateProvider.state('app', {
    resolve: {
      // Note that this should be in a resolve block as it return a promise
      analytics: segmentio.load('MY_API_KEY')
    }
  });
});
```

3) Now just have analytics to be injected in your controller.

```javascript
someAppSubmodule.controller(function ($rootScope, $scope, $http, analytics) {
    ...
});
```

4) Call any method documented here: https://segment.io/libraries/analytics.js

## How-to add it to your project?

Via Bower (http://bower.io/)
Run `bower install ng-segmentio` in a terminal

## How-to build / develop it?

1) Install dependencies via npm: `npm install` (in the project folder)

2) Run grunt: `grunt`

3) The build result is in the build directory

## Testing

Run tests with `grunt test`. The test files are in the `test/unit` directory.

## New in 2.0

* Added Standard for JS style linting.
* Switched to annotated angular dependencies.
* Fixed a dep issue with the minified version.
