import { useEffect, useState } from "react";
import "./app.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./pages/dash";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
	fetch(`http://${process.env.REACT_APP_WEBSERVER_HOST}:${process.env.REACT_APP_WEBSERVER_PORT}${process.env.REACT_APP_AUTH_VALIDATION_PATH}`)
		.then(response => response.json())
		.then(res => {
			console.log(res);
			setUser(res.data.user);
		}
	)
  }, []);  

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
		  <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;