/*
  id string pk 
  watchHistory objectId[] videos
  username string 
  email string 
  fullName string 
  avtar string 
  coverimage string 
  password string 
  refreshToken string 
  createdAt Date
  updatedAt Date
  */

import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required: true,

        },
        coverImage: {
            type: String, // cloudinary URL

        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "password is required"]
        },
        refreshToken: {
            type: String
        }
    },
    { timestamps: true }
)



// beford save the password it will encripted here (middleware  )
userSchema.pre("save", async function (next) {
    // fixed in registration video
    if (!this.isModified("password")) return true;

    this.password = bcrypt.hash(this.password, 10);

    next();
})

userSchema.methods.isPasswodCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    // short lived access token 
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
    )

}

userSchema.methods.generateRefreshAccessToken = function () {
    // short lived access token 
    return jwt.sign({
        _id: this._id,
        
    },process.env.REFRESH_TOKEN_SECRET,
    {expiresIn : process.env.REFRESH_TOKEN_EXPIRY}
    )

}

export const User = mongoose.model("User", userSchema)