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