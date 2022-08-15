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
    <>
    <link href="assets/css/login.css" rel="stylesheet" />

    <div className="canvas">
        <h1 className="canvasTitle">Login Please</h1>
        <div className="wrapper">
        <div className="left">
            <div className="canvasButton google" onClick={googleLogin}>
            <img src={GoogleIcon} alt="" className="icon" />
            Google
            </div>
        </div>
        
        <div className="center">
        <div className="line" />
        <div className="divider">OR</div>
        </div>

        <div className="right">
            <div className="canvasButton github" onClick={githubLogin}>
            <img src={GithubIcon} alt="" className="icon" />
            Github
            </div>
        </div>

        </div>
    </div>
    </>
    );
};

export default Login;