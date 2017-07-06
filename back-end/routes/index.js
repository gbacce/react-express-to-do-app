////////////////////////////////////////////////////////////
////////////////////// EXPRESS SERVER //////////////////////
////////////////////////////////////////////////////////////

var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'x',
  password: 'x',
  database: 'todo-react-express'
})

connection.connect();

// Set up a route to handle React's first request
//    $.getJSON('http://localhost:3000/getStudents', (studentsFromAPI)=>{})

router.get('/getStudents', function(req, res, next) {
  connection.query('SELECT * FROM students', (error, results)=>{
    if (error) throw error;
    res.json(results);
  })
  
  // res.json({
  //   students: [
  //     'Marissa',
  //     'Merilee',
  //     'Chris',
  //     'Stephen',
  //     'Chad',
  //     'Shane'
  //   ]
  // })

});


router.get('/getTasks', function(req, res, next) {
  connection.query('SELECT * FROM tasks', (error, results)=>{
    if (error) throw error;
    res.json(results);
  })
});


router.get('/getTask/:id', (req,res)=>{
  connection.query(`SELECT * FROM tasks WHERE id=${req.params.id}`, (error, results)=>{
    if(results.length == 0) {
      res.json({msg:"No result"})
    } else {
    res.json(results[0])
    }
  })
})



// The addStudent route:
     // Expects a name in the body. 
     // It will add that name to the students table inside the to do database in SQL.
     // Then, it will respond with all stdents in that table.

//The first query inserts the student name into the database.
//The second query returns the updated full list of students from the database.

router.post('/addStudent', (req, res)=>{
  var studentToAdd = req.body.name;
  connection.query('INSERT INTO students (name) VALUES (?)', [studentToAdd], (error, results)=>{
    if (error) throw error;
    connection.query('SELECT * FROM students', (error2, results2)=>{
     if (error2) throw error2;
     res.json(results2)
   })
  })
  // res.json(msg:"test");
});


router.post('/addTask', (req, res)=>{
  var taskToAdd = req.body.task;
  var taskDateToAdd = req.body.date;
  connection.query('INSERT INTO tasks (task_name, task_date) VALUES (?, ?)', [taskToAdd, taskDateToAdd], (error, results)=>{
    if (error) throw error;
    connection.query('SELECT * FROM tasks', (error2, results2)=>{
     if (error2) throw error2;
     res.json(results2)
   })
  })
});


router.post('/deleteTask', (req,res)=>{
  connection.query(`DELETE FROM tasks WHERE id=${req.body.taskId}`, (error, results)=>{
    if(error) throw error;
    res.json({
      msg: "success"
    })
  })
})


router.post('/editTask', (req,res)=>{
  var editedTask = req.body.task
  var editedTaskDate = req.body.date
  var taskId = req.body.taskId
  connection.query(`UPDATE tasks SET task_name="${req.body.task}", task_date="${req.body.date}" WHERE id=${req.body.taskId}`, (error, results)=>{
    if(error) throw error;
    res.json({
      msg: "success"
    })
  })
})



module.exports = router;