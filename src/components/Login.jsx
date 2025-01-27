import Header from "./Header";
import { useState } from "react";

function Login() {
  const [isSignIned, setIsSignIned] = useState(true);
  // const [rememberMe, setRememberMe] = useState(false); // State for Remember Me checkbox

  return (
    <div className="relative w-screen h-screen login flex justify-center items-center">
      <Header />
      <form onClick={(e) => { e.preventDefault(false); }} className="flex flex-col justify-center w-[400px] text-white h-[60vh] absolute px-12 py-0 bg-black opacity-90 ">
        <h1 className="font-medium text-2xl mb-4 pl-2">{isSignIned?"Sign In":
          "Sign Up"}</h1>
          {!isSignIned && <input className="py-2 my-2 border-2 px-4 bg-white text-black w-full font-medium"  placeholder="User Name"/>}
        <input type="email" placeholder="Email" className="py-2 my-2 border-2 px-4 bg-white text-black w-full font-medium" />
        <input type="Password" placeholder="Password" className="py-2 my-2 border-2 px-4 bg-white text-black w-full font-medium " />
        <button type="submit" className="py-2 my-4 cursor-pointer bg-red-700">{isSignIned?"Sign In":"Sign Up"}</button>

       { isSignIned && <p className="text-blue-500 cursor-pointer text-center mb-5">Forgot Password?</p> }

        {/* <div className="flex items-center my-2">
          <input 
            type="checkbox" 
            id="rememberMe" 
            className="mr-2" 
            checked={rememberMe} 
            // Toggle checkbox state
          />
          <label onClick={() => setRememberMe(!rememberMe)}  htmlFor="rememberMe" className="text-white">Remember Me</label>
        </div> */}

       

        <p onClick={() => { setIsSignIned(!isSignIned); }} className="cursor-pointer">{isSignIned ? "New to Netflix? Sign Up Now" : "Already a member? Sign In"}</p>
      </form>
    </div>
  );
}

export default Login;
