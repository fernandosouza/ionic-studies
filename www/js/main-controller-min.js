!function(n){function o(n,o,a,s){var t=n,e="task";t.tasks=[],t.task={},o.fromTemplateUrl("new-task-modal.html",{scope:t,animation:"slide-in-up"}).then(function(n){t.newTaskModal=n}),t.load=function(){s.show({template:"Loading..."}).then(function(){t.getTasks()})},t.loadFinished=function(){s.hide().then(function(){console.log("The loading indicator is now hidden")})},t.openTaskModal=function(){t.newTaskModal.show()},t.closeTaskModal=function(){t.newTaskModal.hide()},t.getTasks=function(){a.get(e)?t.tasks=a.get(e):t.tasks=[],t.loadFinished()},t.createTask=function(){t.tasks.push(t.task),a.set(e,t.tasks),t.task={},t.newTaskModal.hide()},t.removeTask=function(n){t.tasks.splice(n,1),a.set(e,t.tasks)},t.completeTask=function(n){a.set(e,t.tasks)}}n.module("scotch-todo").controller("main",["$scope","$ionicModal","localStorageService","$ionicLoading",o])}(angular);