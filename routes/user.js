const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", (req, res) => {
  res.send("user router is working ");
});

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      username: req.body.username,
      password: passwordHash,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        );

        const { password, ...info } = user._doc;

        return res.status(200).json({ ...info, token });
      } else {
        return res.status(404).json({ msg: "Wrong password" });
      }
    } else {
      res.status(404).json({ msg: "No user found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });

//     //check valid user

//     if (!user) {
//       return res.json({ msg: "user is not found " });
//     }
//     const match = await bcrypt.compare(req.body.password, user.password);
//     if (match) {
//       const token = await jwt.sign(
//         { userId: user._id },
//         process.env.SECRET_KEY
//       );
//       return res.json({ token });
//     } else {
//       return res.json({ msg: "wrong password" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/verify/:token", (req, res) => {
  try {
    const token = jwt.verify(
      req.params.token,
      process.env.SECRET_KEY,
      async (err, decoded) => {
        if (err) {
          return res.status(401).json({ msg: "Is not authorized" });
        }

        const id = decoded.id;
        const user = await User.findByIdAndUpdate(
          id,
          { isAdmin: true },
          { new: true }
        );
        res.json(user);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
