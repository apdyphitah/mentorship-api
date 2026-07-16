// const express = require('express');
import express from 'express';
const router = express.Router();
// const { getUsers, getUserInfo, createUser, updateUser, deleteUser,  } = require("../controllers/user")
import { getUsers, getUserInfo, updateUser, deleteUser, createUser } from "../controllers/user.js"; 



router.get('/', getUsers)
router.get('/:id', getUserInfo)
router.post('/create', createUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

export default router