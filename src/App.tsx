import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Success, Login } from "./components"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Success />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
