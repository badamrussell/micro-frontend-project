
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use('/mfe/music', express.static(path.join(__dirname, 'music', 'dist/')));
app.use('/mfe/welcome', express.static(path.join(__dirname, 'welcome', 'dist/')));
app.use('/', express.static(path.join(__dirname, 'bootstrap', 'dist/')));

app.all('/*', function(req, res) {
  res.sendFile('index.html', { root: './bootstrap/dist'});
});

app.listen(port, () => {
  console.log(`MicroFrontEnd App listening on port ${port}`)
});