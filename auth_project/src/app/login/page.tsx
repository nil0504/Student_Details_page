"use client";
import Link from "next/link";
import  {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] =useState({
        email: "",
        password: "",   
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const onLogin = async () => {
        try {
            await axios.post("/api/users/login", user);
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
        }
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);
    return (
    <div className="container">
  <h1>Login</h1>
  <hr />
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="text"
    className="input-field" // Reuse the CSS class
    value={user.email}
    onChange={(e) => setUser({ ...user, email: e.target.value })}
    placeholder="Email"
  />
  <label htmlFor="password">Password</label>
  <input
    id="password"
    type="password"
    className="input-field" // Reuse the CSS class
    value={user.password}
    onChange={(e) => setUser({ ...user, password: e.target.value })}
    placeholder="Password"
  />
  <button
    onClick={onLogin}
    className={buttonDisabled ? 'disabled-button' : 'active-button'} // Reuse the CSS classes
  >
    {buttonDisabled ? 'Enter Your Details' : 'Login'}
  </button>
  <Link href="/signup">Visit Signup Page</Link>
</div>

    )
}