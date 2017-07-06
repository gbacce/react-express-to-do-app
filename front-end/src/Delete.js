import React, { Component } from 'react';
import $ from 'jquery';

class Delete extends Component {
  constructor(props) {
    super(props);

    this.confirmDelete = this.confirmDelete.bind(this)
    this.runForCover = this.runForCover.bind(this)

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


  confirmDelete(event){
    var taskId = this.props.match.params.taskId;

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/deleteTask",
      data: {
        taskId: taskId
      }
    }).done((results)=>{
      console.log(results)
      console.log("Item deleted!")
      this.props.history.push('/');
    })
  }


  runForCover(){
    console.log("Don't delete!")
  }
    

  render(){

    return(
       <div className="container">
        <h2>Are you sure you want to delete this task?</h2>
        <div>{this.state.taskData.task_name} scheduled on {this.state.taskData.task_date}</div>
        <button onClick={this.confirmDelete} className="btn btn-danger">Yes</button>
        <button onClick={this.runForCover} className="btn btn-primary">No</button>
       </div>
     )
  }
}

export default Delete;