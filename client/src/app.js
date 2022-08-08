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
			let user = data.user;
			let employee = data.employee;
			let hr = data.hr;

			setUser(user);
			setEmployee(employee);
			setHR(hr);
		});
    }
  }, []);  

  return (
    <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Dash user={user} /> : <Login />} />
		  <Route path="/dash" element={user ? <Dash user={user} employee={employee} hr={hr} /> : <Login />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;