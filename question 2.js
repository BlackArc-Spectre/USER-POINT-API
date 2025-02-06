const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let users = [];
let posts = [];
let userIdCounter = 1;
let postIdCounter = 1;

// User APIs
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
    posts = posts.filter(post => post.userId !== userId); // Remove posts by deleted user
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

// Post APIs
// a. User creates a post
app.post('/api/users/:userId/posts', (req, res) => {
    const userId = parseInt(req.params.userId);
    const { title, content } = req.body;
    const newPost = { id: postIdCounter++, userId, title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// b. User deletes a post
app.delete('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.status(204).send();
});

// c. User updates a post
app.put('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        posts[postIndex] = { ...posts[postIndex], title, content };
        res.status(200).json(posts[postIndex]);
    } else {
        res.status(404).send('Post not found');
    }
});

// d. User gets all posts
app.get('/api/posts', (req, res) => {
    res.status(200).json(posts);
});

// e. User gets a post
app.get('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).send('Post not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})