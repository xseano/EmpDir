import "../css/search.css";
import FlagIcon from "../img/united-states.svg";
import EmailIcon from "../img/email.svg";
import PhoneIcon from "../img/phone.svg";
import DefaultIcon from "../img/avatar/default.png";
import VisitIcon from "../img/visit.svg";

import { suspend } from 'suspend-react';

const Search = () => {

    const submitSearch = () => {
        let input = document.getElementById("searchInput").value;
        console.log(input);

        const postSearch = suspend(async () => {
            const res = await fetch(`http://${process.env.REACT_APP_WEBSERVER_HOST}${process.env.REACT_APP_SEARCH_MAIN_PATH}?q=${input}`, {method: 'POST', credentials: 'include'});
            return await res.json();
        }, []);
    };

    return (
        <>
        <section className="search_bar">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form className="search-form">
                            <div className="input-group">
                                <input type="text" id="searchInput" className="form-control" placeholder="Search for an employee" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" id="search" type="button" onClick={submitSearch}><i className="fas fa-search"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <div className="container result-listing">
            <div className="row">
                <div className="col-md-12">
                    <ul className="list-unstyled">
						<li className="media">
							<a href="userprofile/succ[i]._id "><img className="mr-3 rounded-circle" src={DefaultIcon} alt="Generic placeholder image" /></a>
							<div className="media-body">
								<a href="userprofile/succ[i]._id " className="mt-0 mb-1 name"><span className="first_name">succ[i].FirstName </span><span className="last_name"> succ[i].LastName </span></a>
								<div className="more-info">
									<span className="desigation"><a href="userprofile/succ[i]._id ">succ[i].JobTitle </a></span>,<span className="company_name"><a href="userprofile/succ[i]._id ">succ[i].Org </a></span>
								</div>
								<div className="contact-info">
									<span className="country">
										<a href="userprofile/succ[i]._id ">
											<span><img src={FlagIcon} /></span>succ[i].CountryCode
										</a>
									</span>
									<span className="email">
										<a href="userprofile/succ[i]._id ">
											<span><img src={EmailIcon} /></span>succ[i].Email
										</a>
									</span>
									<span className="phone">
										<a href="userprofile/succ[i]._id ">
											<span><img src={PhoneIcon} /></span>+1 succ[i].Phone
										</a>
									</span>
								</div>
							</div>
							<a href="userprofile/succ[i]._id " className="visit_profile_button"><img src={VisitIcon} /></a>
						</li>						
					</ul>
                </div>
            </div>
        </div>
        </>
    );
};

export default Search;