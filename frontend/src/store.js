export const fetchInitial = data => {
  return {
    type: "INITIAL",
    data
  }
};

export const addTodo = data => {
  if (!data) return;

  return {
    type: "ADD",
    data
  };
};

export const editTodo = data => {
  console.log(data);
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

    case "INITIAL":
      {
        return [...action.data];
      }
    case "ADD":
      {
        return [...state, action.data];
      }
    case "EDIT":
      {
        const index = state.findIndex(t => t.id === action.data.id);
        const todos = Object.assign([], state);
        todos[index] = action.data;
        return todos;
      }
    case "REMOVE":
      {
        const index = state.findIndex(t => t.id === action.data.id);
        const todos = Object.assign([], state);
        todos.splice(index, 1);
        return [...todos];
      }
    default:
      return state;
  }
};