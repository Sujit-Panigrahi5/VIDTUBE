import mongoose ,{Schema} from "mongoose";

/*
 id string pk 
  owner objectId users
  content string 
  createdAt Date
  updatedAt Date
  */

const  tweetSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})




export const Tweet = mongoose.model("Tweet",tweetSchema);
