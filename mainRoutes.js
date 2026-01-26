import express from 'express';
const router = express.Router();
import path from 'path';

router.get('/about',(req,res)=> {
	res.sendFile(path.resolve('public/about.html'));
});
router.get('/login', (req,res)=> {
	res.sendFile(path.resolve('public/login.html'));
});
router.get('/dashboard', (req,res)=> {
	res.sendFile(path.resolve('public/dashboard.html'));
});
router.get('/register',(req,res)=> {
	res.sendFile(path.resolve('public/register.html'));
});
router.get('/notFound', (req,res)=> {
	res.status(404).sendFile(path.resolve('public/404.html'));
});


export default router;

