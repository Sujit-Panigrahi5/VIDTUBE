
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();




app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        Credential:true
    })
)

console.log(process.env.CORS_ORIGIN);


// common middleware
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"));
app.use(cookieParser());


// import routes 
import  healthcheckRouter  from './routes/healthcheck.routes.js';
import userRouter from './routes/user.routes.js'
import { errorHandler } from './middlewares/error.middlewaares.js';

// routes 

app.use('/api/v1/healthcheck',healthcheckRouter);
app.use('/api/v1/users',userRouter);




// app.use(errorHandler)
export {app};