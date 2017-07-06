import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Delete from './Delete'
import Edit from './Edit'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theList: []
    }
  }

  render() {

    return(
      <Router>
        <div className="to-do-app">
          <Route exact={true} path="/" component={Home} />
          <Route path="/task/delete/:taskId" component={Delete} />
          <Route path="/task/edit/:taskId" component={Edit} />
        </div>
      </Router>
    )
  }
}

export default ToDo;
