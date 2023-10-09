import mongoose from "mongoose";

const studentsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide a emaile"],
    unique: true,
  },
  rollNo: {
    type: String,
    required: [true, "Please provide a rollno"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  batch: {
    type: String,
    required: [true, "Please provide a batch"],
  },
  department: {
    type: String,
    required: [true, "Please provide a department"],
  },
})

export default mongoose.models.students_data || mongoose.model("students_data", studentsSchema);

 