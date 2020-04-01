import React, { Fragment, useState, useContext } from "react";
import { Paper, List, Typography } from "@material-ui/core";
import { ToDoListForm } from "./ToDoListForm";
import { Task } from "./Task";
import { InputField } from "./InputField";
import { Context } from "../../utils/provider";

export const ToDoLists = () => {
  const { state } = useContext(Context);
  const { editTodoList } = useContext(Context);
  const [activeList, setActiveList] = useState();

  return (
    <Fragment>
      <Paper style={{ margin: "16px 8px", padding: 16 }}>
        <InputField />
      </Paper>

      <Paper style={{ margin: 8 }}>
        <List style={{ padding: 0 }}>
          {state &&
            state.map((task, index) => (
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

      {activeList && state.length > 0 && (
        <ToDoListForm
          key={activeList.id}
          toDoList={activeList}
          saveToDoList={(id, { todos }) => {
            editTodoList(id, todos);
          }}
        />
      )}

      {state.length === 0 && (
        <Paper style={{ margin: "0 8px", padding: 16 }}>
          <Typography>No todo's added</Typography>
        </Paper>
      )}
    </Fragment>
  );
};
