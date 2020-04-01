export const fetchInitial = data => {
  return {
    type: "INITIAL",
    data
  };
};

export const addTodo = data => {
  if (!data) return;

  return {
    type: "ADD",
    data
  };
};

export const editTodo = data => {
  return {
    type: "EDIT",
    data
  };
};

export const removeTodo = data => {
  return {
    type: "REMOVE",
    data
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL": {
      return [...action.data]; // return the data fetched from the server
    }
    case "ADD": {
      return [...state, action.data]; // concatenate the existing data with the new
    }
    case "EDIT": {
      const index = state.findIndex(t => t.id === action.data.id);
      const todos = [...state]; // copy enumerables
      todos[index] = action.data;
      return todos; // concatenate existing data with changed data
    }
    case "REMOVE": {
      const index = state.findIndex(t => t.id === action.data.id);
      const todos = [...state]; // copy enumerables
      todos.splice(index, 1);
      return [...todos];
    }
    default:
      return state;
  }
};
