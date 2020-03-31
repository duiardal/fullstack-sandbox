import React, { Fragment, useState, useContext } from "react";
import {
  Paper,
  Grid,
  ListItemIcon,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  ListItemSecondaryAction,
  IconButton,
  Typography
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { ToDoListForm } from "./ToDoListForm";
import { Context } from "../../provider";

export const ToDoLists = () => {
  const { state } = useContext(Context);
  const { addTodoItem } = useContext(Context);
  const [activeList, setActiveList] = useState();

  return (
    <Fragment>

      <Paper style={{ margin: '16px 8px', padding: 16 }}>
        <Input />
      </Paper>

      <Paper style={{ margin: 8 }}>
        <List style={{ padding: 0 }}>
          {state && state.map((task, index) => (
            <Task
              key={`${task.id}-${index}`}
              divider={index !== state.length - 1}
              setActiveList={setActiveList}
              activeList={activeList}
              task={task}
            />
          ))}
        </List>
      </Paper>

      {activeList && (
        <ToDoListForm
          key={activeList.id}
          toDoList={activeList}
          saveToDoList={(id, { todos }) => {
            addTodoItem(id, todos);
          }}
        />
      )}
    </Fragment>
  );
};

export const Input = () => {
  const [value, setValue] = useState("");
  const { startAddTodo } = useContext(Context);

  const handleSubmit = e => {
    e.preventDefault();

    if (!value) {
      return;
    }

    const payload = {
      id: value,
      title: value,
      todos: []
    }

    startAddTodo(payload);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
           placeholder="Add Todo here"
           value={value}
           onChange={e => setValue(e.target.value)}
           fullWidth
         />
       </Grid>
       <Grid xs={2} md={1} item>
         <Button
           fullWidth
           color="primary"
           variant="outlined"
           type="submit"
         >
           Add
         </Button>
       </Grid>
     </Grid>
   </form>
  );
};

const Task = ({ divider, setActiveList, task, activeList }) => {
  const { deleteTodo } = useContext(Context);

  const handleDelete = () => {
    deleteTodo(task);
  };

  const getTotalStatus = () => {
    return task.todos.every((item) => (
      item.finished === true
    ))
  }

  const getTotal = () => {
    let count = 0;
    task.todos.forEach((item) => {
      if (item.finished) {
        count = count + 1;
      }
    })
    return `${count}/${task.todos.length}`;
  }

  return (
    <ListItem
      disableRipple
      divider={divider}
      button
      onClick={() => {
        return activeList === task ? setActiveList() : setActiveList(task);
      }}
      style={{ height: "64px" }}
    >
      {getTotalStatus() && task.todos.length > 0 ? (
        <ListItemIcon>
          <CheckCircleIcon />
        </ListItemIcon>
      ) : (
        <ListItemIcon>
          <Typography>{getTotal()}</Typography>
        </ListItemIcon>
      )}

      <ListItemText primary={task.title} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDelete()}
        >
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
