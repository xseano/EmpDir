import "../css/login.css";
import GoogleIcon from "../img/google.png";
import GithubIcon from "../img/github.png";

import $ from 'jquery';
import { useSearchParams } from "react-router-dom";

const Login = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    let statusQuery = searchParams.get("status");
    if (statusQuery == "error") {
        $('#title').hide();
        $('#status').text("We weren't able to log you in, please try again.");
        $('#status').css('color', '#cb0000');
        $('#status').css('font-size', '2.0rem');
    }

    const googleLogin = () => {
        window.open(`http://${process.env.REACT_APP_WEBSERVER_HOST}${process.env.REACT_APP_GOOGLE_AUTH_PATH}`, "_self");
    };

    const githubLogin = () => {
        window.open(`http://${process.env.REACT_APP_WEBSERVER_HOST}${process.env.REACT_APP_GITHUB_AUTH_PATH}`, "_self");
    };

    return (
    <>
    
    <div className="canvas">
        <h1 id="title" className="canvasTitle">Login Please</h1>
        <h1 id="status" className="canvasTitle"></h1>
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