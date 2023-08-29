require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mainRouter = require('./src/routers/index');
const port = 4000;

app.use(express.json());
app.use(cors());
app.use('/', mainRouter);
app.use('/img', express.static('upload'));

app.get('/', (req, res) => {
  res.send('This is Server side of Blanja');
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
