const express = require('express');
const app = express();

//Public folder
app.use(express.static('public'));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var tasks = [];
var taskId = 0;

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks)
});

app.post('/tasks', (req, res) => {
    var task = req.body;
    task.id = taskId + 1;
    taskId++
    tasks.push(task);
    res.json(tasks);
});

app.post('/tasks/:id', (req, res) => {
    var id = parseInt(req.params.id);
    tasks = tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task);
    res.json(tasks);
});

app.listen(3001);