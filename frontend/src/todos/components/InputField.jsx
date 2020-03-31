import React, { useState, useContext } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { Context } from "../../utils/provider";

export const InputField = () => {
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
    };

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
          <Button fullWidth color="primary" variant="outlined" type="submit">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
