"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
    const router = useRouter()
   useEffect(() => {
    const gotoLogin = async () => {
      try {
          router.push('/login')
      } catch (error) {
        console.error('Navigation Error:', error);
      }
    };

    gotoLogin();
  }, []);
 
    return (
      <div className="container">
  <h1>Welcome</h1>
</div>

    )
}
