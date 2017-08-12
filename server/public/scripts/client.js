$(document).ready(function () {
    getTasks(); // adds array to from server.js to DOM on load
    $('#addTasks').on('click', function () {
        console.log('add tasks button was clicked');
        var newTask = $('#newTasks').val();
        var taskArray = {
            task: newTask
        }
        postTasks(taskArray);
    })
}) // end of DOM function

// ajax GET to server.js
function getTasks() {
    console.log('getTasks in client.js');
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: function (response) {
            console.log('getTasks is:', response);
            tasksToBody(response);
        }
    });
}

function postTasks(newTaskAdded) {
    console.log('postTasks in client.js');
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTaskAdded,
        success: function(data) {
            console.log('postTasks is:', data);
            getTasks();
        }
    })    
}

// append new tasks function from button
function tasksToBody(array) {
    $('#toDoList').empty();
    for (var i = 0; i < array.length; i++) {
        var tasks = array[i];
        // var tasksDiv = $('<li></li>');
        // tasksDiv.data('id', tasks.user_id);
        // $('#incompleteTasks').append(tasksDiv);
        $('#toDoList').append('<li>' + tasks.item + '</li>');
    }
}