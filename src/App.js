import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/register.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={<h1>Welcome to Spicer</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

