import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";

const LoginHandler = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("auth.user"));
    console.log(user);

    if (user !== null) {
        //navigate("/search");

        // go back to the 3rd previous url
        // EX: unauthenticated user -> profile/:id -> (redirect) login -> (log in) /login/success -> (-3) profile/:id
        navigate(-3);
    } else {
        // something went wrong, we don't have the user
        // /login/error routes through here 
        navigate("/login?status=error");
    }

    // render loading until navigate processes
    return <Loading />;
}

export default LoginHandler;