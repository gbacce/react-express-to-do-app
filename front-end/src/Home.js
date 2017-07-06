import React, { Component } from 'react';
import $ from 'jquery';


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
              date: taskDateToAdd
            }
    }).done((taskArray)=>{
      this.setState({
        theList: taskArray
      })
    })
  }


  render() {

    var theTaskArray = [];

    this.state.theList.map((taskObject)=>{
      theTaskArray.push(<div key={taskObject.id}>{taskObject.task_name} {taskObject.task_date}</div>);
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