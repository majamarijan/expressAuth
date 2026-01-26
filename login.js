import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const router = express.Router();


const db_users = [
	{id: 1,
	username: 'alice55',
	password: bcrypt.hashSync('password123', 8)
	}
];

function authMiddelware(req,res,next){
//check if clent token exists in Authorization headers - Bearer token
	const authHeader = req.headers.authorization;
	console.log(authHeader);
	if(!authHeader) return res.status(403).send('Forbidden');
	//extract token string
	const token = authHeader.split(' ')[1];//remove "Bearer"
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
		console.log(`decoded ${JSON.stringify(decoded)}`)
		req.user = decoded;
		next();
	}catch (err){
		res.status(401).send('Invalid or expired token Back to <a href="/">Home</a>');
	}
};

router.post('/login', (req,res)=> {
	const {username, password} = req.body;
	const user = db_users.find(u => u.username === username);
	
	if(!user || !bcrypt.compareSync(password, user.password)) {
		return res.json({url:'/register'});
	}
	
	//create token for existent user
	console.log('user OK');
	const token = jwt.sign({id:user.id, username:user.username}, process.env.TOKEN_SECRET_KEY, {expiresIn: '1m'});
		res.json({token});
});

router.get('/', authMiddelware);

router.get('/user', authMiddelware, (req,res)=>{
	res.json({...req.user});
});
router.get('/data', authMiddelware, (req,res)=> {
	res.json({
		message: "Your private data: ",
		stats: {
			lessonsCompleted: 5,
			badgesEarned: 3
		}
	})
});

export default router;
