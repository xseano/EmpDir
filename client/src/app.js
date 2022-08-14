import { useEffect, useState } from "react";
import "./app.css";

import Navbar from "./constructs/navbar";

import Home from "./views/home";
import Login from "./views/login";
import Dash from "./views/dash";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [hr, setHR] = useState(null);
  
  useEffect((user) => {
    if (!user) {
      fetch(`http://${process.env.REACT_APP_WEBSERVER_HOST}:${process.env.REACT_APP_WEBSERVER_PORT}${process.env.REACT_APP_AUTH_VALIDATION_PATH}`, {credentials: 'include'})
		  .then(response => response.json())
		  .then(res => {
        let data = res.data;
        console.log(data);
        
        if (data) {
          setUser(data.user);
          setEmployee(data.employee);
          setHR(data.hr);
        }
		  });
    }
    
  }, []);  

  const ProtectedRoute = ({ user, type, redirectPath }) => {
    if (user) {
      //if (type == "no-auth") { return <Navigate to={redirectPath} replace />; }
    } else if (!user) {
      //if (type == "auth") { return <Navigate to={redirectPath} replace />; }
    }
  };

  return (
    <BrowserRouter>
        <Navbar user={user} employee={employee} hr={hr} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Dash user={user} /> : <Login />} />
		      <Route path="/dash" element={employee ? <Dash user={user} employee={employee} hr={hr} /> : <Login />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;