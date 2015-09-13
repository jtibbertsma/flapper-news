var app = angular.module('flapperNews', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "templates/home.html",
        controller: "MainCtrl"
      })
      .state('posts', {
        url: "/posts/{id}",
        templateUrl: "templates/posts.html",
        controller: "PostsCtrl"
      });

    $urlRouterProvider.otherwise("home");
  }
]);

app.factory('posts', [function () {
  return {
    posts: [
      { title: "post 1", upvotes: 0, comments: [] }
    ]
  }
}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts',
  function ($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function () {
      if ($scope.body === "") {
        return;
      }

      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    };

    $scope.incrementUpvotes = function (comment) {
      comment.upvotes += 1;
    }
  }]
);

app.controller('MainCtrl', ['$scope', 'posts',
  function ($scope, posts) {
    $scope.posts = posts.posts;

    $scope.addPost = function () {
      if (!$scope.title || $scope.title === '') {
        return;
      }

      $scope.posts.push({ title: $scope.title, upvotes: 0, link: $scope.link,
        comments: [
          { author: 'Joe', body: 'Cool post!', upvotes: 0 },
          { author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0 }
        ]
      });

      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function (post) {
      post.upvotes += 1;
    }
  }]
);