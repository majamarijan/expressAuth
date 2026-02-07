import express from 'express';
import userRouter from './users.js';
import loginRouter from './login.js';
import mainRouter from './mainRoutes.js';
import path from 'path';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const app = express();

app.use(favicon(path.join(import.meta.dirname,'public', 'logo.ico')));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}));
app.use('/api/hello', (req,res)=> {
	res.json({message: 'Hello from express app.'})
})
app.use((err,req,res,next)=>{
	res.status(500).send("Server error!");
});

app.listen(4000, ()=> {
	console.log("Server is listening....");
})


