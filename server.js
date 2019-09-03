const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api', (req, res) =>{
    res.json({
        message:'Welcome to the API'
    })
})

app.post('/api/posts', (req, res) =>{
    res.json({
        message:'Post successfully created'
    })
})

app.listen(5000,
    () => {
        console.clear();
        console.log('Server started on Port 5000');
    }
)