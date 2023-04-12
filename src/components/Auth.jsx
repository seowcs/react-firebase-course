import { auth, googleProvider } from "../config/firebase"
//auth method
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email,password);
      console.log("User created with email!");
    } catch (error) {
      console.log(error);
    }
  };
  
    const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User created with google!");
    } catch (error) {
      console.log(error);
    }
  };
  
      const logout = async () => {
    try {
      await signOut(auth);
      console.log("Signed out!");
    } catch (error) {
      console.log(error);
    }
   };

  return (
      <div>
      <input onChange={(e)=>setEmail(e.target.value)}  placeholder="Email..."/>
      <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password..." />
      <button onClick={signIn}>Sign In</button>

      <button onClick={signInWithGoogle}>Sign In With Google</button>

      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Auth