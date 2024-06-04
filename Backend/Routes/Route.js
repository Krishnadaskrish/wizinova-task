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
.post('/sendOtp',verifyToken,TryCatch(MainController.ForgotPasswordOtp))
.post('/submitOtp',verifyToken,TryCatch(MainController.submitOtp))
.post('/create',verifyToken,upload,verifyToken,TryCatch(MainController.createPost))
.get('/getpost',verifyToken,TryCatch(MainController.getAllPost))
.patch('/edit/:id',verifyToken,TryCatch(MainController.editPost))
.delete('/delete/:id',verifyToken,TryCatch(MainController.deletePost))
.post('/upload-excel',verifyToken, uploads.single('file'),TryCatch(MainController.BulkMail));


module.exports = userRouter