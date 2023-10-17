const router = require("express").Router();
const addperson = require("../models/addPerson");
const user = require("../models/User");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/images`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const maxSize = 1 * 1000 * 1000;

const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
});

router.get("/", (req, res) => {
  res.send("addperson router is working");
});

router.post("/person", upload.single("img"), async (req, res) => {
  const personData = req.body;
  const { filename } = req.file;
  const person = new addperson({
    ...personData,
    img: filename,
  });

  try {
    const savedPerson = await person.save();
    res.json(savedPerson);
  } catch (error) {
    res.status(500).json({ error: "Error saving person data." });
  }
});

router.get("/data", async (req, res) => {
  const data = await addperson.find(req._id);
  res.json(data);
});

router.post("/search", async (req, res) => {
  const data = await addperson.findOne({ contact_no: req.body.contact_no });
  if (!data) {
    return res.json("No user found ");
  } else {
    return res.json(data);
  }
});

module.exports = router;
