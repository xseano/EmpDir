import React, { Fragment } from 'react';

const Dash = ({ user, employee, hr }) => {
    return (
        <div>
            <div className="container">
            <div className="row">
                <div className="col-lg-12 text-left">
                    <nav className="custom-breadcrumb" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Board of Directors </a></li>
                            <li className="breadcrumb-item"><a href="#">Mary Smith </a></li>
                            <li className="breadcrumb-item"><a href="#">Jeff Bean</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Tom Ford</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>

        <div className="cover-pic"></div>

        <div className="container">
            <div className="row relative_row">
                <div className="col-lg-9 text-left">
                    <div className="row profile-part-1">
                        <div className="col-lg-3 col-md-4 col-sm-5">
                            <div className="profile-pic"><img src="assets/images/profile-pic.png" /></div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-7">
                            <h1 className="employee-name">
                                <span className="firstname">Tom</span>
                                <span className="lastname">Ford</span>
                            </h1>
                            <div className="designation">Senior Director, NA</div>
                            <div className="more-deatils">
                                <span className="flag"><img src="assets/images/united-states.svg" /></span>
                                <span className="time">NV,US 12PM, </span>
                                <span className="day">SUN</span>
                            </div>
                        </div>
                    </div>
                    <div className="row profile-part-2">
                        <div className="col-lg-12">
                            <h2 className="section-tittle">
                                About
                            </h2>
                            <p className="para-text">I manage the ACME Widget sales team, focused on North America, including lead generation and account management</p>
                        </div>
                    </div>
                    <div className="row profile-part-3">
                        <div className="col-lg-12">
                            <h2 className="section-tittle">
                                Manager
                            </h2>
                            <ul className="list-unstyled">
                                <li className="media">
                                    <img className="mr-3 rounded-circle" src="assets/images/dp.png" alt="Generic placeholder image" />
                                    <div className="media-body">
                                        <h5 className="mt-0 mb-1">Jeff Bean,</h5>
                                        <span>Vice President, WW Sales</span><br />
                                        <span>Widget Division</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 text-left sidebar">
                    <div className="card card1">
                        <h3>Contact</h3>
                        <ul className="list-unstyled">
                            <li className="media">
                                <img className="mr-3" src="assets/images/email.svg" alt="Generic placeholder image" />
                                <div className="media-body">
                                    <h5 className="mt-0 mb-1">tom.ford@acme.com</h5>
                                </div>
                            </li>
                            <li className="media">
                                <img className="mr-3" src="assets/images/phone.svg" alt="Generic placeholder image" />
                                <div className="media-body">
                                    <h5 className="mt-0 mb-1">+1 702-867-5309</h5>
                                </div>
                            </li>
                            <li className="media">
                                <img className="mr-3" src="assets/images/mobile.svg" alt="Generic placeholder image" />
                                <div className="media-body">
                                    <h5 className="mt-0 mb-1">+1 702-123-4567</h5>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card card2">
                        <h3>More Info</h3>
                        <p><strong>Slack :</strong> @tomford</p>
                        <p><strong>Con Call :</strong> 5672341</p>
                        <p><strong>Github :</strong> github.com/tomford</p>
                    </div>

                    <div className="card card3">
                        <h3>Address</h3>
                        <p>789 Main Street, Las Vegas, NV 89104</p>
                    </div>

                    <div className="card card4">
                        <h3>Tags</h3>
                        <a className="tags" href="#">North America</a>
                        <a className="tags" href="#">Sales </a>
                        <a className="tags" href="#">Starbucks</a>
                        <a className="tags" href="#">Account Management</a>
                        <a className="tags" href="#">Lead Generation </a>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="row profile-part-4">
                        <div className="col-lg-12">
                            <h2 className="section-tittle">
                                Reports
                                <nav className="custom-breadcrumb" aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">11 Directs</a></li>
                                        <li className="breadcrumb-item"><a href="#">11 Total </a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Org Chart</li>
                                    </ol>
                                </nav>
                            </h2>
                        </div>

                        <div style={{margin: "0px"}} className="row">
                            <div className="col-md-4">
                                <ul className="list-unstyled">
                                    <li className="media my-4">
                                        <img className="align-self-center mr-3 rounded-circle" src="assets/images/dp.png" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <h5 className="mt-0 mb-1">Henry Carlson</h5>
                                        </div>
                                    </li>
                                    <li className="media my-4">
                                        <img className="align-self-center mr-3 rounded-circle" src="assets/images/dp.png" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <h5 className="mt-0 mb-1">Douglas Fields</h5>
                                        </div>
                                    </li>
                                    <li className="media my-4">
                                        <img className="align-self-center mr-3 rounded-circle" src="assets/images/dp.png" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <h5 className="mt-0 mb-1">Randy Holmes</h5>
                                        </div>
                                    </li>
                                    <li className="media my-4">
                                        <img className="align-self-center mr-3 rounded-circle" src="assets/images/dp.png" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <h5 className="mt-0 mb-1">Louis Burke</h5>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-4">
                                <ul className="list-unstyled">
                                    <li className="media my-4">
                                        <img className="align-self-center mr-3 rounded-circle" src="assets/images/dp.png" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <h5 className="mt-0 mb-1">Joshua Bishop</h5>
                                        </div>
                                    </li>
                                    <li className="media my-4">
                                        <img className="align-self-center mr-3 rounded-circle" src="assets/images/dp.png" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <h5 className="mt-0 mb-1">Philip Nelson</h5>
                                        </div>
                                    </li>
                                    <li className="media my-4">
                                        <img className="align-self-center mr-3 rounded-circle" src="assets/images/dp.png" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <h5 className="mt-0 mb-1">Jason Peters</h5>
                                        </div>
                                    </li>
                                    <li className="media my-4">
                                        <img className="align-self-center mr-3 rounded-circle" src="assets/images/dp.png" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <h5 className="mt-0 mb-1">Gerald Austin</h5>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-4">
                                <ul className="list-unstyled">
                                    <li className="media my-4">
                                        <img className="align-self-center mr-3 rounded-circle" src="assets/images/dp.png" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <h5 className="mt-0 mb-1">Jose Knight</h5>
                                        </div>
                                    </li>
                                    <li className="media my-4">
                                        <img className="align-self-center mr-3 rounded-circle" src="assets/images/dp.png" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <h5 className="mt-0 mb-1">Jordan Nguyen</h5>
                                        </div>
                                    </li>
                                    <li className="media my-4">
                                        <img className="align-self-center mr-3 rounded-circle" src="assets/images/dp.png" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <h5 className="mt-0 mb-1">Jordan Nguyen</h5>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row profile-part-5">
                        <div className="col-lg-12">
                            <h2 className="section-tittle">
                                Additional Information
                            </h2>
                            <p className="additional-info"><span className="span1">HR Manager</span><span className="span2">Stacy Knight</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
  
    );
  };
  
  export default Dash;