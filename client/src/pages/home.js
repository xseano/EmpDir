const Login = () => {
    const handleLoginRoute = () => {
        window.open(process.env.REACT_APP_LOGIN_PATH, "_self");
    };
  
    return <button onClick={handleLoginRoute}>Login</button>
  };
  
  export default Login;