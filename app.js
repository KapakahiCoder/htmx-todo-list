import express from "express";

const todos = [];

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Simple Todo List</title>
      <link rel="stylesheet" href="/main.css" />
      <script src="/htmx.js" defer></script>
    </head>
    <body>
      <main>
        <h1>Todo List</h1>
        <section>
          <form id="todo-form" hx-post="/todos" hx-target="#todos" hx-swap="beforeend">
            <div>
              <label htmlFor="todo">Todo</label>
              <input type="text" id="todo" name="todo" />
            </div>
            <button type="submit">Add todo</button>
          </form>
        </section>
        <section>
          <ul id="todos">
          ${todos
            .map(
              (todo) => `
            <li id="todo-${todo.id}">
              <span>${todo.text}</span>
              <button hx-delete="/todos/${todo.id}" hx-target="#todo-${todo.id}" hx-swap="outerHTML">Remove</button>
            </li>
          `
            )
            .join("")}
          </ul>
        </section>
      </main>
    </body>
  </html>
  `);
});

app.post("/todos", (req, res) => {
  const enteredTodo = req.body.todo;
  const id = new Date().getTime().toString();
  todos.push({ text: enteredTodo, id: id });
  res.send(`
    <li id="todo-${id}">
      <span>${enteredTodo}</span>
      <button hx-delete="/todos/${id}" hx-target="#todo-${id}" hx-swap="outerHTML">Remove</button>
    </li>
  `);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);
  res.send();
});
app.listen(3000);
