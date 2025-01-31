
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import { User } from "../models/user.models.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"



const generateAccessAndRefereshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        // user is existence
        if (!user) {
            throw new ApiError('201', "user is not exist ")

        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshAccessToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500,"something went wrong while genereing access and refresh tokens ");
    }

}




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
    const existUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    console.log(existUser)
    if (existUser) {

        throw new ApiError(409, "User with email or username already exists");

    }

    console.warn(req.files);

    const avatarLocalPath = req.files?.avatar?.[0]?.path
    const coverLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    // const avatar = await uploadOnCloudinary(avatarLocalPath);

    // let coverImage = ""
    // if (coverLocalPath) {
    //     coverImage = await uploadOnCloudinary(coverLocalPath);
    // }

    let avatar;
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath);
        console.log("uploaded avatar ", avatar);

    } catch (error) {
        console.log("Error uploading avatar to cloudinary", error);
        throw new ApiError(500, "faild to upload avatar")

    }

    let coverImage;
    try {
        coverImage = await uploadOnCloudinary(coverLocalPath);
        console.log("uploaded coverImage ", coverImage);

    } catch (error) {
        console.log("Error uploading coverImage to cloudinary", error);
        throw new ApiError(500, "faild to upload coverImage")

    }

    try {
        const user = await User.create(
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

        if (!createUser) {
            throw new ApiError(500, "Failed to create user")
        }

        return res
            .status(201)
            .json(new ApiResponse(201, createUser, "User registed successfully"));
    } catch (error) {
        console.log("User Cration failed");
        if (avatar) {
            await deleteFromCloudinary(avatar.public_id);
        }
        if (coverImage) {
            await deleteFromCloudinary(coverImage.public_id)
        }

        throw new ApiError(500, "Something went wrong while registering a user and images were deleted ")
    }
})

const loginUser = asyncHandler (async(req,res)=>{
    // get data from body 

    const {email,username,password }= req.body;

    // validation 
    if(!email) {
        throw new ApiError(400,"Email is required");

    }

    if(!password){
        throw new ApiError(400,"Password is required");
    }
    
    if(!username) {
        throw new ApiError(400,"Username is required");
    }


    const user = await User.findOne({
        $or: [{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"User not found");
    }

    // validate password 
  const isPasswodValid=  await user.isPasswodCorrect(password);


  if(!isPasswodValid){
    throw new ApiError(401,"Invalid password");
    }

    const {accessToken,refreshToken} = await 
    generateAccessAndRefereshToken(user._id);

    const loggedInUser = await User.findById(user._id)
      .select("-password -refreshToken");

    if(!loggedInUser){
        throw ApiError('404',"user is not there!!!");
    }

    const options = {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production"
    }

    return res
      .status(200)
      .cookie("accessToken",accessToken,options)
      .cookie("refreshToken",refreshToken,options)
      .json(new ApiResponse(
        200,
        {user:loggedInUser,accessToken,refreshToken},
        "User logged in successfully"
    ));

})

const logoutUser = asyncHandler (async(req,res)=>{
    await User.findByIdAndUpdate(
        // TODO:need to come back here after middleware 
    )
})

const refreshAccessToken = asyncHandler(async (req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError('401',"Refresh token is required");

    }

    try {
       const decodedToken =  jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

       const user= await User.findById(decodedToken?._id);

       if(!user){
        throw new ApiError('401',"Invalid refresh token"); 
       }

       if(incomingRefreshToken !== user?.refreshToken) {
        
        throw new ApiError('401',"Invalid refresh token");
        
       }

       const options= {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production"
       }

       const {accessToken,refreshToken:newRefreshToken}=await generateAccessAndRefereshToken(user._id);

       return res
          .status(200)
          .cookie("accessToken",accessToken,options)
          .cookie("refershToken",newRefreshToken,options)
          .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken:newRefreshToken
                },
                "Access token refreshed successfully"
            )
          );
    } catch (error) {
        throw new ApiError(500,"Somenthing went wrong while refreshing access  token");
    }

})


export {
    registerUser,
    loginUser,
    refreshAccessToken
}
