import React, { Fragment, useState, useContext } from "react";
import {
  Paper,
  List,
} from "@material-ui/core";
import { ToDoListForm } from "./ToDoListForm";
import { Task } from "./Task";
import { InputField } from "./InputField";
import { Context } from "../../provider";

export const ToDoLists = () => {
  const { state } = useContext(Context);
  const { addTodoItem } = useContext(Context);
  const [activeList, setActiveList] = useState();

  return (
    <Fragment>

      <Paper style={{ margin: '16px 8px', padding: 16 }}>
        <InputField />
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
