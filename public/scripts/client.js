$(document).ready(function(){
    $('#addTasks').on('click', function(){
        tasksToBody();
        console.log('add tasks button was clicked');
    })
})

// append new tasks function from button
function tasksToBody() {
    var newTasks = $('#newTasks').val();
    $('#toDoList').append('<div>' + newTasks + '</div>');
}