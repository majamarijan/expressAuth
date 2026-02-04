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
    const user = db_users.find((u) => u.id === decoded.id && u.username === decoded.username);
    if(!user || user.refreshToken !== req.cookies.refreshToken) return res.status(403).send("Forbidden!");
    next();
  });
}

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const db_users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    const user = db_users.find((u) => u.username === username);
    console.log(user);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.json({ url: "/register" });
    }

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
      maxAge: 10 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (e) {
    console.log(e);
  }
});

router.post("/logout", (req, res) => {
  //const refreshToken = req.cookies.refreshToken;
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    res.json({ message: "Logout successful!" });
  }
  // if (refreshToken) {
  //   //remove refreshToken from db
  //   const decoded = jwt.decode(refreshToken);
  //   if (decoded) {
  //     user = db_users.find((u) => u.id !== decoded.id);
  //     delete user.refreshToken;
  //   }
  // }
  // res.clearCookie('refreshToken');
  // delete accessToken from client
});

router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).send("Unauthorized!");
  jwt.verify(refreshToken, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).send("Forbidden!");
    // 1. checkDB
    const db_users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    const storedToken = db_users.find((u) => u.id === decoded.id);
    if (!storedToken) return res.status(401).send("Unauthorized!");
    //2. issue new token
    const accessToken = jwt.sign(
      { id: decoded.id, username: decoded.username },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "5m" },
    );
    const refreshToken = jwt.sign(
      { id: decoded.id },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "10m",
        algorithm: HS256,
      },
    );
    //3. save refresh token in DB
    const user = db_users.find((u) => u.id === decoded.id);
    user.refreshToken = refreshToken;
    db_users.splice(db_users.indexOf(user), 1, user);
    fs.writeFileSync("users.json", JSON.stringify(db_users, null, 2));
    // await db_users.updateOne({id: decoded.id}, {refreshToken});
    //4. send tokens
    res.setHeader(
      "Content-Security-Policy",
      "default 'self'; script-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'self'; frame-src 'self'; object-src 'none'; style-src 'self' 'unsafe-inline';",
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 3 * 60 * 1000, // 2min
    });
    res.json({ accessToken });
  });
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
