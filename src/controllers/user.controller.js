
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, username, password } = req.body;

    // validation 
    if (
        [fullName, username, email, password].some((field) => {
            field?.trim() === ""
        })
    ) {
        throw new ApiError(400, "All fields are required");

    }



    // check if user already exists
    const existUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existUser) {
        throw new ApiError(409, "User with email or username already exists");

    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    let coverImage = ""
    if (coverLocalPath) {
        coverImage = await uploadOnCloudinary(coverLocalPath);
    }

    const user =  await User.create(
        {
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
        }
    )

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createUser){
        throw new ApiError(500, "Failed to create user")
    }

    return res
    .status(201)
    .json(new ApiResponse(201,createUser,"User registed successfully"));
})



export {
    registerUser
}
