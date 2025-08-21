// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/studentdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema & Model
const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  department: String,
  marks: Number,
});

const Student = mongoose.model("Student", studentSchema);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// GET all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new student
app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update student
app.put("/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
