import mongoose , {Schema} from "mongoose";
import { User } from "./user.models";

/*
id string pk 
  name string 
  description string 
  createdAt Date
  updatedAt Date
  viedos objectId[] viedos
  owner objectId users
*/

const playlistSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    viedos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

export const Playlist= mongoose.model("Playlist",playlistSchema);