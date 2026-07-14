const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    regNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    alternativeMobile: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    courses: [
      {
        type: String,
      },
    ],

    address: {
      type: String,
      required: true,
      trim: true,
    },

    programmingLanguage: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);