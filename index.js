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
//console.log(process.env.TOKEN_SECRET_KEY);
app.use(favicon(path.join(import.meta.dirname,'public', 'logo.ico')));
app.use(express.static(path.join(import.meta.dirname,'public')));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use((req,res,next)=> {
	console.log('Running');
	next();
});
app.use('/', mainRouter);
app.use('/secure', loginRouter);
app.use('/users', userRouter);
app.post('/data',(req,res)=> {
	res.send("You sent ",JSON.stringify(req.body));
});
app.use((err,req,res,next)=>{
	res.status(500).send("Server error!");
});

app.listen(4000, ()=> {
	console.log("Server is listening....");
})


