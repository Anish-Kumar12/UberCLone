const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() });
    }
    
    const { email, password, fullname } = req.body;
    console.log(req.body)
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({ 
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email, password : hashedPassword });
    const token = user.generateAuthToken()
    res.status(200).json({token,user})
}
module.exports.loginUser = async (req, res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({ errors : "Invalid Email or Password" });
    }
    const validPassword = await user.comparePassword(password, user.password);
    if(!validPassword){
        return res.status(401).json({ errors : "Invalid Email or Password" });
    }
    const token = user.generateAuthToken()
    res.status(200).json({token,user})
}
module.exports.getuserProfile = async (req, res , next) => {
    res.status(200).json(req.user);
}
