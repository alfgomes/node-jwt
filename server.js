const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    })
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)

            clearServerMessage("Error:" + err)
        }
        else {
            res.json({
                message: 'Post successfully created',
                authData: authData
            })

            clearServerMessage("Access successful At:" + new Date(authData.exp*1000))
        }
    })
})

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'admin@test.com'
    }

    jwt.sign({ user: user }, 'secretkey', { expiresIn: '120s' }, (err, token) => {
        res.json({
            token: token
        })

        clearServerMessage("Generated token!")
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

function clearServerMessage(message) {
    console.clear();
    console.log('Server started on Port 5000');
    console.log(message);
}






app.listen(5000,
    () => {
        console.clear();
        console.log('Server started on Port 5000');
    }
)