// const apiEndpoint = "http://localhost:3001/api/todoList";

// export const getTodos = async () => {
//   const response = await fetch(apiEndpoint);
//   const body = await response.json();
//   if (response.status !== 200) throw Error(body.message);
//   return body;
// };

// export const initialState = getTodos();

// export const reducer = async (state, action) => {
//   switch (action.type) {
//     case "add": {
//       const response = await fetch(apiEndpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           id: state,
//           title: state,
//           todos: []
//         })
//       });

//       const body = await response.json();

//       console.log(state, body)

//       const newTodo = {
//         id: body.id,
//         title: body.title,
//         todos: body.todos
//       };

//       console.log(newTodo)
//       return {
//         todos: [...state.todos, newTodo]
//       };
//     }
//     case "edit": {
//       const idx = state.todos.findIndex(t => t.id === action.id);
//       const todo = Object.assign({}, state.todos[idx]);
//       todo.text = action.text;
//       const todos = Object.assign([], state.todos);
//       todos.splice(idx, 1, todo);
//       return {
//         counter: state.counter,
//         todos: todos
//       };
//     }
//     case "remove": {
//       const idx = state.todos.findIndex(t => t.id === action.id);
//       const todos = Object.assign([], state.todos);
//       todos.splice(idx, 1);
//       return {
//         counter: state.counter,
//         todos: todos
//       };
//     }
//     default:
//       return state;
//   }
// };

// actions
// const INITIAL = "INITIAL";
// const TOGGLE_COMPLETE = "TOGGLE_COMPLETE";
// const ADD = "ADD";
// const DELETE = "DELETE";
// const SET_ACTIVE_LIST = "SET_ACTIVE_LIST";
// export const COMP_ALL = "COMP_ALL";

// // action creators
// export const toggleComplete = id => ({
//   type: TOGGLE_COMPLETE,
//   id
// });

// export const fetchInitial = data => ({
//   type: INITIAL,
//   data
// });

// export const addTodo = data => {
//   if (!data) return;

//   return {
//     type: ADD,
//     data
//   };
// };

// export const removeTodo = data => {
//     return {
//       type: DELETE,
//       data
//     };
// };

// export const setActiveList = data => {
//   console.log(data)
//   return {
//     type: SET_ACTIVE_LIST,
//     data
//   }
// };

// export const reducer = (state, action) => {
//   switch (action.type) {
//     case INITIAL:
//       return [...action.data];

//     case TOGGLE_COMPLETE:
//       return state.map(todo => {
//         if (todo.id === action.id) {
//           return { ...todo, completed: !todo.completed };
//         }
//         return todo;
//       });

//     case COMP_ALL:
//       return state.map(todo => {
//         if (todo.completed === false) {
//           return { ...todo, completed: true };
//         }
//         return todo;
//       });

//     case ADD:
//       return [action.data, ...state];

//     case DELETE:

//       const index = state.findIndex(t => t.id === action.data.id);
//       const todos = Object.assign([], state);
//       todos.splice(index, 1);
//       console.log(action.data)
//       return [...todos];

//     case SET_ACTIVE_LIST:
//       console.log(state);
//       return state;

//     default:
//       return state;
//   }
// };


// actions
const INITIAL = "INITIAL";
const ADD = "ADD";
const REMOVE = "REMOVE";
const EDIT = "EDIT";

export const fetchInitial = data => {
  return {
    type: INITIAL,
    data
  }
};

export const addTodo = data => {
  if (!data) return;

  return {
    type: ADD,
    data
  };
};

export const editTodo = data => {
  console.log(data);
  return {
    type: EDIT,
    data
  };
};

export const removeTodo = data => {
    return {
      type: REMOVE,
      data
    };
};

export const reducer = (state, action) => {
  switch (action.type) {

    case INITIAL:
      {
        return [...action.data];
      }
    case ADD:
      {
        return [...state, action.data];
      }
    case EDIT:
      {
        const index = state.findIndex(t => t.id === action.data.id);
        const todos = Object.assign([], state);
        todos[index] = action.data;
        return todos;
      }
    case REMOVE:
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