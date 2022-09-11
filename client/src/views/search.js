import "../css/search.css";
import FlagIcon from "../img/united-states.svg";
import EmailIcon from "../img/email.svg";
import PhoneIcon from "../img/phone.svg";
import DefaultIcon from "../img/avatar/default.png";
import VisitIcon from "../img/visit.svg";

import { suspend } from 'suspend-react';
import $ from 'jquery';

const Search = () => {

    const submitSearch = async () => {
        let input = $('#searchInput').val();
        console.log(input);

        //$('#searchResults').empty();

        const searchFetch = suspend(async () => {
            const res = await fetch(`http://${process.env.REACT_APP_WEBSERVER_HOST}${process.env.REACT_APP_SEARCH_MAIN_PATH}?q=${input}`, {credentials: 'include'});
            return await res.json();
        }, []);

        let data = searchFetch.data;
        let employees = data.employees;

        // debugging
        console.log(data);
        console.log(searchFetch);

        employees.forEach((emp) => {
            let employee = emp.employee;
            let avatar = emp.avatar;
            
            $('#searchResults').append(
                `
                <li class="media">
                    <a href=${process.env.REACT_APP_PROFILE_PATH}/${employee.id}>
                        <img class="mr-3 rounded-circle" src=${avatar} alt="Avatar image" />
                    </a>
                    <div class="media-body">
                        <a href=${process.env.REACT_APP_PROFILE_PATH}/${employee.id} class="mt-0 mb-1 name">
                            <span class="first_name">${employee.FirstName}</span>
                            <span class="last_name">${employee.LastName}</span>
                        </a>
                        <div class="more-info">
                            <span class="desigation">
                                <a href=${process.env.REACT_APP_PROFILE_PATH}/${employee.id}>${employee.JobTitle},</a>
                            </span>
                            <span class="company_name">
                                <a href=${process.env.REACT_APP_PROFILE_PATH}/${employee.id}>${employee.Org} </a>
                            </span>
                        </div>
                        <div class="contact-info">
                            <span class="country">
                                <a href=${process.env.REACT_APP_PROFILE_PATH}/${employee.id}>
                                    <span><img src=${FlagIcon} /></span>${employee.CountryCode}
                                </a>
                            </span>
                            <span class="email">
                                <a href=${process.env.REACT_APP_PROFILE_PATH}/${employee.id}>
                                    <span><img src=${EmailIcon} /></span>${employee.Email}
                                </a>
                            </span>
                            <span class="phone">
                                <a href=${process.env.REACT_APP_PROFILE_PATH}/${employee.id}>
                                    <span><img src=${PhoneIcon} /></span>+1 ${employee.Phone}
                                </a>
                            </span>
                        </div>
                    </div>
                    <a href=${process.env.REACT_APP_PROFILE_PATH}/${employee.id} class="visit_profile_button"><img src=${VisitIcon} /></a>
                </li>	
           `);
        });
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
                    <ul id="searchResults" className="list-unstyled">
                        
						<li className="media">
							<a href={`profile/`}>
                                <img className="mr-3 rounded-circle" src={DefaultIcon} alt="Generic placeholder image" />
                            </a>
							<div className="media-body">
								<a href={`profile/`} className="mt-0 mb-1 name"><span className="first_name">succ[i].FirstName </span><span className="last_name"> succ[i].LastName </span></a>
								<div className="more-info">
									<span className="desigation"><a href={`profile/`}>succ[i].JobTitle </a></span>,<span className="company_name"><a href={`profile/`}>succ[i].Org </a></span>
								</div>
								<div className="contact-info">
									<span className="country">
										<a href={`profile/`}>
											<span><img src={FlagIcon} /></span>succ[i].CountryCode
										</a>
									</span>
									<span className="email">
										<a href={`profile/`}>
											<span><img src={EmailIcon} /></span>succ[i].Email
										</a>
									</span>
									<span className="phone">
										<a href={`profile/`}>
											<span><img src={PhoneIcon} /></span>+1 succ[i].Phone
										</a>
									</span>
								</div>
							</div>
							<a href={`profile/`} className="visit_profile_button"><img src={VisitIcon} /></a>
						</li>						
					</ul>
                </div>
            </div>
        </div>
        </>
    );
};

export default Search;