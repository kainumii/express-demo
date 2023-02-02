const express = require("express");
// https://joi.dev/
const Joi = require("joi");

const todos_list = [
  {
    id: 1,
    title: "Hae Luka kerhosta",
    completed: false,
  },
  {
    id: 2,
    title: "Tee lumityöt!!",
    completed: false,
  },
  {
    id: 3,
    title: "Siivoa varasto!",
    completed: true,
  },
  {
    id: 4,
    title: "Paista joulukinkku!",
    completed: false,
  },
  {
    id: 5,
    title: "Tiputa lumet katolta!",
    completed: false,
  },
];

function routes() {
  const router = express.Router();
  router
    .route("/todos")
    // create new todo
    .post((req, res) => {
      const schema = Joi.object({
        title: Joi.string().min(5).required(),
        completed: Joi.required(),
      });

      const result = schema.validate({
        title: req.body.title,
        completed: req.body.completed,
      });

      if (result.error) {
        return res.status(400).send(result.error.details[0].message);
      }

      const new_todo = {
        id: todos_list.length + 1,
        title: req.body.title,
        completed: req.body.completed,
      };
      todos_list.push(new_todo);
      return res.status(201).json(new_todo);
    })
    // get all todos
    .get((req, res) => {
      return res.json(todos_list);
    });

  router
    .route("/todos/:id")
    // get single todo
    .get((req, res) => {
      var id_number = parseInt(req.params.id);
      var todo = todos_list.find((t) => t.id === id_number);
      if (!todo) {
        res.status(400).send("not found");
        return;
      }
      res.json(todo);
    })
    // update todo identified
    .put((req, res) => {
      var id_number = parseInt(req.params.id);
      var todo = todos_list.find((t) => t.id === id_number);
      if (!todo) {
        res.status(404).send("not found");
        return;
      }

      const schema = Joi.object({
        title: Joi.string().min(5).required(),
        completed: Joi.required(),
      });

      const result = schema.validate({
        title: req.body.title,
        completed: req.body.completed,
      });

      if (result.error) {
        return res.status(400).send(result.error.details[0].message);
      }

      todo.title = req.body.title;
      todo.completed = req.body.completed;

      return res.send(todo);
    })
    // delete todo identified
    .delete((req, res) => {
      var id_number = parseInt(req.params.id);
      const todo = todos_list.find((t) => t.id === id_number);

      if (!todo) {
        return res.status(404).send();
      }

      const index = todos_list.indexOf(todo);
      todos_list.splice(index, 1);
      return res.status(204).send();
    });

  return router;
}

module.exports = routes;
