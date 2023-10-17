const mongoose = require("mongoose");

const addpersonSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    spoucename: {
      type: String,
    },
    email: {
      type: String,
    },
    contact_no: {
      type: Number,
    },
    address: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    taluk: {
      type: String,
    },
    district: {
      type: String,
    },
    pincode: {
      type: String,
    },
    occupation: {
      type: String,
    },
    dob: {
      type: String,
    },
    age: {
      type: String,
    },
    gender: {
      type: String,
    },
    qualification: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const addperson = mongoose.model("addperson", addpersonSchema);

module.exports = addperson;
