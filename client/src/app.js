import { useEffect, useState, Suspense } from "react";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Loading from "./components/loading";

import Home from "./views/home";
import Login from "./views/login";
import Dash from "./views/dash";
import Profile from "./views/profile";
import Search from "./views/search";

import { BrowserRouter, Routes, Redirect, Route, Navigate } from "react-router-dom";

import AuthRoute from "./modules/auth-route";
import LoginHandler from "./modules/login-handler";

const App = () => {
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [hr, setHR] = useState(null);
  
  useEffect((user) => {
    if ((!user) || (!JSON.parse(localStorage.getItem("auth.user")))) {
        fetch(`http://${process.env.REACT_APP_WEBSERVER_HOST}${process.env.REACT_APP_AUTH_VALIDATION_PATH}`, {credentials: 'include'})
		  .then(response => response.json())
		  .then(res => {
            let data = res.data;
            //console.log(data);
            
            if (data) {
              setUser(data.user);
              localStorage.setItem('auth.user', JSON.stringify(data.user));

              setEmployee(data.employee);
              localStorage.setItem('auth.employee', JSON.stringify(data.employee));

              setHR(data.hr);
              localStorage.setItem('auth.hr', JSON.stringify(data.hr));
            }
		});
    }
  }, []);

  return (
    <BrowserRouter>
        <Navbar user={user} employee={employee} hr={hr} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Suspense> <Login /> </Suspense>} />

          <Route path="/login/success" element={<LoginHandler />} />
          <Route path="/login/error" element={<LoginHandler />} />

          <Route path="/" element={<AuthRoute/>}>
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:id" element={<Suspense> <Profile user={user} /> </Suspense>} />
          </Route>

          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
};

export default App;