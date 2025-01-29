import mongoose , {Schema} from "mongoose";


/*id string pk 
  subscriber objectId users
  channel objectId users
  createdAt Date
  updatedAt Date
  */


const subscriptionSchema= new Schema({
    subscriber:{
        type: Schema.Types.ObjectId,    // one who is Subscribing 
        ref:"User"
    }, 
    channel:{
        type:Schema.Types.ObjectId, // one to whom "subscriber" is Subscribing
        ref:"User"
    }
    
},
{
    timestamps:true
})


export const Subscription = mongoose.model("Subscription",subscriptionSchema);
