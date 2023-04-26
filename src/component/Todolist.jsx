import React, { useReducer } from 'react';
import './Todolist.css';
import Button from 'react-bootstrap/Button';

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SET_TODO = 'SET_TODO'

function todoReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, { id: Date.now(), text: action.payload }], 
        todo: ''
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
      case SET_TODO:
        return {
          ...state,
          todo: action.payload
        };
    default:
      return state;
  }
}

function Todolist() {
  const [{ todos, todo }, dispatch] = useReducer(todoReducer, { todos: [], todo: '' });

  const handleDelete = (id) => {
    dispatch({ type: DELETE_TODO, payload: id });
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
      </div>
      <div className="input">   
        <input
          placeholder="enter your plans"
          value={todo}
          onChange={(e) => dispatch({ type: 'SET_TODO', payload:e.target.value })}
          type="text"
        />
        
        <Button
          onClick={() => dispatch({ type: ADD_TODO, payload: todo })}
          variant="primary"
        >
          add
        </Button>
      </div>
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div className="todo">
              <div className="left">
                <p>{todo.text}</p>
              </div>
              <div className="right">
                <i
                  className="fas fa-times"
                  onClick={() => handleDelete(todo.id)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todolist;
