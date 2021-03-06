import React, { useContext } from "react";
import {
  ListItemIcon,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Context } from "../../utils/provider";

export const Task = ({ divider, setActiveList, task, activeList }) => {
  const { deleteTodo } = useContext(Context);

  const handleDelete = () => {
    deleteTodo(task);
    setActiveList();
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
      style={{
        height: "64px",
        background: getTotalStatus() === true && task.todos.length > 0 ? 'rgba(63, 81, 181, 0.1)' : 'transparent'
      }}
    >
      {getTotalStatus() && task.todos.length > 0 ? (
        <ListItemIcon>
          <CheckCircleIcon color='primary' />
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
