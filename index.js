import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000

// const userRoutes = require('./routes/users')
import userRoutes from './routes/users.js';
// const postRoutes = require('./routes/posts')
import postRoutes from './routes/posts.js';
// require('dotenv').config();
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import taskRoutes from './routes/tasks.js';

import dotenv from 'dotenv';
// const cors = require('cors')
import cors from 'cors';
dotenv.config();
// const morgan = require('morgan')
import morgan from 'morgan';
// const helmet = require('helmet')
import helmet from 'helmet';
//swagger
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';

// const express = require('express');

// const mongoose = require('mongoose');
import mongoose from 'mongoose';


import { logger } from './middlewares/logger.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';






let users = [
  { id: 1, name: 'Ayaan' },
  { id: 2, name: 'Fatima' },
  { id: 3, name: 'Zubeyr' }
];
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors(
    {
    origin : ["http://localhost:5464", "https://dugsiiye.com", "http://localhost:3000", "http://localhost"]
    }
))
app.use(helmet());
// custom  middleware
app.use(logger);


//routes
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes) // Assuming you have admin routes in admin.
app.use('/tasks', taskRoutes); // Assuming you have task routes in tasks.js

// Swagger documentation route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/', (req, res) => {
    res.status(200).json(users);
});

app.use(notFound); // Handle 404 errors
app.use(errorHandler); // Global error handler

// post route
// app.post('/users', (req, res) => {
//     const newUser = {
//         id : users.length + 1,
//         name : req.body.name
//     };
//     users.push(newUser);
//     res.status(201).json(newUser);
// });

// // READ (GET one)
// app.get('/users/:id', (req, res) => {
//   const user = users.find(u => u.id == req.params.id);
//   if (!user) return res.status(404).send('User not found');
//   res.json(user);
// });


// // PUT route
// app.put('/users/:id', (req, res) => {
//     const user = users.find(u => u.id == req.params.id);
//     if(!user) return res.status(404).send('user not found');
//     user.name = req.body.name;
//     res.json(user)

// })

// // DELETE route

// app.delete('/users/:id', (req, res) => {
//     users = users.filter(u => u.id != req.params.id);
//     res.send('user deleted')
    
// })


//connect to mongodb

mongoose.connect(process.env.NODE_ENV == "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
    .then( () => console.log('✅ MongoDB connected locally'))
    .catch((err) => console.error('❌ Connection error:', err));


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});