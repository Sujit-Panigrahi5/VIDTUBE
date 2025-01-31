import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try {
    //    const connectoinInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    const connectoinInstance =  await mongoose.connect(`${process.env.MONGODB_URI}`)


       console.log(`\n MongoDG connected ! DB host :${connectoinInstance.connection.host} `);
       
    } catch (error) {
        console.log("mongoDB connection error ", error);
        process.exit(1);
    }
}

export default connectDB