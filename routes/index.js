const router = require("express").Router();
const userRouter = require("./user");
const personRouter = require("./addperson");

router.use("/user", userRouter);
router.use("/add", personRouter);

module.exports = router;
