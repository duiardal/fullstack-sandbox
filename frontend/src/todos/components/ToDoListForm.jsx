import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import AddIcon from '@material-ui/icons/Add'
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import {
  Input,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
  IconButton,
} from '@material-ui/core'
import { Context } from "../../provider";

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles()
  const [todos, setTodos] = useState(toDoList.todos)
  const [checked, setChecked] = useState(false)
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = event => {
    event.preventDefault()
    saveToDoList(toDoList.id, { todos })
  }

  const handleRemoveTask = (todo, index) => {
    const idx = todos.findIndex(t => t.name === todo.name);
    todos.splice(idx, 1);

    setTodos(todos);
    saveToDoList(toDoList.id, { todos })
  };

  const handleCheckbox = (checkedStatus, todo) => {
    todo.finished = checkedStatus;
    setChecked(checkedStatus)

    console.log(todo)
    setTodos(todos);
    saveToDoList(toDoList.id, { todos })
  }

  const setTodoName = (name, index) => {
    setInputValue(name);
    setTodos([
      ...todos.slice(0, index),
      {name: name, finished: false},
      ...todos.slice(index + 1)
    ]);
    console.log(todos)
    saveToDoList(toDoList.id, { todos })
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2">{toDoList.title}</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((todo, index) => (
            <div key={index} className={classes.todoLine}>
              <Checkbox
                indeterminate={todo.finished}
                color="default"
                disableRipple
                checked={todo.finished}
                onChange={e => handleCheckbox(e.target.checked, todo)}
              />
              <Input
                value={todo.name}
                onChange={e => setTodoName(e.target.value, index)}
                className={classes.textField}
              />
              <IconButton
                className={classes.standardSpace}
                onClick={() => {
                  handleRemoveTask(todo, index);
                }}
              >
                <DeleteOutlined />
              </IconButton>
            </div>
          ))}

          <CardActions>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                setTodos([...todos, ""]);
              }}
            >
              Add Todo <AddIcon />
            </Button>
            {inputValue.length > 0 &&
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            }
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}
