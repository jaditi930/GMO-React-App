import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form.tsx"
import Home from "./components/Home.tsx";
import './App.css'
import { useState } from "react";
import Alert from '@mui/material/Alert';


function App() {

  const [message,showMessage]=useState<boolean>(false)
  return (
    <>
      { message ? (
        <Alert severity="info">Please login to continue</Alert>

    ) :(
        <></>
    )
    }

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="/home" element={<Home showMessage={showMessage}/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
