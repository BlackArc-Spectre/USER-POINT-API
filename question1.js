const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let users = [];
let userIdCounter = 1;

// a. Create a user
app.post('/api/users', (req, res) => {
    const { username, email, password } = req.body;
    const newUser  = { id: userIdCounter++, username, email, password };
    users.push(newUser );
    res.status(201).json(newUser );
});

// b. Delete a user
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.status(204).send();
});

// c. Update a user
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { username, email } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], username, email };
        res.status(200).json(users[userIndex]);
    } else {
        res.status(404).send('User  not found');
    }
});

// d. Get a single user
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send('User  not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})