$(document).ready(function () {
    // complete button function
    $('#toDoList').on('click', '.completeButton', function () {
        console.log('complete button was clicked');
        var idTask = $(this).parent();
        console.log(idTask);
        $(idTask).css('background-color', '#57db85');
    });

    // delete button function
    $('#toDoList').on('click', '.deleteButton', function () {
        console.log('delete button was clicked');

    });

    getTasks(); // adds array to from server.js to DOM on load

    // add new tasks button function
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
        success: function (data) {
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
        $('#toDoList').append('<div><li>' + tasks.item +
            '<button class="completeButton">Mark as Complete</button>' +
            '<button class="deleteButton">Delete Task</button>' +
            '</li></div>');
    }
}