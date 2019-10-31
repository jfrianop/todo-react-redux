import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../actions/taskActions';

function TaskForm({ createTask }) {
  const [title, setTitle] = useState("");

  function onChange(e) {
    setTitle(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    const task = {
      title,
      done: false
    };

    setTitle("");
    createTask(task);
  }

  return (
    <div>
      <h1>Add Task</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title: </label>
          <br />
          <input
            type="text"
            name="title"
            onChange={onChange}
            value={title}
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default connect(null, { createTask })(TaskForm);
