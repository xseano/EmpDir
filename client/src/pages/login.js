import GoogleIcon from "../img/google.png";

const Login = () => {
  const google = () => {
    window.open("http://localhost:8081/auth/google", "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Login Please</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={GoogleIcon} alt="" className="icon" />
            Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;