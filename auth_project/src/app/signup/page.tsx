"use client";
import Link from "next/link";
import React,{ useState,useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();  // creating instance of router object
    const [user, setUser] =useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] =useState(false);
    const onSignup = async () => {
        try {
            await axios.post("/api/users/signup", user);
            router.push("/login");    
        } catch (error:any) {
            console.log("Signup failed", error.message);
        }
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
   <div className="container">
  <h1>Signup</h1>
  <hr />
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="text"    
    className="input-field"
    value={user.email}
    onChange={(event) => setUser({ ...user, email: event.target.value })}
    placeholder="Email"
  />
  <hr />
  <label htmlFor="password">Password</label>
  <input
    id="password"
    type="password"
    className="input-field"
    value={user.password}
    onChange={(event) => setUser({ ...user, password: event.target.value })}
    placeholder="Password"
  />
  <hr />
  <button
    onClick={onSignup}
    className={buttonDisabled ? 'disabled-button' : 'active-button'}
  >
    {buttonDisabled ? 'Please fill all the details' : 'Signup'}
  </button>
  <Link href="/login">Visit Login Page</Link>
</div>

    )

}