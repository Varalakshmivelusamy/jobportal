const express = require('express');
const router = express.Router();
const logincontroller=require('../controller/logincontroller');
router.post('/login',logincontroller.userLogin);
