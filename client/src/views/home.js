import LoginIcon from "../img/login.png";

const Home = () => {
    const handleLogin = () => {
        window.open(process.env.REACT_APP_LOGIN_PATH, "_self");
    };
  
    return (
    
        <div className="canvas">
            <h1 className="canvasTitle">Welcome!</h1>
            <div className="wrapper">
                
            <div className="left">
                <div className="canvasButton login" onClick={handleLogin}>
                <img src={LoginIcon} alt="" className="icon" />
                Login
                </div>
			</div>

            </div>
        </div>
    
    );

    
  };
  
  export default Home;