const Login = () => {
    const handleLoginRoute = () => {
        window.open(process.env.REACT_APP_LOGIN_PATH, "_self");
    };
  
    return (
    
        <div className="canvas">
            <h1 className="canvasTitle">Welcome!</h1>
            <div className="wrapper">
            </div>
        </div>
    
    );

    
  };
  
  export default Login;