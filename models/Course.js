const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");
const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,

  },
  slug: {
    type: String,
    unique: true,
  },
  thumbnail: {
    type: String,
    default: "../public/images/blog_1.jpg",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

CourseSchema.pre("validate", function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
  next();
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
