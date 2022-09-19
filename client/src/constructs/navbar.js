
import Logo from "../img/logo.jpg";

const Navbar = ({ user, employee, hr }) => {
    const handleLogout = () => {
        window.open(`http://${process.env.REACT_APP_WEBSERVER_HOST}${process.env.REACT_APP_LOGOUT_PATH}`, "_self");
    };

    const handleDash = () => {
        window.open(`${process.env.REACT_APP_DASH_PATH}`, "_self");
    };

    const handleSearch = () => {
        window.open(`${process.env.REACT_APP_SEARCH_MAIN_PATH}`, "_self");
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <a className="navbar-brand" href="#"><img alt="logo" src={Logo} /></a>
        {user ? (
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav mr-auto">
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <>
                        <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className="avtar" src={employee.ext.AvatarURL} />{hr.emp.FirstName} {hr.emp.LastName}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" onClick={handleDash}>Dashboard</a>
                            <a className="dropdown-item" onClick={handleSearch}>Search</a>
                            <a className="dropdown-item" href="#">Settings</a>
                            <a className="dropdown-item" onClick={handleLogout}>Logout</a>
                        </div>
                        </>
                    </li>
                </ul>
            </div>
        ) : (
         <div></div>   
        )}
        </nav>
    );
};

export default Navbar;