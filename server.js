
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use('/mfe/music', express.static(path.join(__dirname, 'music', 'dist/')));
// app.use('/mfe/music/assets', express.static(path.join(__dirname, 'music', 'dist/assets/')));
app.use('/mfe/welcome', express.static(path.join(__dirname, 'welcome', 'dist/')));
// app.use('/mfe/welcome/assets', express.static(path.join(__dirname, 'welcome', 'dist/assets/')));
app.use('/', express.static(path.join(__dirname, 'bootstrap', 'dist/')));

app.listen(port, () => {
  console.log(`MicroFrontEnd App listening on port ${port}`)
});