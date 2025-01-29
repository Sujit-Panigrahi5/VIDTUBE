import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

/*
id string pk 
  content string 
  owner objectId users
  video objectId videos
  createdAt Date
  updatedAt Date
*/

const commentSchema = new Schema(
    {
        content : {
            type:String,
            required:true
        },
        owner:{
            type: Schema.Types.ObjectId ,
            ref:"User"
        },
        video:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    },
    {
        timestamps:true
    }
)

commentSchema.plugin(mongooseAggregatePaginate)
export const Comment = mongoose.model("Comment",commentSchema);
