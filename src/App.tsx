import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form.tsx"
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form/>}>
        {/* <Route path="/dashboard" element={<Dashboard/>}> */}
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
