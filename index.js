const express = require('express');
const mongoose = require('mongoose');
const expressHandleBars = require('express-handlebars');
const todoRoutes = require('./routes/todos');

const PORT = process.env.PORT || 3000;

const app = express();
const handleBars = expressHandleBars.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', handleBars.engine);

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(todoRoutes);


async function start() {
  try {
    await mongoose.connect('mongodb+srv://ilya:ilya123@cluster0.vvp6k.mongodb.net/trymongo', {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    app.listen(PORT, () => {
      console.log('START');
    });
  } catch (e) {
    console.log('ERROR', e);
  }
}

start();