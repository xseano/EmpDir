import GoogleIcon from "../img/google.png";
import GithubIcon from "../img/github.png";

const Login = () => {
    const googleLogin = () => {
        window.open(`http://${process.env.REACT_APP_WEBSERVER_HOST}:${process.env.REACT_APP_WEBSERVER_PORT}${process.env.REACT_APP_GOOGLE_AUTH_PATH}`, "_self");
    };

    const githubLogin = () => {
        window.open(`http://${process.env.REACT_APP_WEBSERVER_HOST}:${process.env.REACT_APP_WEBSERVER_PORT}${process.env.REACT_APP_GITHUB_AUTH_PATH}`, "_self");
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