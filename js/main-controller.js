(function(angular) {
  angular
    .module('scotch-todo')
    .controller('main', Doto);

  Doto.$inject = ['$scope', '$ionicModal', 'localStorageService','$ionicLoading'];

  function Doto ($scope, $ionicModal, localStorageService, $ionicLoading) { 
    var vm = this;

    //store the entities name in a variable 
    var taskData = 'task';

    //initialize the tasks scope with empty array
    vm.tasks = [];

    //initialize the task scope with empty object
    vm.task = {};

    //configure the ionic modal before use
    $ionicModal.fromTemplateUrl('new-task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        vm.newTaskModal = modal;
    });

    vm.load = function() {
      $ionicLoading.show({
        template: 'Loading...'
      }).then(function(){
         vm.getTasks();
      });
    };
    
    vm.loadFinished = function(){
      $ionicLoading.hide().then(function(){
         console.log("The loading indicator is now hidden");
      });
    };

    vm.openTaskModal = function() {
      vm.newTaskModal.show();
    };

    vm.closeTaskModal = function() {
      vm.newTaskModal.hide();
    };

    vm.getTasks = function () {
      //fetches task from local storage
      if (localStorageService.get(taskData)) {
          vm.tasks = localStorageService.get(taskData);
      } else {
          vm.tasks = [];
      }

      vm.loadFinished();
    };

    vm.createTask = function () {
      //creates a new task
      vm.tasks.push(vm.task);
      localStorageService.set(taskData, vm.tasks);
      vm.task = {};
      //close new task modal
      vm.newTaskModal.hide();
    };

    vm.removeTask = function (index) {
      //removes a task
      vm.tasks.splice(index, 1);
      localStorageService.set(taskData, vm.tasks);
    };

    vm.completeTask = function (index) {
      //updates a task as completed 
      localStorageService.set(taskData, vm.tasks); 
    };
  }

})(angular);