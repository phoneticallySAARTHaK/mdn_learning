const express = require('express');
const app = Express();
const port = 3000;

app.get('/', function(req, res) {
    res.send('Hello World!')
});

app.listen(port, function() {
    console.log(`Example app listeing on port ${port}`);
})