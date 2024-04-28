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
          <form id="todo-form">
            <div>
              <label htmlFor="todo">Todo</label>
              <input type="text" id="todo" name="todo" />
            </div>
            <button type="submit">Add todo</button>
          </form>
        </section>
        <section>
          <ul id="todos">
          ${todos.map(
            (todo, index) => `
            <li id="todo-${index}">
              <span>${todo}</span>
              <button>Remove</button>
            </li>
          `
          )}
          </ul>
        </section>
      </main>
    </body>
  </html>
  `);
});

app.listen(3000);
