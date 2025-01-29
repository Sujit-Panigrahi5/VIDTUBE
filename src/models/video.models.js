import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

/*
id string pk 
  videoFile string 
  thumbnil string 
  owner ObjectId users
  title string 
  description string 
  duration number 
  views number
  isPublished boolean 
  createdAt Date 
  updatedAt Date
*/
const videoSchema = new Schema({
    videoFile:{
        type:String, // Cloudinary url
        required:true
    },
    thumbnil:{
        type:String, // Cloudinary url
        required:true
    },
    title:{
        type:String , 
        required:true
    },
    description:{
        type:String ,
        required:true
    },
    views:{
        type:Number ,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean ,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video',videoSchema)