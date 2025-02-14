import { checkValidateData } from "../utils/validate";
import Header from "./Header";
import { useState, useRef } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { avatarLogo } from "../utils/constants";
import {IoEye, IoEyeOff } from "react-icons/io5";



function LoginUpdated() {
  const dispatch = useDispatch();
  const [iSignInForm, setIsSignIned] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleFromSubmit = async () => {
    const message = checkValidateData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    // Sign in or sign up
    if (iSignInForm) {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("LogIn Successfully");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign up
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: avatarLogo
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="bg-black w-full h-screen absolute opacity-40"></div>
      <div className="w-screen h-screen login flex justify-center items-center">
        <Header />
        <form onClick={(e) => e.preventDefault()} className="flex flex-col justify-center md:w-[400px] text-white h-[60vh] absolute px-12 py-0 bg-black opacity-80 ">
          <h1 className="font-medium text-2xl mb-4 pl-2">{iSignInForm ? "Sign In" : "Sign Up"}</h1>
          {!iSignInForm && <input ref={name} className="py-2 my-2 border-2 px-4 bg-white text-black w-full font-medium" placeholder="User Name" />}
          <input ref={email} type="email" placeholder="Email" className="py-2 my-2 border-2 px-4 bg-white text-black w-full font-medium" />
          <div className='relative'>
          <input ref={password} type={showPassword ? 'text' : 'password'} placeholder="Password" className="py-2 my-2 border-2 px-4 bg-white text-black w-full font-medium " />
          <button type="button" onClick={togglePasswordVisibility} className="text-black absolute cursor-pointer right-2 top-6 ">
            {showPassword ? <IoEye /> : <IoEyeOff />}
          </button>
          </div>
          <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
          <button onClick={handleFromSubmit} type="submit" className="py-2 my-4 cursor-pointer bg-red-700">{iSignInForm ? "Sign In" : "Sign Up"}</button>
          <div className='flex gap-2 pt-6'>
            <p>{iSignInForm ? "New to Netflix? " : "Already a member?"}</p>
            <button className="cursor-pointer" onClick={() => { setIsSignIned(!iSignInForm), setErrorMessage("") }}>{iSignInForm ? "Sign Up Now" : "Sign In"}</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginUpdated;
