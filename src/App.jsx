
import './App.css'
import Body from './components/Body'
import {useEffect} from "react"
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import {useNavigate} from "react-router-dom"


function App() {
 

  return (

     <Provider store={appStore}>
      <Body />
    </Provider>
  )

}

export default App
