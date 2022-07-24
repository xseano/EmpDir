import { useEffect, useState } from "react";
import "./app.css";
import Navbar from "./constructs/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Dash from "./pages/dash";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
	fetch(`http://${process.env.REACT_APP_WEBSERVER_HOST}:${process.env.REACT_APP_WEBSERVER_PORT}${process.env.REACT_APP_AUTH_VALIDATION_PATH}`, {credentials: 'include'})
		.then(response => response.json())
		.then(res => { setUser(res.data.user) });
  }, []);  

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Dash user={user} /> : <Login />} />
		  <Route path="/dash" element={user ? <Dash user={user} /> : <Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;