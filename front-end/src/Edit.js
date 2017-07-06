import React, { Component } from 'react';
import $ from 'jquery';


class Edit extends Component {
  constructor(props) {
    super(props);

    this.updateTask = this.updateTask.bind(this)
    
    this.state = {
      taskData: {}
    }
  }


  componentDidMount() {
    var taskId = this.props.match.params.taskId;

    $.getJSON(`http://localhost:3000/getTask/${taskId}`, (taskData)=>{
      this.setState({
        taskData: taskData
      })
    })  
  }


  updateTask(event) {
    event.preventDefault();
    var taskToEdit = document.getElementById('updatedTask').value;
    var taskDateToEdit = document.getElementById('updatedTaskDate').value;
    var taskId = this.props.match.params.taskId;

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/editTask",
      data: {
              task: taskToEdit,
              date: taskDateToEdit,
              taskId: taskId
            }
    }).done((results)=>{
      this.props.history.push('/');
    })
  }

  render() {

    return(
      <form onSubmit={this.updateTask} className="edit-box">
        Task: <input type="text" id="updatedTask" placeholder="Update task..." />
        Date: <input type="date" id="updatedTaskDate" />
        <button type="submit" className="btn btn-primary" onClick={this.addTask}>Add Task</button>
      </form>
    )
  }


}


export default Edit;