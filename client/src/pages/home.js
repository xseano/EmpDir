const Login = () => {
    const handleLoginRoute = () => {
        window.open("/login", "_self");
    };
  
    return <button onClick={handleLoginRoute}>Login</button>
  };
  
  export default Login;