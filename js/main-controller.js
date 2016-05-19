(function(angular) {
  angular
    .module('scotch-todo')
    .controller('main', Doto);

  Doto.$inject = ['$scope', '$ionicModal', 'localStorageService','$ionicLoading'];

  function Doto ($scope, $ionicModal, localStorageService, $ionicLoading) { 
    var vm = this;
    var taskData = 'task';

    vm.tasks = [];
    vm.task = {};

    vm.completeTask = completeTask;
    vm.closeTaskModal = closeTaskModal;
    vm.createTask = createTask;
    vm.getTasks = getTasks;
    vm.load = load;
    vm.loadFinished = loadFinished;
    vm.openTaskModal = openTaskModal;
    vm.removeTask = removeTask;
    
    //configure the ionic modal before use
    $ionicModal.fromTemplateUrl('new-task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        vm.newTaskModal = modal;
    });

    function completeTask(index) {
      //updates a task as completed 
      localStorageService.set(taskData, vm.tasks); 
    };

    function closeTaskModal() {
      vm.newTaskModal.hide();
    };

    function createTask() {
      vm.tasks.push(vm.task);
      localStorageService.set(taskData, vm.tasks);
      vm.task = {};
      vm.newTaskModal.hide();
    };

    function getTasks() {
      //fetches task from local storage
      if (localStorageService.get(taskData)) {
          vm.tasks = localStorageService.get(taskData);
      } else {
          vm.tasks = [];
      }

      vm.loadFinished();
    };

    function load() {
      $ionicLoading.show({
        template: 'Loading...'
      }).then(function(){
         vm.getTasks();
      });
    };
    
    function loadFinished(){
      $ionicLoading.hide().then(function(){
         console.log("The loading indicator is now hidden");
      });
    };

    function openTaskModal() {
      vm.newTaskModal.show();
    };

    function removeTask(index) {
      //removes a task
      vm.tasks.splice(index, 1);
      localStorageService.set(taskData, vm.tasks);
    };
  }

})(angular);