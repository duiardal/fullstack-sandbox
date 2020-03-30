import React, { Fragment, useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

import { Paper, Grid } from "@material-ui/core";
import { ToDoListForm } from "./ToDoListForm";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const apiEndpoint = "http://localhost:3001/api/todoList";

export const getTodos = async () => {
  const response = await fetch(apiEndpoint);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
};

const getPersonalTodos = async () => {
  return await getTodos();
};

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({});
  const [activeList, setActiveList] = useState();
  const [listName, setListName] = useState("");

  useEffect(() => {
    updateListState();
  }, []);

  const updateListState = () => {
    getPersonalTodos().then(setToDoLists);
  };

  const editTodoItems = async (currentList, todoItem) => {
    await fetch(`${apiEndpoint}/${currentList}/todoItem`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: currentList.id,
        name: currentList.name,
        todos: [...todoItem]
      })
    })
    .then(currentList => currentList.json())
    .then(sleep(100).then(() => updateListState()))
    .catch(e => console.error(e));
  };

  const addTodo = async data => {
    await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: data,
        title: data,
        todos: []
      })
    })
      .then(data => data.json())
      .then(sleep(100).then(() => updateListState()))
      .catch(e => console.error(e));
  };

  const removeTodo = async data => {
    const listID = data.id;
    await fetch(`${apiEndpoint}/${listID}`, {
      method: "DELETE"
    })
      .then(data => data.json())
      .then(sleep(100).then(() => updateListState()))
      .catch(e => console.error(e));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (listName.length === 0) {
      return;
    }
    await addTodo(listName);
    setListName("");
  };

  return (
    <>
      <Fragment>
        <Paper style={{ margin: 8 }}>
          <List style={{padding: 0}}>
            {Object.keys(toDoLists).map((key, index) => (
              <>
              <ListItem
                key={key}
                disableRipple
                divider={index !== toDoLists.length - 1}
                button
                onClick={() => setActiveList(key)}
                style={{height: '64px'}}
              >
                <ListItemText primary={toDoLists[key].title} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeTodo(toDoLists[key])}
                  >
                    <DeleteOutlined />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              </>
            ))}
          </List>
        </Paper>

        {toDoLists[activeList] && (
          <ToDoListForm
            key={activeList} // use key to make React recreate component to reset internal state
            toDoList={toDoLists[activeList]}
            saveToDoList={(id, { todos }) => {
              editTodoItems(id, todos);
            }}
          />
        )}

        <Paper style={{ margin: 8, padding: 16 }}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
                <TextField
                  placeholder="Add Todo here"
                  value={listName}
                  onChange={e => setListName(e.target.value)}
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
        </Paper>
      </Fragment>
    </>
  );
};
