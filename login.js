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
 //verify token in Authorization header Bearer {token}
	const authHeader = req.headers.authorization;
	const refreshToken = req.cookies.refreshToken;
	const token = authHeader && authHeader.split(' ')[1];//remove "Bearer"
	
	if(!token) return res.status(401).json({message: 'Token required!'});
	jwt.verify(token,process.env.TOKEN_SECRET_KEY, (err, decoded)=> {
		if(err) return res.status(403).res.send('Forbidden!');
		req.user = decoded;
		next();
	});
};

router.post('/login', (req,res)=> {
	const {username, password} = req.body;
	const user = db_users.find(u => u.username === username);
	
	if(!user || !bcrypt.compareSync(password, user.password)) {
		return res.json({url:'/register'});
	}
	
	// accessToken paired with refreshToken
	console.log('Creating access token and refresh token.');
	const accessToken = jwt.sign({id:user.id, username:user.username}, process.env.TOKEN_SECRET_KEY, 
		{expiresIn: '1m',
		algorithm: HS256});
	// accessToken expires, then refreshToken is used in /refresh
	// server verify and generate new accessToken
	// when refreshToken expires, user will be logged out
	const refreshToken = jwt.sign({id:user.id}, process.env.TOKEN_SECRET_KEY, {
		expiresIn: '1d',
		algorithm: HS256
	});
	res.setHeader('Content-Security-Policy', 'default-src \'self\'\nstyle-src \'self\' \'unsafe-inline\'\nscript-src \'self\' \'unsafe-inline\'\nimg-src \'self\'\nconnect-src \'self\'\nframe-src \'self\'');
	res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 2*60*1000});
	res.json({accessToken, refreshToken});
});

router.post('/logout', (req,res)=> {
	const refreshToken = req.cookies.refreshToken;
	if (refreshToken) {
    //remove refreshToken from db
    const decoded = jwt.decode(refreshToken);
    if (decoded) {
      user = db_users.find((u) => u.id !== decoded.id);
      delete user.refreshToken;
    }
  }
	res.clearCookie('refreshToken');
	// delete accessToken from client
	res.json({message: 'Logout successful!'});
})

router.post('/refresh', (req,res)=> {
	const refreshToken = req.cookies.refreshToken;
	if(!refreshToken) return res.status(401).send('Unauthorized!');
	jwt.verify(refreshToken, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).send("Forbidden!");
		// 1. checkDB
		const storedToken = db_users.find(u => u.id === decoded.id);
		if(!storedToken) return res.status(401).send('Unauthorized!');
		//2. issue new token
    const accessToken = jwt.sign(
      { id: decoded.id, username: decoded.username },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1m" },
    );
		const refreshToken = jwt.sign({ id: decoded.id }, process.env.TOKEN_SECRET_KEY, {
			expiresIn: "1d",
			algorithm: HS256
		});
		//3. save refresh token in DB
		// await db_users.updateOne({id: decoded.id}, {refreshToken});
		//4. send tokens
		res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'\nstyle-src 'self' 'unsafe-inline'\nscript-src 'self' 'unsafe-inline'\nimg-src 'self'\nconnect-src 'self'\nframe-src 'self'",
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 2 * 60 * 1000,// 2min
    }); 
    res.json({ accessToken });
  });
})

router.get('/', authMiddelware);

router.post('/register', (req, res) => {
	//LOCALSTORAGE and COOKIES EXAMPLE
  const { username, password } = req.body;
  const user = db_users.find((u) => u.username === username);
  if (user) return res.json({ url: "/login" });
  db_users.push({ id: db_users.length + 1, username, password });
  // accessToken paired with refreshToken
  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: "1m" },
  );
  // accessToken expires, then refreshToken is used in /refresh
  // server verify and generate new accessToken
  // when refreshToken expires, user will be logged out
  const refreshToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "1d",
    algorithm: HS256,
  });
	res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 2 * 60 * 1000, // 2min
  });
  res.json({ accessToken });
});

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
