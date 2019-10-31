import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTasks, toggleTask } from '../actions/taskActions';

function Tasks({ tasks, fetchTasks, toggleTask }) {
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleClick = (e) => {
    toggleTask(e.target.id)
  };

  const taskItems = tasks.map(task => (
    <li id={task.id} key={task.id} onClick={handleClick} className={task.done ? "done" : "undone"}>
      {task.title}
    </li>
  ));
  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {taskItems}
      </ul>
    </div>
  );
}

const mapStateToProps = state => {
  return { tasks: state.taskReducer.tasks }
};

export default connect(mapStateToProps, { fetchTasks, toggleTask })(Tasks);
