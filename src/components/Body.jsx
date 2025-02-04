import Browse from "./Browse"
import Login from "./Login"
import {createBrowserRouter} from "react-router-dom"
import {RouterProvider} from "react-router-dom"
import {onAuthStateChanged} from "firebase/auth"
import { auth } from '../utils/firebase'
import { useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { addUser, removeUser } from "../utils/userSlice"


function Body() {
   const dispatch =useDispatch()
    const appRouter=createBrowserRouter([
         {
            path: "/",
            element: <Login/>,
         },
         {
            path: "/browse",
            element: <Browse/>
         }
    ])
    //onAuthChange

    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
         //whenever user sign in or sign up this is called and add user to our store 
        if (user) {
          const {uid,email,displayName,photoURL} = user;
          dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
        } 
        //if user logout
        else {
          dispatch(removeUser())
        }
      });
    },[])
  return (
      <RouterProvider router={appRouter}/>
  )
}

export default Body
