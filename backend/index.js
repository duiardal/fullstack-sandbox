const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3001;

let todos = [
  {
    id: "first list",
    title: "First List",
    todos: ["First todo of first list!"]
  }
];

app.get("/api/todoList", (req, res) => {
  res.send(todos);
});

app.post("/api/todoList", (req, res) => {
  const newTask = req.body;
  todos.push(newTask)
  res.send(newTask);
});

app.put("/api/todoList/:id/todoItem", (req, res) => {
  const requestId = req.params.id;
  let currentList = todos.filter((list) => {
    return list.id === requestId;
  })[0];

  const index = todos.indexOf(currentList);

  const keys = Object.keys(req.body);

  keys.forEach((key) => {
    currentList[key] = req.body[key];
  })

  todos[index] = currentList;

  res.json(todos[index]);
});

app.delete('/api/todoList/:id', (req, res) => {
  const requestId = req.params.id;

  let todoList = todos.filter((list) => {
    return list.id === requestId;
  })

  const index = todos.indexOf(todoList);

  todos.splice(index, 1);

  res.json({ message: `List: ${requestId} deleted.`})
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
