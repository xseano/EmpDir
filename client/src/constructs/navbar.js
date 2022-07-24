import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
    const handleLogout = () => {
        window.open(`http://${process.env.REACT_APP_WEBSERVER_HOST}:${process.env.REACT_APP_WEBSERVER_PORT}${process.env.REACT_APP_LOGOUT_PATH}`, "_self");
    };

    const handleDash = () => {
        window.open(`http://${process.env.REACT_APP_WEBSERVER_HOST}:${process.env.REACT_APP_WEBSERVER_PORT}${process.env.REACT_APP_DASH_PATH}`, "_self");
    };
    
    return (
        <div className="navbar">
        <span className="logo">
            <Link className="link" to="/">
            EmpDir App
            </Link>
        </span>
        {user ? (
            <ul className="list">
            <li className="listItem">
                <img
                src={user.photos[0].value}
                alt=""
                className="avatar"
                />
            </li>
            <li className="listItem" onClick={handleDash}>
                {user.displayName}
            </li>
            <li className="listItem" onClick={handleLogout}>
                Logout
            </li>
            </ul>
        ) : (
            <Link className="link" to="/login">
            Login
            </Link>
        )}
        </div>
    );
};

export default Navbar;