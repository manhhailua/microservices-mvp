const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const USERS = [
  {
    id: 1,
    email: "admin@example.com",
    username: "admin",
    password: "123456",
  },
  {
    id: 2,
    email: "user@example.com",
    username: "user",
    password: "123456",
  },
];

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiDescription Login with username and password. USERS are hardcoded in the code.
 */
router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  console.log("login with:", username, password);
  const user = USERS.find(
    (u) =>
      (u.username === username || u.email === username) &&
      u.password === password
  );
  if (user) {
    console.log("user found. generating jwt...");
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.send({ access_token: token });
  }
  return res.status(401).send({ error: "Invalid username or password" });
});

/**
 * @api {post} /auth/introspect Introspect
 * @apiName Introspect
 * @apiDescription Introspect token.
 */
router.post("/introspect", function (req, res, next) {
  const { token } = req.body;
  console.log("introspecting:", token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("verified & decoded:", decoded);
      return res.send({
        ...decoded,
        active: true,
      });
    } catch (err) {
      return res.status(401).send({ error: "Invalid token" });
    }
  }
  return res.status(401).send({ error: "Token is missing" });
});

module.exports = router;
