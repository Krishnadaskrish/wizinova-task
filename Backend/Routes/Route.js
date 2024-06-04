const express = require('express');
const userRouter = express.Router()
const MainControllers = require('../Controllers/MainController')
const TryCatch = require('../MiddileWare/TryCatchMiddleWare')
const verifyToken = require('../MiddileWare/AuthMiddileWare');
const MainController = require('../Controllers/MainController');
const upload = require('../MiddileWare/ImageUplode')
const multer = require('multer');
const uploads = multer({ storage: multer.memoryStorage() });



userRouter
.post('/register',TryCatch(MainControllers.createUser))
.post('/login',TryCatch(MainControllers.userLongin))
.post('/sendOtp',TryCatch(MainController.ForgotPasswordOtp))
.post('/submitOtp',TryCatch(MainController.submitOtp))
.post('/create',upload,verifyToken,TryCatch(MainController.createPost))
.get('/getpost',TryCatch(MainController.getAllPost))
.patch('/edit/:id',TryCatch(MainController.editPost))
.delete('/delete/:id',TryCatch(MainController.deletePost))
.post('/upload-excel', uploads.single('file'),TryCatch(MainController.BulkMail));


module.exports = userRouter