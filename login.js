import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";
const router = express.Router();

// const db_users = [
// 	{id: 1,
// 	username: 'alice55',
// 	password: bcrypt.hashSync('password123', 8)
// 	}
// ];

function authMiddelware(req, res, next) {
  //verify token in Authorization header Bearer {token}
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; //remove "Bearer"
  console.log("using auth middleware");

  if (!token) return res.status(401).json({ message: "Token required!" });
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).res.send("Forbidden!");
    req.user = decoded;
    const db_users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    const user = db_users.find(
      (u) => u.id === decoded.id && u.username === decoded.username,
    );
    if (!user || user.refreshToken !== req.cookies.refreshToken)
      return res.status(403).send("Forbidden!");
    next();
  });
}

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const db_users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    const user = db_users.find((u) => u.username === username);
    console.log('user found in db, /login');

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.json({ url: "/register" });
    }

    // accessToken paired with refreshToken
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1m" },
    );
    // accessToken expires, then refreshToken is used in /refresh
    // server verify and generate new accessToken
    // when refreshToken expires, user will be logged out
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: "3m",
      },
    );
    user.refreshToken = refreshToken;
    db_users.splice(db_users.indexOf(user), 1, user);
    fs.writeFileSync("users.json", JSON.stringify(db_users, null, 2));
    console.log("Created access token and refresh token.");
    res.setHeader(
      "Content-Security-Policy",
      "default 'self'; script-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'self'; frame-src 'self'; object-src 'none'; style-src 'self' 'unsafe-inline';",
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 3 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (e) {
    console.log(e);
  }
});

router.get("/logout", authMiddelware, async (req, res) => {
  //remove refreshToken from db
  try {
    const decoded = jwt.decode(req.cookies.refreshToken);
    console.log(decoded);
    if (decoded) {
      const db_users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
      const user = db_users.find((u) => u.id === decoded.id);
      delete user.refreshToken;
      db_users.splice(db_users.indexOf(user), 1, user);
      fs.writeFileSync("users.json", JSON.stringify(db_users, null, 2));
    }
    res.clearCookie("refreshToken");
    res.json({ message: "Logout successful!" });
  } catch (e) {
    console.log(e);
  }
});

router.get("/refresh", async (req, res) => {
  console.log('refresh route');
  try{
    const {refreshToken} = req.cookies;
    if(!refreshToken) return res.status(401).send("No token!");
    //check if token exists in DB
    const db_users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    const token = db_users.find((u) => u.refreshToken === refreshToken);
    if(!token) return res.status(403).send("Forbidden!");
    //verify token
    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
      if(err) return res.status(403).send("Forbidden!");
      const user = db_users.find((u) => u.id === decoded.id);
      if(!user || user.refreshToken !== refreshToken) return res.status(403).send("Forbidden!");
      const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "1m" },
      );
      const newRefreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_SECRET_KEY,
        {
          expiresIn: "3m",
        });
      res.setHeader(
        "Content-Security-Policy",
        "default 'self'; script-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'self'; frame-src 'self'; object-src 'none'; style-src 'self' 'unsafe-inline';",
      );
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 3 * 60 * 1000,
      });
      res.json({ accessToken });
    })

  }catch(e){
    console.log(e);
  }
});

router.get("/", authMiddelware);

router.post("/register", async (req, res) => {
  //LOCALSTORAGE and COOKIES EXAMPLE
  const { username, password } = req.body;
  try {
    const db_users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    const user = db_users.find((u) => u.username === username);
    console.log(user);
    if (user) return res.json({ url: "/login" });
    //register new user
    db_users.push({
      id: db_users.length + 1,
      username,
      password: bcrypt.hashSync(password, 8),
    });
    fs.writeFileSync("users.json", JSON.stringify(db_users, null, 2));
    // accessToken paired with refreshToken
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "5m" },
    );
    // accessToken expires, then refreshToken is used in /refresh
    // server verify and generate new accessToken
    // when refreshToken expires, user will be logged out
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: "10m",
        algorithm: HS256,
      },
    );

    //save refreshToken in DB
    user.refreshToken = refreshToken;
    db_users.splice(db_users.indexOf(user), 1, user);
    fs.writeFileSync("users.json", JSON.stringify(db_users, null, 2));
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 3 * 60 * 1000, // 3min
    });
    res.json({ accessToken });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/user", authMiddelware, (req, res) => {
  res.json({ ...req.user });
});
router.get("/data", authMiddelware, (req, res) => {
  res.json({
    message: "Your private data: ",
    stats: {
      lessonsCompleted: 5,
      badgesEarned: 3,
    },
  });
});

export default router;
