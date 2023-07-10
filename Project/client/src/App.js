import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"

function App() {

  const user = localStorage.getItem("token")

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      {user && <Route path="/login" element={<Navigate replace to="/" />} />}
      {user && <Route path="/signup" element={<Navigate replace to="/" />} />}
      <Route path="/signup" exact element={<Signup />} /> 
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  )
}

export default App;
