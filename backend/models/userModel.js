const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please enter your name'],
        maxLength: [30 , 'Name cannot exceed 30 characters'],
        minLength: [4 , 'Full name required']
    },
    email:{
        type: String,
        required:[true,'Please enter your email'],
        unique: true,
        validate:[validator.isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required:[true,'Please enter your password'],
        minLength: [8 , 'Min 8 characters required'],
        select:false,
    },
    avatar:{
        public_id:{type:String,},
        url:{type:String,}
    },
    role:{
        type: String,
        default:'user',
    },
    createdAt:{
        type: String,
        default:Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

//JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE, })
}

//Generating password reset token
userSchema.methods.getResetPasswordToken = function (){
    //Generating token
    const resetToken = crypto.randomBytes(20).toString('hex')

    //Hashing and adding userPasswordToken to userSchema
    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

    // Password expiry
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
    return resetToken
}



module.exports = mongoose.model('User',userSchema)




