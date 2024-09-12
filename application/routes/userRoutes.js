// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const UserController = require('../controllers/userController');
const UserValidator = require('../validator/userValidator');
const {auth} = require('../middlewares/authenticateToken');
const path = require ('path');
const router = express.Router();
const userController = new UserController();
const userValidator = new UserValidator();
const sessionAuth = require('express').Router();

router.get("/user",(req,res)=>{
    res.sendFile(path.join(__dirname, process.env.EXPRESS_STATIC, '../src/index.html'))
})

router.get('/:id',auth, userValidator.validateUserId(), (req, res) => userController.getUser(req, res));
router.post('/', userValidator.validateUserData(), (req, res) => userController.createUser(req, res));
router.put('/:id',auth, userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));
router.delete('/:id',auth, userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));
router.get('/search', (req, res) => userController.searchUsers(req, res));
router.post('/login', sessionAuth,userValidator.validateUserLogin(), (req, res) => userController.verifyUser(req, res));


module.exports = router;