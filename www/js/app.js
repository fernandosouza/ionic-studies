// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular
  .module('scotch-todo', ['ionic', 'LocalStorageModule']);

angular
  .module('scotch-todo')
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('scotch-todo');
  }
);

angular
  .module('scotch-todo')
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }
);

(function(angular) {
    angular
      .module('scotch-todo')
      .controller(
        'main', 
        [
          '$scope',
          '$ionicModal',
          'localStorageService',
          '$ionicLoading',
          controller
        ]
    );

    function controller ($scope, $ionicModal, localStorageService, $ionicLoading) { 
      var instance = $scope;

      //store the entities name in a variable 
      var taskData = 'task';

      //initialize the tasks scope with empty array
      instance.tasks = [];

      //initialize the task scope with empty object
      instance.task = {};

      //configure the ionic modal before use
      $ionicModal.fromTemplateUrl('new-task-modal.html', {
          scope: instance,
          animation: 'slide-in-up'
      }).then(function (modal) {
          instance.newTaskModal = modal;
      });

      instance.load = function() {
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
           instance.getTasks();
        });
      };
      
      instance.loadFinished = function(){
        $ionicLoading.hide().then(function(){
           console.log("The loading indicator is now hidden");
        });
      };

      instance.openTaskModal = function() {
        instance.newTaskModal.show();
      };

      instance.closeTaskModal = function() {
        instance.newTaskModal.hide();
      };

      instance.getTasks = function () {
        //fetches task from local storage
        if (localStorageService.get(taskData)) {
            instance.tasks = localStorageService.get(taskData);
        } else {
            instance.tasks = [];
        }

        instance.loadFinished();
      };

      instance.createTask = function () {
        //creates a new task
        instance.tasks.push(instance.task);
        localStorageService.set(taskData, instance.tasks);
        instance.task = {};
        //close new task modal
        instance.newTaskModal.hide();
      };

      instance.removeTask = function (index) {
        //removes a task
        instance.tasks.splice(index, 1);
        localStorageService.set(taskData, instance.tasks);
      };

      instance.completeTask = function (index) {
        //updates a task as completed 
        localStorageService.set(taskData, instance.tasks); 
      };
    }

})(angular);