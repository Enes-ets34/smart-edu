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
  created_at: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
    unique: true,
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
