import mongoose,{Schema} from "mongoose";

/*
id string pk 
  comments objectId comments 
  createdAt Date
  updatedAt Date
  video objectId videos
  likedBy objectId users
  tweet objectId tweets
  */

const likeSchema = new Schema({
    Comments:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    },
    video:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    likeBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    tweet:{
        type:Schema.Types.ObjectId,
        ref:"Tweet"
    }

},
{
    timestamps:true
}
)


export const Like = mongoose.model('Like',likeSchema);
