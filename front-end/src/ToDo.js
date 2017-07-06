import React, { Component } from 'react';
import logo from './logo.svg'
import './App.css';
import $ from 'jquery';
import Home from './Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theList: []
    }
    this.addTask = this.addTask.bind(this);
  }


// ComponentDidMount runs after the first render.

  componentDidMount() {

    // Get JSON request to localhost:3000 ... this is where Express is listening.
    $.getJSON('http://localhost:3000/getTasks', (tasksFromAPI)=>{

    // Log the JSON response from Express
      console.log(tasksFromAPI)

    // Update the state. This will trigger a re-render.
      this.setState({
        theList: tasksFromAPI
      })

    })
  }

  addTask(event){
    // var studentToAdd = event.target.parentNode.childNodes[0].value;
    // var studentToAdd = $('#newStudent').value;
    var taskToAdd = document.getElementById('newTask').value;
    var taskDateToAdd = document.getElementById('newTaskDate').value;
    // console.log(studentToAdd)

    ///// Once we have the studentToAdd, we want to send it to the database inside of SQL! /////

    // This is a post request, so we can't use $.getJSON (only does get)
    // $.ajax expects an oobejct that tells it what to send (data), where to send it (url), and how to send it (method)
    // $.ajax is a promise. It has a "done" method othat will run when ajax is back. It gets a param of whatever JSON was returned by the AJAX (aka API) request. Inside that function, we update React state (theClass), which triggers a re-render, which updates the list because we are mapping through state. 

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

    // Adding the .done() function is not necessarily necessary. But it's a quick way to update the state.
  }


  render() {

    return(
      <Router>
        <Route exact={true} path="/" component={Home} />
      </Router>
    )
  }
}

export default ToDo;
