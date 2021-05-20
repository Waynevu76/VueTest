const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()

app.use(cors());
app.get('/api/:id', (req, res) => {
    const id = req.params.id;
    const filePath = `./api/${id}.json`;
    const file = fs.readFileSync(filePath);
    res.send(JSON.parse(file));
})


app.get('/api/list', (req, res) => {
    const filePathList = './api/list.json';
    const fileList = fs.readFileSync(filePathList);
    res.send(JSON.parse(fileList));
})
app.listen(8080, function () {
    console.log('CORS-enabled web server listening on port 8080')
  })