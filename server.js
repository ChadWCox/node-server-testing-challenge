const express = require('express');
const server = express();

const users = [
    {
        id: 1,
        fname: 'Chad',
        lname: 'Cox',
        email: 'chad@email.com'
    },
]

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json('Api is running')
});

server.get('/users', (req, res) => {
    try {
        res.status(200).json(users)
    }
    catch (e) {
        res.status(500).json(e.message)
    }
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    try {
        let user = users[id - 1];
        if (!user) {
            res.status(404).json(`User with id ${id} not found. `)
        } else {
            res.status(200).json(user);
        } 
    }
    catch (e) {
        res.status(500).json(e.message)
    }
});

server.post('/users', (req, res) => {
    const body = req.body
    
   const email = users.find( ({ email }) => email === body.email)    
            if (!email) {
                const newUser = {
                id: users.length+1,
                ...body
                }           
                users.push(newUser);
                res.status(201).json(newUser) 
            } 
            else {
                res.status(406).json('emails must be unique') 
            }
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    try {
        users.splice(id - 1, 1);
        res.status(200).json(users);
    }
    catch (e) { 
        res.status(500).json(e.message)
    }
});

server.get('*', (req, res) => {
    res.status(404).json('Not Found')
});

module.exports = server;