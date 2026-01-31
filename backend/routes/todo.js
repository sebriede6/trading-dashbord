import express from 'express';
import { getTodos, addTodo, deleteTodo, updateTodo } from '../controllers/todo.js';
import { authenticate } from '../controllers/auth.js';

export default (pool, logger) => {
  const router = express.Router();
  router.use(authenticate);
  router.get('/', (req, res) => getTodos(req, res, pool, logger));
  router.post('/', (req, res) => addTodo(req, res, pool, logger));
  router.delete('/:id', (req, res) => deleteTodo(req, res, pool, logger));
  router.put('/:id', (req, res) => updateTodo(req, res, pool, logger));
  return router;
};
