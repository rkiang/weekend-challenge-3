$(document).ready(function () {
    console.log('client.js is sourced in');
    getTasks();
    // complete button function
    $('#toDoList').on('click', '.completeButton', function () {
        console.log('complete button was clicked');
        var idTask = $(this).parent().parent().data().id;
        console.log('idTask is', idTask);
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
        var idTask = $(this).parent().parent().data().id;
        var itemTask = $(this).parent().parent().data().item;
        console.log('delete itemTask is:', itemTask);
        console.log('delete idTask is', idTask);
        if (confirm('Are you sure you want to delete task: ' + itemTask + '?')) {
            $.ajax({
                method: 'DELETE',
                url: '/tasks/' + idTask,
                success: function (response) {
                    console.log('DELETE is:', response);
                    getTasks();
                }
            })
        }
    });

    // add new tasks button function
    $('#addTasks').on('click', function () {
        console.log('add tasks button was clicked');
        var newTask = $('#newTasks').val();
        var taskArray = {
            task: newTask
        }
        $('#newTasks').val(''); // clears input field after clicked/submitted
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
        taskRow.data('item', tasks.item);
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