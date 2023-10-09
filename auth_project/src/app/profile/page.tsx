"use client";
import axios from "axios";
import {useState,useEffect} from "react";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
    const router = useRouter()
    const [details, setDetails] = useState({
        email:"",
        rollNo:"",
        name:"",
        batch: "",
        department:"",

    })
    const onRegistration = async () => {
        try {
            await axios.post("/api/users/profile", details);
            router.push('/student');
            
        } catch (error:any) {
            console.log("Registration failed", error.message);
        }
    }
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
        const res = await axios.get('/api/users/registration_varification');
        if (res.data.student) {
          router.push('/student');
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudents();
  }, []);
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get('/api/users/varification');
        setDetails((prevDetails) => ({
          ...prevDetails,
          email: response.data.email,
        }));
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };

    fetchEmail();
  }, []);
    return (
      <div className="container">
  <h1>Fill Your Details</h1>
  <hr />
  <label htmlFor="email" className="label-field">Email</label>
  <p>{details.email}</p>
  <hr />
  <label htmlFor="rollNo" className="label-field">Roll No</label> 
  <input
    id="rollNo"
    type="text"
    className="input-field" 
    value={details.rollNo}
    onChange={(e) => setDetails({ ...details, rollNo: e.target.value })}
    placeholder="Roll No"
  />
  <hr />
  <label htmlFor="name" className="label-field">Name</label>
  <input
    id="name"
    type="text"
    className="input-field"
    value={details.name}
    onChange={(e) => setDetails({ ...details, name: e.target.value })}
    placeholder="Name"
  />
  <hr />
  <label htmlFor="batch" className="label-field">Batch</label>
  <input
    id="batch"
    type="text"
    className="input-field"
    value={details.batch}
    onChange={(e) => setDetails({ ...details, batch: e.target.value })}
    placeholder="Batch"
  />
  <hr />
  <label htmlFor="department" className="label-field">Department</label> 
  <input
    id="department"
    type="text"
    className="input-field" 
    value={details.department}
    onChange={(e) => setDetails({ ...details, department: e.target.value })}
    placeholder="Department"
  />
  <hr />
  <button
    onClick={onRegistration}
    className="active-button"
  >
    Registration
  </button>
  <hr />
  <button
    onClick={logout}
    className="active-button" 
  >Logout
  </button>
</div>

    )
}
