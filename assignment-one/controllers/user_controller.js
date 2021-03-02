const userService = require('../services/user_service')
const Role = require('../helpers/role');
const express = require('express');
const router = express.Router();

// register = (req, res, next) => {
//     userService.createUser(req.body)
//         .then(user)
// }

router.get('/', getUsers)
router.post('/',registerUser)
router.get('/:currentUserId/:userId', getUserById)
router.post('/upgrade/:currentUserId/:userId', upgradeUser)

module.exports = router;

function registerUser(req, res, next){
    let role = req.body.role ? req.body.role : Role.User
    userService.registerUser(req.body.name,req.body.password, role)
    .then(user => res.json(user))
    .catch(err => next(err))
}

function getUsers (req, res, next){
    userService.getUsers()
        .then(users => res.json(users))
        .catch(err => next(err))
}

async function getUserById (req, res, next) {
    userService.getById(req.params.currentUserId)
        .then(user => {
            if(user.role != Role.Admin){
                return res.status(401).json({message: 'Unauthorized'});
            }
            userService.getById(req.params.userId)
            .then(user =>  res.json(user))
            .catch(err => next(err))
        })  
        .catch(err => next(err))
}

async function upgradeUser (req, res, next){
    userService.getById(req.params.currentUserId)
        .then(user => {
            if(user.role != Role.Admin){
                return res.status(401).json({message: 'Unauthorized'});
            }
            userService.getById(req.params.userId)
            .then(user =>  {
                userService.upgradeToManager(user.id)
                .then(user => res.json(user))
                .catch(err => next(err))
            })
            .catch(err => next(err))
        })  
        .catch(err => next(err))
}



