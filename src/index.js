import dotenv from 'dotenv';
import { app } from "./app.js";
import connectDB from './db/index.js';

// Load .env file
dotenv.config();

// Debug: Check if variables are loaded
// console.log("Loaded ENV Variables:", process.env);



const PORT = process.env.PORT || 3000;



connectDB()
.then(
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
)
.catch((err)=>{
    console.log("mongodb connectjion error : " ,err);
    
    
})


