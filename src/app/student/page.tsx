"use client";
import  { useEffect, useState } from 'react';
import axios from 'axios';
import {useRouter} from "next/navigation";

export default function StudentPage() {
  const router = useRouter(); 
  const [students, setStudents] = useState([]);
   const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
        }
  }

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/users/student');
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
   <div className="student-details-container">
  <h1>Student Details</h1>
  <table className="student-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Roll Number</th>
        <th>Batch</th>
        <th>Department</th>
      </tr>
    </thead>
    <tbody>
      {students.map((student: any) => (
        <tr key={student._id}>
          <td>{student.name}</td>
          <td>{student.email}</td>
          <td>{student.rollNo}</td>
          <td>{student.batch}</td>
          <td>{student.department}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <button
    onClick={logout}
    className="logout-button"
  >
    Logout
  </button>
</div>

  );
}
