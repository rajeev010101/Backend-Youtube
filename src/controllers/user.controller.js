import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uplaodOncloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) =>{
  // get user detail from frontend

  const {fullname, email, username, password}= req.body
  console.log("email: ", email);
  if (
    [fullname, email, username, password].some((field) => field?. trim() === "")
  ){
    throw new ApiError(400, "All field are required")
  }

  const existedUser = User.findOne({
    $or: [{username}, {email}]
  })

  if (existedUser){
    throw new ApiError(409, "User with email or username already exists")
  }

   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocal = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
   }

    const avatar = await uplaodOncloudinary(avatarLocalPath)
    const coverImage =  await uplaodOncloudinary(coverImageLocal)

    if(!avatar){
      throw new ApiError(400, "Avatar file is required")
    }

   const user = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )

    if(!createdUser){
      throw new ApiError(500, " something went wrong while register the user")
    }

    return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

export {
    registerUser,

}