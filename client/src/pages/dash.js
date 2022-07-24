const Login = () => {
    const handleLoginRoute = () => {
    	window.open(process.env.REACT_APP_DASH_PATH, "_self");
    };
  
    return <button onClick={handleLoginRoute}>welcome</button>
  };
  
  export default Login;