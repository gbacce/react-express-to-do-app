import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theList: []
    }
    this.addNewTask = this.addNewTask.bind(this);
  }

  componentDidMount() {
    $.getJSON('http://localhost:3000/getTasks', (tasksFromAPI)=>{
      this.setState({
        theList: tasksFromAPI
      })
    })
  }

  addNewTask(event){
    event.preventDefault();
    var taskToAdd = document.getElementById('newTask').value;
    var taskDateToAdd = document.getElementById('newTaskDate').value;
   
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/addTask",
      data: {
              task: taskToAdd,
              date: taskDateToAdd,
            }
    }).done((taskArray)=>{
      this.setState({
        theList: taskArray
      })
    })
  }


  render() {

    var theTaskArray = [];

    this.state.theList.map((taskObject, index)=>{
      theTaskArray.push(
        <div key={taskObject.id}>
          <p>{taskObject.task_name} scheduled on {taskObject.task_date}</p>
          <Link to={`/task/delete/${taskObject.id}`}>Delete</Link> |
          <Link to={`/task/edit/${taskObject.id}`}>Edit</Link>
        </div>);
    });

    return(
      <div className="App">
        <div className="App-header">
          <h2>Task List</h2>
        </div>
        <form onSubmit={this.addNewTask} className="add-box">
          Task: <input type="text" id="newTask" placeholder="New task..." />
          Date: <input type="date" id="newTaskDate" />
          <button type="submit" className="btn btn-primary" onClick={this.addTask}>Add Task</button>
        </form>
        <div>
          {theTaskArray}
        </div>
      </div>
    )
  }

};

export default Home;