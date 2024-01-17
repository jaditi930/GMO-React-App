import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form.tsx"
import Home from "./components/Home.tsx";
import './App.css'
import { useState } from "react";
import AlertMsg from "./components/AlertMsg.tsx";


function App() {

  const [message,showMessage]=useState<boolean>(false)
  return (
    <>
      

    <AlertMsg message={message}/>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="home" element={<Home showMessage={showMessage}/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
