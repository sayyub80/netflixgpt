import Browse from "./Browse"
import Login from "./Login"
import {createBrowserRouter} from "react-router-dom"
import {RouterProvider} from "react-router-dom"



function Body() {
  
    const appRouter=createBrowserRouter([
         {
            path: "/",
            element: <Login/>,
         },
         {
            path: "/browse",
            element: <Browse/>
         },
        
         
    ])
    //onAuthChange

  
  return (
      <RouterProvider router={appRouter}/>
  )
}

export default Body
