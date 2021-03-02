const UsersColl = require('../models/user');
const mongoose = require('mongoose');
const Role = require("../helpers/role")


module.exports = {
    registerUser,
    getUsers,
    getById,
    upgradeToManager
};

async function registerUser(name,password,role) {
    const user = new UsersColl({
        name: name,
        password: password,
        role: role,
    });

    const persistedUser = await user.save();

    if (!persistedUser) {
        return;
    }
    else{
        return user;
    }
}

async function getUsers() {
    const users = await UsersColl.find({})
    return users
    // .map(u => {
    //     // const { password, ...userWithoutPassword } = u;
    //     return userWithoutPassword;
    // });
};

async function getById(id) {
    const user = await UsersColl.findById(id);
    return user;
}

async function upgradeToManager(id){
    let user = await UsersColl.findByIdAndUpdate(id,{
        role: Role.Manager
    })
}