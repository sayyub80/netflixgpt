import { checkValidateData } from "../utils/validate";
import Header from "./Header";
import { useState, useRef } from "react";
import {  signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { addUser } from "../utils/userSlice";


function Login() {
  const navigate=useNavigate()
  const dispatch =useDispatch()
  const [iSignInForm, setIsSignIned] = useState(true);
  const[errorMessage,setErrorMessage]=useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name=useRef(null);

  const handleFromSubmit =async () => {
 
    const message = checkValidateData(email.current.value, password.current.value);
    setErrorMessage(message)
    if(message) return
    //sign in signup
    if(iSignInForm){
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("LogIn Successfully")
        console.log(user);
        navigate('/browse')
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage)
      });
    }
    else{
     //sign up
     createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
     .then((userCredential) => {
    // Signed up 
    const user = userCredential.user; 
    updateProfile(user, {
      displayName: name.current.value,
      photoURL: "https://www.bing.com/th?id=OIP.A9q7aADqLP1yfT-x9uNX1gAAAA&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    }).then(() => {
       const {uid,email,displayName,photoURL} = auth.currentUser;
       dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
       navigate('/browse')
    }).catch((error) => {
      setErrorMessage(error.message)
    });
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage)
    // ..
  });
   }


  };

  return (
    <>
      <div className="bg-black w-full h-screen absolute opacity-40"></div> 
     <div className=" w-screen h-screen login flex justify-center items-center">
      <Header />
      <form onClick={(e) => e.preventDefault()} className="flex flex-col justify-center w-[400px] text-white h-[60vh] absolute px-12 py-0 bg-black opacity-80 ">
        <h1 className="font-medium text-2xl mb-4 pl-2">{iSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!iSignInForm && <input ref={name} className="py-2 my-2 border-2 px-4 bg-white text-black w-full font-medium" placeholder="User Name" />}
        <input ref={email} type="email" placeholder="Email" className="py-2 my-2 border-2 px-4 bg-white text-black w-full font-medium" />
        <input ref={password} type="Password" placeholder="Password" className="py-2 my-2 border-2 px-4 bg-white text-black w-full font-medium " />
        <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
        <button onClick={handleFromSubmit} type="submit" className="py-2 my-4 cursor-pointer bg-red-700">{iSignInForm ? "Sign In" : "Sign Up"}</button>

        {iSignInForm && <p className="text-blue-500 cursor-pointer text-center mb-5">Forgot Password?</p>}

        <p onClick={() => { setIsSignIned(!iSignInForm); }} className="cursor-pointer">{iSignInForm ? "New to Netflix? Sign Up Now" : "Already a member? Sign In"}</p>
      </form>
    </div>
    </>
   
  );
}

export default Login;
