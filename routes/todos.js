const {Router} = require('express');
const Todo = require('../models/todo')

const router = Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find({}).lean();
  res.render('index', {
    title: 'todos list',
    isIndex: true,
    todos
  });
});
router.get('/create', (req, res) => {
  res.render('create', {
    title: 'create title',
    isCreate: true
  })
});
router.post ('/create', async (req, res) => {
  const todo = new Todo({
    title: req.body.title
  });
  await todo.save();
  res.redirect('/');
});
router.post ('/save', async (req, res) => {
  const todo = await Todo.findById(req.body.id);

  todo.completed = !!req.body.completed;

  await todo.save();

  res.send({status: 'ok'});
});
router.post ('/remove', async (req, res) => {
  await Todo.remove({
    _id: req.body.id
  })

  res.send({status: 'ok'});
});

module.exports = router;