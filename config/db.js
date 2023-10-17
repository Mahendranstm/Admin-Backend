const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

const connetDB = async () => {
  try {
    const con = await mongoose.connect(url);
    console.log(`DB Connected: ${con.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connetDB;
