import { checkValidateData } from "../utils/validate";
import Header from "./Header";
import { useState,useRef } from "react";


function Login() {
  const [isSignIned, setIsSignIned] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const email=useRef(null)
  const password=useRef(null)

  const handleFromSubmit =()=>{
   
      const message = checkValidateData(email.current.value,password.current.value )
      setErrorMessage(message)
      
      
  }

  return (
    <div className="relative w-screen h-screen login flex justify-center items-center">
      <Header />
      <form onClick={(e)=>e.preventDefault()} className="flex flex-col justify-center w-[400px] text-white h-[60vh] absolute px-12 py-0 bg-black opacity-90 ">
        <h1 className="font-medium text-2xl mb-4 pl-2">{isSignIned?"Sign In":
          "Sign Up"}</h1>
          {!isSignIned && <input className="py-2 my-2 border-2 px-4 bg-white text-black w-full font-medium"  placeholder="User Name"/>}
        <input ref={email} type="email" placeholder="Email" className="py-2 my-2 border-2 px-4 bg-white text-black w-full font-medium" />
        <input ref={password} type="Password" placeholder="Password" className="py-2 my-2 border-2 px-4 bg-white text-black w-full font-medium " />
        <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
        <button onClick={handleFromSubmit} type="submit" className="py-2 my-4 cursor-pointer bg-red-700">{isSignIned?"Sign In":"Sign Up"}</button>

       { isSignIned && <p className="text-blue-500 cursor-pointer text-center mb-5">Forgot Password?</p> }

        <p onClick={() => { setIsSignIned(!isSignIned); }} className="cursor-pointer">{isSignIned ? "New to Netflix? Sign Up Now" : "Already a member? Sign In"}</p>
      </form>
    </div>
  );
}

export default Login;
