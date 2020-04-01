import React, { useReducer, useEffect } from "react";
import { reducer, fetchInitial, addTodo, removeTodo, editTodo } from "./store";

const apiEndpoint = "http://localhost:3001/api/todoList";

export const Context = React.createContext();

const Provider = props => {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = () => {
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => dispatch(fetchInitial(data)));
  };

  const startAddTodo = data => {
    fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        id: data.id,
        title: data.title,
        todos: data.todos
      })
    })
      .then(response => response.json())
      .then(data => dispatch(addTodo(data)))
      .catch(e => console.error(e));
  };

  const editTodoList = (id, todos) => {
    fetch(`${apiEndpoint}/${id}/todoItem`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        todos: todos
      })
    })
      .then(response => response.json())
      .then(data => dispatch(editTodo(data)))
      .catch(e => console.error(e));
  };

  const deleteTodo = data => {
    const listID = data.id;
    fetch(`${apiEndpoint}/${listID}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => dispatch(removeTodo(data)))
      .catch(e => console.error(e));
  };

  return (
    <Context.Provider
      value={{ state, dispatch, startAddTodo, deleteTodo, editTodoList }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
