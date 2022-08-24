import "../css/style.css";
import React, { Fragment } from 'react';
import { useEffect, useState } from "react";
import { suspend } from 'suspend-react';

import Flag from "../img/united-states.svg";
import Email from "../img/email.svg";
import Phone from "../img/phone.svg";
import Mobile from "../img/mobile.svg";

const Dash = ({ user, employee, hr }) => {
    let contacts = [];
    let tags = [];
    let manager_chain = [];
    let directs = [];
    let manager = [];
    let hr_manager = [];

    if ((employee.contacts) && (employee.tags)) {
        employee.contacts.forEach((contact) => {contacts.push(<p><strong>{contact.Contact}</strong> {contact.ContactAddr}</p>)});
    
        employee.tags.forEach((tag) => {tags.push(<a className="tags" href="#">{tag}</a>)});
    }

    if ((hr.mgr_chain) && (hr.directs)) {
        hr.mgr_chain.forEach((mgr) => {manager_chain.push(<li key={mgr.empID} className="breadcrumb-item"><a href={ `${process.env.REACT_APP_PROFILE_PATH}/${mgr.empID}` }>{mgr.name}</a></li>)});
    
        hr.directs.forEach((direct) => {directs.push(
            <li key={direct.id} className="media my-4">
                <img className="align-self-center mr-3 rounded-circle" src={direct.avatar} alt="Generic placeholder image" />
                <div className="media-body">
                    <h5 className="mt-0 mb-1"><a href={ `${process.env.REACT_APP_PROFILE_PATH}/${direct.id}` }>{direct.name}</a></h5>
                </div>
            </li>
        )});
    }

    if ((hr.mgr.main) && (hr.mgr.ext)) {
        manager.push(
            <div className="row profile-part-3">
                <div className="col-lg-12">
                    <h2 className="section-tittle">
                        Manager
                    </h2>
                    <ul className="list-unstyled">
                        <li key={hr.mgr.ext.EmployeeID} className="media">
                            <img className="mr-3 rounded-circle" src={hr.mgr.ext.AvatarURL} alt="Generic placeholder image" />
                            <div className="media-body">
                                <h5 className="mt-0 mb-1"><a href={ `${process.env.REACT_APP_PROFILE_PATH}/${hr.mgr.ext.EmployeeID}` }>{hr.mgr.main.FirstName} {hr.mgr.main.LastName}</a></h5>
                                <span>{hr.mgr.main.JobTitle}</span><br />
                                <span>{hr.mgr.main.Org}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );

        hr_manager.push(
            <div className="row profile-part-5">
                <div className="col-lg-12">
                    <h2 className="section-tittle">
                        Additional Information
                    </h2>
                    <p className="additional-info"><span className="span1">HR Manager</span><span className="span2"><a href={ `${process.env.REACT_APP_PROFILE_PATH}/${hr.mgr.ext.EmployeeID}` }>{hr.mgr.main.FirstName} {hr.mgr.main.LastName}</a></span></p>
                </div>
            </div>
        );
    }

    const tzFetch = suspend(async (hr) => {
        const res = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.REACT_APP_TZDB_KEY}&format=json&by=zone&zone=${hr.emp.TimeZone}`, {mode: 'cors'});
        return await res.json();
    }, [hr]);

    let date = new Date(tzFetch.formatted.replace(/-/g, "/"));
    let time = date.toLocaleTimeString(navigator.language, {hour: 'numeric', minute: '2-digit'});
    let day = new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(date);

    return (
        <>
        <div>
            <div className="container">
            <div className="row">
                <div className="col-lg-12 text-left">
                    <nav className="custom-breadcrumb" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            {manager_chain}
                            <li key={hr.emp.EmployeeID} className="breadcrumb-item active" aria-current="page">{hr.emp.FirstName} {hr.emp.LastName}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>

        <div className="cover-pic" style={{backgroundImage: `url(${employee.ext.BannerURL})`}}></div>

        <div className="container">
            <div className="row relative_row">
                <div className="col-lg-9 text-left">
                    <div className="row profile-part-1">
                        <div className="col-lg-3 col-md-4 col-sm-5">
                            <div className="profile-pic"><img src={employee.ext.AvatarURL} /></div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-7">
                            <h1 className="employee-name">
                                <span className="firstname">{hr.emp.FirstName} </span>
                                <span className="lastname">{hr.emp.LastName}</span>
                            </h1>
                            <div className="designation">{hr.emp.JobTitle}, {hr.emp.Org}</div>
                            <div className="more-deatils">
                                <span className="flag"><img src={Flag} /> </span>
                                <span className="time">{hr.emp.State}, {hr.emp.CountryCode}, {day} </span>
                                <span className="day">{time}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row profile-part-2">
                        <div className="col-lg-12">
                            <h2 className="section-tittle">
                                About
                            </h2>
                            <p className="para-text">{employee.ext.BioText}</p>
                        </div>
                    </div>
                    {manager}
                </div>
                <div className="col-lg-3 text-left sidebar">
                    <div className="card card1">
                        <h3>Contact</h3>
                        <ul className="list-unstyled">
                            <li key="contact.email" className="media">
                                <img className="mr-3" src={Email} alt="Generic placeholder image" />
                                <div className="media-body">
                                    <h5 className="mt-0 mb-1"><a href={ `mailto:${hr.emp.Email}` }>{hr.emp.Email}</a></h5>
                                </div>
                            </li>
                            <li key="contact.phone" className="media">
                                <img className="mr-3" src={Phone} alt="Generic placeholder image" />
                                <div className="media-body">
                                    <h5 className="mt-0 mb-1"><a href={ `tel:${hr.emp.Phone}` }>+1 {hr.emp.Phone}</a></h5>
                                </div>
                            </li>
                            <li key="contact.mobile" className="media">
                                <img className="mr-3" src={Mobile} alt="Generic placeholder image" />
                                <div className="media-body">
                                    <h5 className="mt-0 mb-1"><a href={ `tel:${hr.emp.Phone}` }>+1 {hr.emp.Phone}</a></h5>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card card2">
                        <h3>More Info</h3>
                        {contacts}
                    </div>

                    <div className="card card3">
                        <h3>Address</h3>
                        <a href={`https://maps.google.com/?q=${hr.emp.Street},${hr.emp.City},${hr.emp.State},${hr.emp.ZipCode}`}>
                            <p>{hr.emp.Street}, {hr.emp.City}, {hr.emp.State} {hr.emp.ZipCode}</p>
                        </a>
                    </div>

                    <div className="card card4">
                        <h3>Tags</h3>
                        {tags}
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="row profile-part-4">
                        <div className="col-lg-12">
                            <h2 className="section-tittle">
                                Reports
                                <nav className="custom-breadcrumb" aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li key="direct.general" className="breadcrumb-item"><a href="#">{directs.length} Directs</a></li>
                                        <li key="direct.total" className="breadcrumb-item"><a href="#">{directs.length} Total </a></li>
                                        <li key="direct.org.chart" className="breadcrumb-item active" aria-current="page">Org Chart</li>
                                    </ol>
                                </nav>
                            </h2>
                        </div>

                        <div style={{margin: "0px"}} className="row">
                            {/* TODO: ITERATE A NEW LIST EVERY 4 DIRECTS */}
                            <div className="col-md-4">
                                <ul className="list-unstyled">
                                    {directs}
                                </ul>
                            </div>

                        </div>
                    </div>
                    {hr_manager}
                </div>
            </div>
        </div>
        </div>
        </>
    );
};
  
export default Dash;