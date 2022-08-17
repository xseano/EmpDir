

const Navbar = ({ user, employee, hr }) => {
    const handleLogout = () => {
        window.open(`http://${process.env.REACT_APP_WEBSERVER_HOST}${process.env.REACT_APP_LOGOUT_PATH}`, "_self");
    };

    const handleDash = () => {
        window.open(`http://${process.env.REACT_APP_WEBSERVER_HOST}${process.env.REACT_APP_DASH_PATH}`, "_self");
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <a className="navbar-brand" href="#"><img alt="logo" src="assets/images/logo.jpg" /></a>
        {user ? (
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav mr-auto">
                    <form className="form-inline custom-search">
                        <i className="fas fa-search"></i>
                        <input className="form-control mr-sm-2 search-box" type="search" placeholder="Type in to Search..." aria-label="Search" />
                    </form>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#"><i className="fas fa-bell alet-icon"></i> Notifications</a>
                    </li>
                    <li className="nav-item dropdown">
                    
                        <>
                        <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className="avtar" src={employee.ext.AvatarURL} />{hr.emp.FirstName} {hr.emp.LastName}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#">Dashboard</a>
                            <a className="dropdown-item" href="#">Settings</a>
                            <a className="dropdown-item" onClick={handleLogout} href="#">Logout</a>
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