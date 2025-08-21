import React, { useState } from "react";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";

function App() {
  const [students, setStudents] = useState([]);

  const handleAdd = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div>
      <h1>Student Management</h1>
      <AddStudent onAdd={handleAdd} />
      <StudentList />
    </div>
  );
}

export default App;
