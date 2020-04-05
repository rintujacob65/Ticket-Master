//const express = require('express')
const {User} = require('../models/user')
const _ = require('lodash')

module.exports.register = (req,res) => {
    const body = req.body
    const user = new User(body)
    user.save()
    .then((user) => {
        //res.json(_.pick(user,['_id','username','email']))
        res.json(user)
    })
    .catch((err) =>{
        res.json(err)
    })
}
module.exports.login = (req,res) => {
    const body = req.body
    User.findByCredentials(body.email ,body.password)
    .then((user) => {
        userInfo = user
        return user.generateToken()
    })
    .then((token) => {
      // res.setHeader('xauth',token).json({})
      res.json({
          token,
          user : {
              _id : userInfo._id,
              email : userInfo.email
          }
      })
    })
    .catch((err) => {
        res.json(err)
    })
}
module.exports.account = (req,res) => {
    const { user } = req
    res.json(_.pick(user,['_id','username','email']))
    // User.findOne({
    //     _id :user._id
    // })
    // .then((user) => {
    //     // res.json(_.pick(user,['_id','username','email']))
    //     res.json({
    //         _id : user._id,
    //         username : user.username,
    //         email : user.email
    //     })
    // })
    // .catch((err) => {
    //     res.json(err)
    // })
   
}

module.exports.logout = (req,res) => {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull : { tokens : { token : token }}})
    .then(() => {
        res.json({ notice : 'successfully logged out'})
    })
    .catch((err) => {
        res.json(err)
    })
}