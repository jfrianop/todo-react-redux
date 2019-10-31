import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Tasks from './components/Tasks';
import TaskForm from './components/TaskForm';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Tasks />
        <hr />
        <TaskForm />
      </div>
    </Provider>
  );
}

export default App;
