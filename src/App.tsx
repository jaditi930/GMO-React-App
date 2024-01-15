import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form.tsx"
import Data from "./components/Dashboard.tsx";
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="/dashboard" element={<Data/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
