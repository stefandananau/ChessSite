import { useState } from 'react';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import MainPage from './components/MainPage/MainPage';
function App() {

  
  const [start, setStart ] = useState(<Login linkHandle={handleStart}></Login>);
  function handleStart(pageName){
    console.log(pageName)
    switch (pageName){
      case "Login":   
        setStart(<Login linkHandle={handleStart}></Login>)
        break;
      case "Register":
        setStart(<Register linkHandle={handleStart}></Register>)
        break;
      case "Main":
        setStart(<MainPage></MainPage>);
        break;
      default:
        setStart("");
    }
  }
  return (
    <>
    {start}
    </>
  )
}

export default App
