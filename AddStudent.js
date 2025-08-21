import React, { useState } from "react";
import axios from "axios";

function AddStudent({ onAdd }) {
  const [student, setStudent] = useState({
    name: "", rollNo: "", department: "", marks: ""
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/students", student);
    onAdd(res.data); // update parent
    setStudent({ name: "", rollNo: "", department: "", marks: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={student.name} onChange={handleChange} placeholder="Name" />
      <input name="rollNo" value={student.rollNo} onChange={handleChange} placeholder="Roll No" />
      <input name="department" value={student.department} onChange={handleChange} placeholder="Department" />
      <input name="marks" value={student.marks} onChange={handleChange} placeholder="Marks" />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudent;
