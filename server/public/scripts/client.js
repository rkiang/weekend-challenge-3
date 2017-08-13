$(document).ready(function () {
    console.log('client.js is sourced in');
    getTasks();
    // complete button function
    $('#toDoList').on('click', '.completeButton', function () {
        console.log('complete button was clicked');
        // var taskId = tasks.id;
        var idTask = $(this).parent().parent().data().id;
        console.log('idTask is', idTask);
        // $(idTask).css('background-color', '#57db85');
        $.ajax({
            method: 'PUT',
            url: '/tasks/' + idTask,
            success: function (response) {
                console.log('PUT is:', response);
                getTasks();
            }
        })
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

// POST function
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
        var taskRow = $('<tr></tr>');
        $('#toDoList').append(taskRow);
        taskRow.data('id', tasks.id);
        var taskId = tasks.id;
        var taskItem = $('<td>' + '<li>' + tasks.item + '</li>' + '</td>');
        if (tasks.status == 'incomplete') {
            var taskStatus = $('<td>' + '<button class="completeButton">Mark as Complete</button>' +
                '<button class="deleteButton">Delete Task</button>' + '</td>')
        } else {
            var taskStatus = $('<td>' + '<button class="deleteButton">Delete Task</button>' + '</td>');
            $(taskItem).css('background-color', '#57db85');
        }
        $(taskRow).append(taskItem, taskStatus);
    }
}