import GoogleIcon from "../img/google.png";
import GithubIcon from "../img/github.png";

const Login = () => {
    const googleLogin = () => {
        window.open("http://127.0.0.1:8081/auth/google", "_self");
    };

    const githubLogin = () => {
        window.open("http://127.0.0.1:8081/auth/github", "_self");
    };

    return (
    
    <div className="login">
        <h1 className="loginTitle">Login Please</h1>
        <div className="wrapper">
        <div className="left">
            <div className="loginButton google" onClick={googleLogin}>
            <img src={GoogleIcon} alt="" className="icon" />
            Google
            </div>

            <div className="loginButton github" onClick={githubLogin}>
            <img src={GithubIcon} alt="" className="icon" />
            Github
            </div>
        </div>
        </div>
    </div>

    );
};

export default Login;