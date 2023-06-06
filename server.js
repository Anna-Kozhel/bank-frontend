const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/banking-institution'))

app.get('/*', (req, res) => {
  res.sendFile('index.html', {root: 'dist/banking-institution/'})
})

app.listen(process.env.PORT || 4200);
