import taskReducer, { initialState } from './taskReducer'
import { FETCH_TASKS } from '../actions/types';
import { fetchTasks } from '../actions/taskActions'
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const tasks = [
  { id: 0, title: 'first title', done: true },
  { id: 1, title: 'second title', done: false }
];


describe('taskReducer', () => {
  beforeEach(() => moxios.install());

  afterEach(() => moxios.uninstall());

  it('should return initial state by default', () => {
    const state = taskReducer(undefined, { type: 'invalid' });

    expect(state).toMatchObject(initialState);
  });

  it('should return a new state with a list of tasks', () => {
    const state = taskReducer(undefined, { type: FETCH_TASKS, payload: tasks });
    for (let i = 0; i < tasks.length; i++) {
      expect(state.tasks[i]).toMatchObject(tasks[i]);
    }
  });

  it('should request task and return an action with those task', () => {
    moxios.stubRequest("http://localhost:3001/tasks", {
      status: 200,
      response: tasks
    });

    const store = mockStore();
    const dispatch = store.dispatch;

    return (
      fetchTasks()(dispatch)
        .then(() => {
          const actions = store.getActions();
          // console.log(actions[0].payload[0].title)
          expect(actions[0].type).toBe(FETCH_TASKS);
          expect(actions[0].payload).toMatchObject(tasks);
        })
    );
  });
});