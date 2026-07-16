// const express = require('express');
import express from 'express';
// const { getPost, getPostInfo } = require('../controllers/posts');
import { getPost, getPostInfo } from '../controllers/posts.js'; 


const router = express.Router();


router.get('/', getPost)
router.get('/:id', getPostInfo)

export default router