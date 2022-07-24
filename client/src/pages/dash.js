const Login = () => {
    const handleLoginRoute = () => {
    	window.open("/login", "_self");
    };
  
    return <button onClick={handleLoginRoute}>welcome</button>
  };
  
  export default Login;