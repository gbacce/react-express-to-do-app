import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theClass: []
    }
    this.addStudent =this.addStudent.bind(this);
  }


// ComponentDidMount runs after the first render.

  componentDidMount() {

    // Get JSON request to localhost:3000 ... this is where Express is listening.
    $.getJSON('http://localhost:3000/getStudents', (studentsFromAPI)=>{

    // Log the JSON response from Express
      console.log(studentsFromAPI)

    // Update the state. This will trigger a re-render.
      this.setState({
        theClass: studentsFromAPI
      })

    })
  }

  addStudent(event){
    // var studentToAdd = event.target.parentNode.childNodes[0].value;
    // var studentToAdd = $('#newStudent').value;
    var studentToAdd = document.getElementById('newStudent').value;
    // console.log(studentToAdd)

    ///// Once we have the studentToAdd, we want to send it to the database inside of SQL! /////

    // This is a post request, so we can't use $.getJSON (only does get)
    // $.ajax expects an oobejct that tells it what to send (data), where to send it (url), and how to send it (method)
    // $.ajax is a promise. It has a "done" method othat will run when ajax is back. It gets a param of whatever JSON was returned by the AJAX (aka API) request. Inside that function, we update React state (theClass), which triggers a re-render, which updates the list because we are mapping through state. 

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/addStudent",
      data: {name: studentToAdd}
    }).done((studentsArray)=>{
      this.setState({
        theClass: studentsArray
      })
    })

    // Adding the .done() function is not necessarily necessary. But it's a quick way to update the state.
  }


  render() {

    // Create an array to insert into return. It will contain components or HTML tags.
    var theClassArray = [];

    // Loop through state variable.
    this.state.theClass.map((student, index)=>{
      // Push an <li>tag onto array for each element in the state variable.
      theClassArray.push(<li key={index}>{student.name}</li>);
    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="add-box">
          <input type='text' id='newStudent' />
          <button onClick={this.addStudent}>Add Student</button>
        </div>
        <p>
          {theClassArray}
        </p>
      </div>
    );
  }
}

export default App;
